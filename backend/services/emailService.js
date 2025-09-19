import nodemailer from "nodemailer";
import { config } from "../config/env.js";

// Create transporter
const transporter = nodemailer.createTransport({
  host: config.EMAIL_HOST,
  port: config.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS,
  },
});

// Verify connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.log("Email service error:", error);
  } else {
    console.log("Email service is ready to send messages");
  }
});

// Email templates
const emailTemplates = {
  quoteRequest: (quoteData) => ({
    subject: `New Quote Request - ${quoteData.vehicleDetails.make} ${quoteData.vehicleDetails.model}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c5aa0;">New Quote Request Received</h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2c5aa0; margin-top: 0;">Customer Information</h3>
          <p><strong>Name:</strong> ${quoteData.customer.fullName}</p>
          <p><strong>Email:</strong> ${quoteData.customer.email}</p>
          <p><strong>Phone:</strong> ${
            quoteData.customer.phone || "Not provided"
          }</p>
        </div>

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2c5aa0; margin-top: 0;">Vehicle Details</h3>
          <p><strong>Vehicle:</strong> ${quoteData.vehicleDetails.year} ${
      quoteData.vehicleDetails.make
    } ${quoteData.vehicleDetails.model}</p>
          <p><strong>Variant:</strong> ${
            quoteData.vehicleDetails.variant || "N/A"
          }</p>
          <p><strong>Color:</strong> ${
            quoteData.vehicleDetails.color || "N/A"
          }</p>
          <p><strong>Mileage:</strong> ${
            quoteData.vehicleDetails.mileage?.toLocaleString() || "N/A"
          } km</p>
          <p><strong>Base Price:</strong> ${
            quoteData.pricing.currency
          } ${quoteData.pricing.basePrice?.toLocaleString()}</p>
        </div>

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2c5aa0; margin-top: 0;">Quote Details</h3>
          <p><strong>Title:</strong> ${quoteData.title}</p>
          <p><strong>Description:</strong> ${quoteData.description}</p>
          <p><strong>Preferred Contact:</strong> ${
            quoteData.preferredContactMethod
          }</p>
          <p><strong>Expires:</strong> ${new Date(
            quoteData.expiresAt
          ).toLocaleDateString()}</p>
        </div>

        ${
          quoteData.messages && quoteData.messages.length > 0
            ? `
        <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2c5aa0; margin-top: 0;">Customer Message</h3>
          <p style="font-style: italic;">"${quoteData.messages[0].message}"</p>
        </div>
        `
            : ""
        }

        <div style="background-color: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #155724; margin-top: 0;">Next Steps</h3>
          <p>1. Review the quote request details above</p>
          <p>2. Prepare your response with pricing and terms</p>
          <p>3. Respond to the customer via email or through the admin panel</p>
          <p>4. The customer will be notified of your response</p>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #6c757d; font-size: 14px;">
            This is an automated notification from the Adalah Chain platform.
          </p>
        </div>
      </div>
    `,
  }),

  quoteResponse: (quoteData, response) => ({
    subject: `Quote Response - ${quoteData.vehicleDetails.make} ${quoteData.vehicleDetails.model}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c5aa0;">Quote Response</h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2c5aa0; margin-top: 0;">Vehicle Details</h3>
          <p><strong>Vehicle:</strong> ${quoteData.vehicleDetails.year} ${
      quoteData.vehicleDetails.make
    } ${quoteData.vehicleDetails.model}</p>
          <p><strong>Variant:</strong> ${
            quoteData.vehicleDetails.variant || "N/A"
          }</p>
        </div>

        <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2c5aa0; margin-top: 0;">Our Response</h3>
          <p><strong>Status:</strong> ${response.status}</p>
          ${
            response.pricing
              ? `
            <p><strong>Final Price:</strong> ${
              response.pricing.currency
            } ${response.pricing.totalPrice?.toLocaleString()}</p>
            <p><strong>Payment Terms:</strong> ${
              response.pricing.paymentTerms || "Standard terms apply"
            }</p>
          `
              : ""
          }
          <p><strong>Message:</strong> ${response.message}</p>
          ${
            response.terms
              ? `
            <p><strong>Terms:</strong> ${response.terms}</p>
          `
              : ""
          }
        </div>

        <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #856404; margin-top: 0;">Next Steps</h3>
          <p>1. Review our response above</p>
          <p>2. If you're interested, you can proceed with the Murabahah contract</p>
          <p>3. If you have questions, please reply to this email</p>
          <p>4. This quote is valid until ${new Date(
            quoteData.expiresAt
          ).toLocaleDateString()}</p>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <a href="${config.FRONTEND_URL}/marketplace" 
             style="background-color: #2c5aa0; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            View in Marketplace
          </a>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #6c757d; font-size: 14px;">
            This is an automated notification from the Adalah Chain platform.
          </p>
        </div>
      </div>
    `,
  }),
};

// Email service functions
export const emailService = {
  // Send quote request notification to admin
  async sendQuoteRequestNotification(quoteData) {
    try {
      const template = emailTemplates.quoteRequest(quoteData);

      const mailOptions = {
        from: config.EMAIL_FROM,
        to: config.EMAIL_USER, // Send to admin email
        subject: template.subject,
        html: template.html,
      };

      const result = await transporter.sendMail(mailOptions);
      console.log("Quote request email sent:", result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error("Error sending quote request email:", error);
      return { success: false, error: error.message };
    }
  },

  // Send quote response to customer
  async sendQuoteResponse(quoteData, response) {
    try {
      const template = emailTemplates.quoteResponse(quoteData, response);

      const mailOptions = {
        from: config.EMAIL_FROM,
        to: quoteData.customer.email,
        subject: template.subject,
        html: template.html,
      };

      const result = await transporter.sendMail(mailOptions);
      console.log("Quote response email sent:", result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error("Error sending quote response email:", error);
      return { success: false, error: error.message };
    }
  },

  // Send general notification
  async sendNotification(to, subject, html) {
    try {
      const mailOptions = {
        from: config.EMAIL_FROM,
        to,
        subject,
        html,
      };

      const result = await transporter.sendMail(mailOptions);
      console.log("Notification email sent:", result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error("Error sending notification email:", error);
      return { success: false, error: error.message };
    }
  },
};

export default emailService;
