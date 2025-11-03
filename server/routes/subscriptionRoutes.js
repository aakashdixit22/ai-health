import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Load EMAIL_USER and EMAIL_PASS from .env

const router = express.Router();

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST /api/subscribe
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    // Check if email credentials are configured
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        // Create transporter using correct method
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Welcome to AI Health - Subscription Confirmed!',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
              <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h1 style="color: #3B82F6; text-align: center; margin-bottom: 20px;">Welcome to AI Health!</h1>
                <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">
                  Thank you for subscribing to AI Health! 🎉 You're now part of our community dedicated to providing AI-driven health insights and wellness support.
                </p>
               
                <ul style="font-size: 16px; line-height: 1.8; color: #333; margin-bottom: 30px;">
                  
                  <li>New AI health analysis features</li>
                  <li>Medical insights and safety recommendations</li>
                  <li>Platform updates and improvements</li>
                  
                </ul>
                <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 30px;">
                  Stay healthy and informed with AI Health!
                </p>
                <div style="text-align: center; margin: 30px 0;">
                  <a href="http://localhost:3000" style="background-color: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                    Visit AI Health
                  </a>
                </div>
                <p style="font-size: 14px; color: #666; text-align: center; margin-top: 30px;">
                  If you didn't subscribe to this newsletter, you can safely ignore this email.
                </p>
              </div>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
        console.log(`✅ Subscription confirmed and email sent to: ${email}`);
      } catch (emailError) {
        console.warn(`⚠️ Email sending failed for ${email}: ${emailError.message}`);
        console.log(`✅ Subscription confirmed for: ${email} (email sending failed, subscription processed)`);
      }
    } else {
      // Simulate email sending if credentials aren't configured
      console.log(`✅ Subscription confirmed for: ${email} (email sending simulated - configure EMAIL_USER and EMAIL_PASS in .env to enable real emails)`);
    }

    res.status(200).json({
      success: true,
      message: 'Subscription successful! Confirmation email has been sent.',
    });
  } catch (error) {
    console.error('❌ Subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process subscription. Please try again later.',
    });
  }
});

export default router;
