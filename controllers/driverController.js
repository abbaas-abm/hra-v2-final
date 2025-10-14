const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const Driver = require('../models/DriverModel');
const generateToken = require('../utils/generateJwtToken');

// Initialize OAuth2 Client
const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

// Helper: Build Nodemailer transporter
async function createTransporter() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken?.token,
      },
    });
    return transporter;
  } catch (err) {
    console.error('❌ Failed to create transporter:', err);
    throw err;
  }
}

// Helper: Build attachments array from uploaded files (multer)
function buildAttachments(filesObj = {}) {
  const attachments = [];
  for (const fieldName of Object.keys(filesObj)) {
    const fileArray = filesObj[fieldName];
    if (!fileArray || fileArray.length === 0) continue;
    const file = fileArray[0];
    attachments.push({
      filename: file.originalname,
      content: file.buffer,
      contentType: file.mimetype,
    });
  }
  return attachments;
}

// @desc    Register new driver
// @route   POST /driver/auth/register
// @access  Public
const registerDriver = asyncHandler(async (req, res) => {
  // Frontend sends JSON data under `data` field in FormData
  if (!req.body.data) {
    res.status(400);
    throw new Error('Missing registration data');
  }

  let parsed;
  try {
    parsed = JSON.parse(req.body.data);
  } catch (err) {
    res.status(400);
    throw new Error('Invalid JSON in data field');
  }

  const { companyDetails, userDetails, bankDetails } = parsed;

  // Validate input
  if (!companyDetails || !userDetails || !bankDetails) {
    res.status(400);
    throw new Error('Please fill out all required fields');
  }

  // Check if driver exists
  const existingDriver = await Driver.findOne({ 'userDetails.email': userDetails.email });
  if (existingDriver) {
    res.status(400);
    throw new Error('Driver with that email already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userDetails.password, salt);

  // Create driver in DB
  const driver = await Driver.create({
    companyDetails,
    bankDetails,
    userDetails: { ...userDetails, password: hashedPassword },
  });

  if (!driver) {
    res.status(400);
    throw new Error('Invalid driver data');
  }

  // Build attachments for email
  const attachments = buildAttachments(req.files);

  // Send email notification
  try {
    const transporter = await createTransporter();

    const mailOptions = {
      from: `"HRA Transportation" <${process.env.EMAIL_USER}>`,
      to: process.env.NOTIFY_EMAIL || process.env.EMAIL_USER, // Admin inbox
      cc: userDetails.email, // Optional: send a copy to driver
      subject: `Welcome & New Driver Registration: ${userDetails.firstName} ${userDetails.lastName}`,
      html: `
        <div style="font-family: 'Arial', sans-serif; background-color: #FBBF24; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        
        <!-- Header -->
        <div style="background-color: #FBBF24; padding: 20px; text-align: center;">
          <h1 style="margin: 0; color: #fff; font-size: 24px;">HRA Transportation</h1>
        </div>
        
        <!-- Body -->
        <div style="padding: 25px; color: #333;">
          <p style="font-size: 16px;">Hello ${userDetails.firstName},</p>
          <p style="font-size: 16px;">Thank you for registering as a driver with <strong>HRA Transportation</strong>! Your registration details are below:</p>

          <!-- Driver Details -->
          <h2 style="color: #FBBF24; font-size: 20px; margin-bottom: 10px;">Driver Details</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px; font-weight: bold;">Full Name</td>
              <td style="padding: 8px;">${userDetails.firstName} ${userDetails.lastName}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 8px; font-weight: bold;">Email</td>
              <td style="padding: 8px;">${userDetails.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Mobile</td>
              <td style="padding: 8px;">${userDetails.mobileNumber}</td>
            </tr>
          </table>

          <!-- Company & Vehicle Details -->
          <h2 style="color: #FBBF24; font-size: 20px; margin-bottom: 10px;">Company & Vehicle Details</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px; font-weight: bold;">Company Name</td>
              <td style="padding: 8px;">${companyDetails.companyName}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 8px; font-weight: bold;">Vehicle</td>
              <td style="padding: 8px;">${companyDetails.vehicleMake} ${companyDetails.vehicleModel}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">VIN Number</td>
              <td style="padding: 8px;">${companyDetails.vinNumber}</td>
            </tr>
          </table>

          <!-- Bank Details -->
          <h2 style="color: #FBBF24; font-size: 20px; margin-bottom: 10px;">Bank Details</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px; font-weight: bold;">Bank Name</td>
              <td style="padding: 8px;">${bankDetails.bankName}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 8px; font-weight: bold;">Account Number</td>
              <td style="padding: 8px;">${bankDetails.accountNumber}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Account Holder</td>
              <td style="padding: 8px;">${bankDetails.accountHolderName}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 8px; font-weight: bold;">Account Type</td>
              <td style="padding: 8px;">${bankDetails.accountType}</td>
            </tr>
          </table>

          <p style="font-size: 16px; margin-top: 20px;">Please check the attachments for your uploaded documents.</p>
          <p style="font-size: 16px;">— <strong>HRA Transportation</strong></p>
        </div>

        <!-- Footer -->
        <div style="background-color: #FBBF24; text-align: center; padding: 15px; color: #fff; font-size: 12px;">
          &copy; ${new Date().getFullYear()} HRA Transportation. All rights reserved.
        </div>
      </div>
    </div>
  `,
  attachments,
    };

    await transporter.sendMail(mailOptions);
    console.log('📧 Registration email sent successfully');
  } catch (emailErr) {
    console.error('⚠️ Failed to send registration email:', emailErr);
  }

  // Respond with token + driver info
  res.status(201).json({
    message: 'Driver registered successfully',
    _id: driver._id,
    name: `${driver.userDetails.firstName} ${driver.userDetails.lastName}`,
    email: driver.userDetails.email,
    token: generateToken(driver._id),
  });
});

// @desc    Authenticate existing driver
// @route   POST /driver/auth/login
// @access  Public
// const loginDriver = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   const driver = await Driver.findOne({ 'userDetails.email': email });
//   if (driver && (await bcrypt.compare(password, driver.userDetails.password))) {
//     res.json({
//       message: 'Logged in successfully',
//       _id: driver.id,
//       name: `${driver.userDetails.firstName} ${driver.userDetails.lastName}`,
//       email: driver.userDetails.email,
//       token: generateToken(driver._id),
//     });
//   } else {
//     res.status(400);
//     throw new Error('Invalid credentials');
//   }
// });

// @desc    Authenticate existing driver
// @route   POST /auth/driver/login
// @access  Public
const loginDriver = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find the driver by their email address
  const driver = await Driver.findOne({ 'userDetails.email': email });

  // Check if the driver exists and if the provided password is correct
  if (driver && (await bcrypt.compare(password, driver.userDetails.password))) {
    // Passwords match, return success message and token
    res.json({
      message: 'Logged in successfully',
      _id: driver.id,
      name: `${driver.userDetails.firstName} ${driver.userDetails.lastName}`,
      email: driver.userDetails.email,
      token: generateToken(driver._id),
    });
  } else {
    // Incorrect email or password
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

module.exports = {
  registerDriver,
  loginDriver,
};
