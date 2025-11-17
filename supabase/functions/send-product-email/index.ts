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
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>Your Product is Ready!</title>
            <!--[if mso]>
            <style type="text/css">
              body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
            </style>
            <![endif]-->
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
              
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              
              body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
                line-height: 1.6;
                color: #1f2937;
                background-color: #f3f4f6;
                margin: 0;
                padding: 0;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
              }
              
              .email-wrapper {
                width: 100%;
                background-color: #f3f4f6;
                padding: 40px 20px;
              }
              
              .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
              }
              
              .header {
                background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 50%, #3b82f6 100%);
                padding: 48px 40px;
                text-align: center;
                position: relative;
                overflow: hidden;
              }
              
              .header::before {
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
                animation: pulse 15s ease-in-out infinite;
              }
              
              @keyframes pulse {
                0%, 100% { transform: scale(1); opacity: 0.5; }
                50% { transform: scale(1.1); opacity: 0.8; }
              }
              
              .logo {
                background-color: rgba(255, 255, 255, 0.95);
                width: 80px;
                height: 80px;
                border-radius: 20px;
                margin: 0 auto 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 32px;
                font-weight: 700;
                color: #6366f1;
                box-shadow: 0 8px 24px rgba(99, 102, 241, 0.3);
                position: relative;
                z-index: 1;
              }
              
              .header h1 {
                color: #ffffff;
                font-size: 28px;
                font-weight: 700;
                margin: 0;
                letter-spacing: -0.5px;
                position: relative;
                z-index: 1;
              }
              
              .header p {
                color: rgba(255, 255, 255, 0.9);
                font-size: 16px;
                margin: 12px 0 0;
                position: relative;
                z-index: 1;
              }
              
              .content {
                padding: 48px 40px;
              }
              
              .greeting {
                font-size: 18px;
                font-weight: 600;
                color: #111827;
                margin-bottom: 16px;
              }
              
              .message {
                font-size: 16px;
                color: #4b5563;
                margin-bottom: 32px;
                line-height: 1.7;
              }
              
              .product-card {
                background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
                border: 2px solid #e5e7eb;
                border-radius: 12px;
                padding: 24px;
                margin: 32px 0;
                position: relative;
                overflow: hidden;
              }
              
              .product-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 4px;
                height: 100%;
                background: linear-gradient(180deg, #8b5cf6 0%, #6366f1 50%, #3b82f6 100%);
              }
              
              .product-card h2 {
                color: #6366f1;
                font-size: 18px;
                font-weight: 600;
                margin: 0 0 16px;
                display: flex;
                align-items: center;
              }
              
              .product-card h2::before {
                content: '📦';
                margin-right: 8px;
                font-size: 20px;
              }
              
              .product-details {
                margin: 0;
              }
              
              .product-details p {
                margin: 8px 0;
                font-size: 15px;
                color: #374151;
              }
              
              .product-details strong {
                color: #111827;
                font-weight: 600;
                display: inline-block;
                min-width: 120px;
              }
              
              .cta-button {
                display: inline-block;
                background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
                color: #ffffff !important;
                padding: 16px 40px;
                text-decoration: none;
                border-radius: 10px;
                margin: 32px 0;
                font-weight: 600;
                font-size: 16px;
                box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
                transition: all 0.3s ease;
                text-align: center;
              }
              
              .cta-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 15px 40px rgba(99, 102, 241, 0.4);
              }
              
              .button-container {
                text-align: center;
                margin: 32px 0;
              }
              
              .next-steps {
                background-color: #fef3c7;
                border-left: 4px solid #f59e0b;
                border-radius: 8px;
                padding: 20px 24px;
                margin: 32px 0;
              }
              
              .next-steps h3 {
                color: #92400e;
                font-size: 16px;
                font-weight: 600;
                margin: 0 0 12px;
                display: flex;
                align-items: center;
              }
              
              .next-steps h3::before {
                content: '✨';
                margin-right: 8px;
              }
              
              .next-steps ul {
                margin: 0;
                padding-left: 20px;
              }
              
              .next-steps li {
                color: #78350f;
                font-size: 14px;
                margin: 8px 0;
                line-height: 1.6;
              }
              
              .divider {
                height: 1px;
                background: linear-gradient(90deg, transparent 0%, #e5e7eb 50%, transparent 100%);
                margin: 32px 0;
              }
              
              .footer {
                background-color: #f9fafb;
                padding: 32px 40px;
                text-align: center;
                border-top: 1px solid #e5e7eb;
              }
              
              .footer p {
                color: #6b7280;
                font-size: 14px;
                margin: 8px 0;
                line-height: 1.6;
              }
              
              .footer-links {
                margin: 16px 0;
              }
              
              .footer-links a {
                color: #6366f1;
                text-decoration: none;
                margin: 0 12px;
                font-size: 14px;
                font-weight: 500;
              }
              
              .social-icons {
                margin: 20px 0 16px;
              }
              
              .social-icons a {
                display: inline-block;
                width: 36px;
                height: 36px;
                background-color: #e5e7eb;
                border-radius: 50%;
                margin: 0 6px;
                line-height: 36px;
                text-align: center;
                text-decoration: none;
                color: #6b7280;
                transition: all 0.3s ease;
              }
              
              .social-icons a:hover {
                background-color: #6366f1;
                color: #ffffff;
                transform: translateY(-2px);
              }
              
              .copyright {
                color: #9ca3af;
                font-size: 13px;
                margin-top: 16px;
              }
              
              @media only screen and (max-width: 600px) {
                .email-wrapper {
                  padding: 20px 10px;
                }
                
                .header {
                  padding: 32px 24px;
                }
                
                .header h1 {
                  font-size: 24px;
                }
                
                .content {
                  padding: 32px 24px;
                }
                
                .footer {
                  padding: 24px 20px;
                }
                
                .cta-button {
                  padding: 14px 32px;
                  font-size: 15px;
                }
              }
            </style>
          </head>
          <body>
            <div class="email-wrapper">
              <div class="email-container">
                <!-- Header -->
                <div class="header">
                  <div class="logo">💰</div>
                  <h1>Thank You for Your Purchase!</h1>
                  <p>Your digital product is ready to access</p>
                </div>
                
                <!-- Content -->
                <div class="content">
                  <p class="greeting">Hello${userName ? ` ${userName}` : ''},</p>
                  
                  <p class="message">
                    We're excited to deliver <strong>${productTitle}</strong> to you! 
                    Your purchase has been confirmed and your digital product is now available for immediate access.
                  </p>
                  
                  <!-- Product Card -->
                  <div class="product-card">
                    <h2>Product Details</h2>
                    <div class="product-details">
                      <p><strong>Product:</strong> ${productTitle}</p>
                      <p><strong>Email:</strong> ${email}</p>
                      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
                      <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                  </div>
                  
                  <!-- CTA Button -->
                  <div class="button-container">
                    <a href="${Deno.env.get("SUPABASE_URL")?.replace('supabase.co', 'lovable.app') || 'https://your-app.lovable.app'}" class="cta-button">
                      Access Your Product Now →
                    </a>
                  </div>
                  
                  <!-- Next Steps -->
                  <div class="next-steps">
                    <h3>Next Steps</h3>
                    <ul>
                      <li>Download and save your product for offline access</li>
                      <li>Complete the templates at your own pace</li>
                      <li>Bookmark this page for easy future reference</li>
                      <li>Contact our support team if you have any questions</li>
                    </ul>
                  </div>
                  
                  <div class="divider"></div>
                  
                  <p class="message" style="margin-bottom: 0; font-size: 14px; color: #6b7280;">
                    Need help? We're here for you. Simply reply to this email or visit our support center.
                  </p>
                </div>
                
                <!-- Footer -->
                <div class="footer">
                  <div class="social-icons">
                    <a href="#" title="Facebook">f</a>
                    <a href="#" title="Twitter">𝕏</a>
                    <a href="#" title="LinkedIn">in</a>
                  </div>
                  
                  <div class="footer-links">
                    <a href="#">Help Center</a>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                  </div>
                  
                  <p style="margin-top: 20px;">
                    If you didn't make this purchase, please contact our support team immediately.
                  </p>
                  
                  <p class="copyright">
                    © ${new Date().getFullYear()} Debt Management Tools. All rights reserved.
                  </p>
                </div>
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
