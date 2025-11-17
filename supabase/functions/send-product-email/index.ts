import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const SENDGRID_API_KEY = Deno.env.get("SENDGRID_API_KEY");



const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ProductEmailRequest {
  email: string;
  phone?: string;
  productTitle: string;
  productId: string;
  userName?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    const { email, phone, productTitle, productId, userName }: ProductEmailRequest = await req.json();

    console.log("Sending product email to:", email);

    // Record the email delivery request
    const { error: deliveryError } = await supabaseClient
      .from("email_deliveries")
      .insert({
        user_id: null, // No authentication required for product delivery
        product_id: productId,
        email: email,
        phone: phone,
        delivery_status: "sent",
        sent_at: new Date().toISOString(),
      });

    if (deliveryError) {
      console.error("Error recording delivery:", deliveryError);
      throw deliveryError;
    }

    // Send the email using SendGrid API
    const emailResponse = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: email }],
            subject: `Your ${productTitle} is Ready!`,
          }
        ],
        from: {
          email: "logsexpress@gmail.com",
          name: "Debt Management Tools"
        },
        content: [
          {
            type: "text/html",
            value: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                border-radius: 10px 10px 0 0;
                text-align: center;
              }
              .content {
                background: #f9fafb;
                padding: 30px;
                border-radius: 0 0 10px 10px;
              }
              .button {
                display: inline-block;
                background: #667eea;
                color: white;
                padding: 12px 30px;
                text-decoration: none;
                border-radius: 6px;
                margin: 20px 0;
                font-weight: bold;
              }
              .footer {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
                color: #6b7280;
                font-size: 14px;
                text-align: center;
              }
              .product-info {
                background: white;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
                border-left: 4px solid #667eea;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 style="margin: 0;">Thank You for Your Purchase!</h1>
            </div>
            <div class="content">
              <p>Hello${userName ? ` ${userName}` : ''},</p>
              
              <p>Thank you for purchasing <strong>${productTitle}</strong>. Your digital product is ready to access!</p>
              
              <div class="product-info">
                <h2 style="margin-top: 0; color: #667eea;">Product Details</h2>
                <p><strong>Product:</strong> ${productTitle}</p>
                <p><strong>Delivery Email:</strong> ${email}</p>
                ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
              </div>
              
              <p>You can access your product anytime by logging into your account.</p>
              
              <div style="text-align: center;">
                <a href="${Deno.env.get("SUPABASE_URL")?.replace('supabase.co', 'lovable.app') || 'https://your-app.lovable.app'}" class="button">
                  Access Your Product
                </a>
              </div>
              
              <p><strong>Next Steps:</strong></p>
              <ul>
                <li>Download and save your product for offline access</li>
                <li>Complete the templates at your own pace</li>
                <li>Reach out if you have any questions</li>
              </ul>
              
              <div class="footer">
                <p>If you didn't make this purchase, please contact our support team immediately.</p>
                <p>© ${new Date().getFullYear()} Debt Management Tools. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
        `
          }
        ]
      }),
    });

    if (!emailResponse.ok) {
      const error = await emailResponse.text();
      console.error("SendGrid API error:", error);
      throw new Error(`Failed to send email: ${error}`);
    }

    console.log("Email sent successfully via SendGrid");

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Email sent successfully"
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-product-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
