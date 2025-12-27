const SibApiV3Sdk = require('sib-api-v3-sdk');

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// Email templates
const getConfirmationEmailTemplate = (formData) => {
  return {
    subject: "Thank you for contacting Hexapure! 🎉",
    htmlContent: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Contact Confirmation - Hexapure</title>
            <style>
                body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
                .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
                .header { background: linear-gradient(135deg, #2E8B57, #1F5A36); color: white; padding: 40px 30px; text-align: center; }
                .content { padding: 40px 30px; }
                .footer { background-color: #f8f9fa; padding: 20px 30px; text-align: center; color: #666; font-size: 12px; }
                .highlight { color: #2E8B57; font-weight: bold; }
                .details { background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
                .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="logo">Hexapure</div>
                    <h1>Thank You for Reaching Out! 🌟</h1>
                    <p>We have received your message and will get back to you soon.</p>
                </div>

                <div class="content">
                    <h2>Hello ${formData.name}!</h2>
                    <p>Thank you for contacting Hexapure. We have successfully received your inquiry and our team will review it shortly.</p>

                    <div class="details">
                        <h3>Your Message Details:</h3>
                        <p><strong>Name:</strong> ${formData.name}</p>
                        <p><strong>Company:</strong> ${
                          formData.company || "Not provided"
                        }</p>
                        <p><strong>Email:</strong> ${formData.email}</p>
                        <p><strong>Phone:</strong> ${
                          formData.phone || "Not provided"
                        }</p>
                        <p><strong>Subject:</strong> ${formData.subject}</p>
                        <p><strong>Message:</strong></p>
                        <p style="background-color: #fff; padding: 15px; border-radius: 5px; border-left: 4px solid #2E8B57;">${
                          formData.message
                        }</p>
                    </div>

                    <p>Our typical response time is <span class="highlight">24-48 hours</span>. If your inquiry is urgent, please call us at <span class="highlight">+91 89034 88003</span>.</p>

                    <p>Best regards,<br>
                    <strong>The Hexapure Team</strong></p>
                </div>

                <div class="footer">
                    <p>Hexapure - Leaders in Eco-Friendly Wastewater Solutions</p>
                    <p>Edaiyanvillai, Santhaiyadi Post, Kanyakumari District - 629703</p>
                    <p>Email: hexapurebiotanks@gmail.com | Phone: +91 89034 88003</p>
                </div>
            </div>
        </body>
        </html>
        `,
    textContent: `
        Thank you for contacting Hexapure!

        Hello ${formData.name}!

        Thank you for contacting Hexapure. We have successfully received your inquiry and our team will review it shortly.

        Your Message Details:
        Name: ${formData.name}
        Company: ${formData.company || "Not provided"}
        Email: ${formData.email}
        Phone: ${formData.phone || "Not provided"}
        Subject: ${formData.subject}
        Message: ${formData.message}

        Our typical response time is 24-48 hours. If your inquiry is urgent, please call us at +91 89034 88003.

        Best regards,
        The Hexapure Team

        Hexapure - Leaders in Eco-Friendly Wastewater Solutions
        Edaiyanvillai, Santhaiyadi Post, Kanyakumari District - 629703
        Email: hexapurebiotanks@gmail.com | Phone: +91 89034 88003
        `,
  };
};

const getAdminNotificationTemplate = (formData) => {
  return {
    subject: "New Contact Form Submission - Hexapure 📬",
    htmlContent: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Contact Submission - Hexapure</title>
            <style>
                body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
                .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
                .header { background: linear-gradient(135deg, #2E8B57, #1F5A36); color: white; padding: 40px 30px; text-align: center; }
                .content { padding: 40px 30px; }
                .footer { background-color: #f8f9fa; padding: 20px 30px; text-align: center; color: #666; font-size: 12px; }
                .highlight { color: #2E8B57; font-weight: bold; }
                .details { background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
                .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
                .urgent { color: #dc3545; font-weight: bold; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="logo">Hexapure</div>
                    <h1>New Contact Form Submission 📬</h1>
                    <p>A new inquiry has been received on the website.</p>
                </div>

                <div class="content">
                    <h2>Contact Details</h2>

                    <div class="details">
                        <h3>Customer Information:</h3>
                        <p><strong>Name:</strong> ${formData.name}</p>
                        <p><strong>Company:</strong> ${
                          formData.company || "Not provided"
                        }</p>
                        <p><strong>Email:</strong> <a href="mailto:${
                          formData.email
                        }" class="highlight">${formData.email}</a></p>
                        <p><strong>Phone:</strong> <a href="tel:${
                          formData.phone
                        }" class="highlight">${
      formData.phone || "Not provided"
    }</a></p>
                        <p><strong>Subject:</strong> ${formData.subject}</p>
                        <p><strong>Message:</strong></p>
                        <p style="background-color: #fff; padding: 15px; border-radius: 5px; border-left: 4px solid #2E8B57;">${
                          formData.message
                        }</p>
                        <p><strong>Submitted on:</strong> ${new Date().toLocaleString()}</p>
                    </div>

                    <div style="background-color: #e8f5e8; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <p><strong>Action Required:</strong> Please respond to this inquiry within 24-48 hours.</p>
                        <p><strong>Priority:</strong> ${
                          formData.subject.toLowerCase().includes("urgent")
                            ? '<span class="urgent">HIGH - Contains urgent keyword</span>'
                            : "Normal"
                        }</p>
                    </div>

                    <p>Please log in to the admin dashboard to manage this inquiry.</p>

                    <p>Best regards,<br>
                    <strong>Hexapure System</strong></p>
                </div>

                <div class="footer">
                    <p>Hexapure Admin Notification System</p>
                    <p>This is an automated message. Please do not reply to this email.</p>
                </div>
            </div>
        </body>
        </html>
        `,
    textContent: `
        New Contact Form Submission - Hexapure

        Contact Details

        Customer Information:
        Name: ${formData.name}
        Company: ${formData.company || "Not provided"}
        Email: ${formData.email}
        Phone: ${formData.phone || "Not provided"}
        Subject: ${formData.subject}
        Message: ${formData.message}
        Submitted on: ${new Date().toLocaleString()}

        Action Required: Please respond to this inquiry within 24-48 hours.
        Priority: ${
          formData.subject.toLowerCase().includes("urgent")
            ? "HIGH - Contains urgent keyword"
            : "Normal"
        }

        Please log in to the admin dashboard to manage this inquiry.

        Best regards,
        Hexapure System

        Hexapure Admin Notification System
        This is an automated message. Please do not reply to this email.
        `,
  };
};

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const formData = JSON.parse(event.body);

    // Validate required fields
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Send confirmation email to user
    const userEmailData = {
      sender: { email: process.env.FROM_EMAIL || 'hexapurebiotanks@gmail.com', name: "Hexapure" },
      to: [{ email: formData.email, name: formData.name }],
      ...getConfirmationEmailTemplate(formData),
    };

    await apiInstance.sendTransacEmail(userEmailData);
    console.log("Confirmation email sent to user:", formData.email);

    // Send notification email to admin
    const adminEmailData = {
      sender: { email: process.env.FROM_EMAIL || 'hexapurebiotanks@gmail.com', name: "Hexapure System" },
      to: [{ email: process.env.ADMIN_EMAIL || 'hexapurebiotanks@gmail.com', name: "Hexapure Admin" }],
      ...getAdminNotificationTemplate(formData),
    };

    await apiInstance.sendTransacEmail(adminEmailData);
    console.log("Notification email sent to admin");

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Emails sent successfully' }),
    };

  } catch (error) {
    console.error('Error sending emails:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send emails', details: error.message }),
    };
  }
};
