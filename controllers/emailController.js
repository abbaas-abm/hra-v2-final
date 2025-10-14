const asyncHandler = require('express-async-handler');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

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
    throw new Error('Failed to create email transporter');
  }
}

// Helper: Build attachments array from uploaded files
function buildAttachments(files = {}) {
  const attachments = [];
  const fileFields = ['idCopy', 'proofOfResidence', 'bankStatement'];
  for (const field of fileFields) {
    if (files[field] && files[field][0]) {
      const file = files[field][0];
      attachments.push({
        filename: file.originalname,
        content: file.buffer, // Use buffer since memoryStorage is used
        contentType: file.mimetype,
      });
    }
  }
  return attachments;
}

// @desc    Handle storage order submission and send email
// @route   POST /email/storage
// @access  Public
const sendStorageEmail = asyncHandler(async (req, res) => {
  // Destructure text fields from req.body
  const {
    firstname,
    lastname,
    email,
    number,
    pickup,
    return: returnAddress, // Rename to avoid reserved keyword
    months,
    items: itemsJson,
    total,
  } = req.body;
  console.log(req.body);
  console.log(req.files);
  // Validate required fields
  if (!firstname || !lastname || !email || !number || !pickup || !returnAddress || !months) {
    res.status(400);
    throw new Error('Missing required form fields');
  }

  // Parse items JSON
  let items = [];
  try {
    items = JSON.parse(itemsJson || '[]');
  } catch (err) {
    res.status(400);
    throw new Error('Invalid items data');
  }

  // Get attachments from files
  const attachments = buildAttachments(req.files);

  // Create email transporter
  const transporter = await createTransporter();

  // Build HTML email
  const mailOptions = {
    from: `"HRA Transportation" <${process.env.EMAIL_USER}>`,
    to: process.env.NOTIFY_EMAIL || process.env.EMAIL_USER, // Admin inbox
    cc: email, // Send copy to customer
    subject: `New Storage Order: ${firstname} ${lastname}`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #FBBF24; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <!-- Header -->
          <div style="background-color: #FBBF24; padding: 20px; text-align: center;">
            <h1 style="margin: 0; color: #fff; font-size: 24px;">HRA Transportation</h1>
            <p style="margin: 5px 0 0; color: #fff; font-size: 16px;">Warehouse Storage Registration</p>
          </div>
          
          <!-- Body -->
          <div style="padding: 25px; color: #333;">
            <p style="font-size: 16px;">Dear ${firstname},</p>
            <p style="font-size: 16px;">Thank you for registering for warehouse storage with <strong>HRA Transportation</strong>. Below are the details of your storage order:</p>

            <!-- Personal Details -->
            <h2 style="color: #FBBF24; font-size: 20px; margin-bottom: 10px;">Personal Details</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px; font-weight: bold;">Full Name</td>
                <td style="padding: 8px;">${firstname} ${lastname}</td>
              </tr>
              <tr style="background-color: #f9f9f9;">
                <td style="padding: 8px; font-weight: bold;">Email</td>
                <td style="padding: 8px;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">Phone Number</td>
                <td style="padding: 8px;">${number}</td>
              </tr>
              <tr style="background-color: #f9f9f9;">
                <td style="padding: 8px; font-weight: bold;">Pick-up Address</td>
                <td style="padding: 8px;">${pickup}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">Return Address</td>
                <td style="padding: 8px;">${returnAddress}</td>
              </tr>
              <tr style="background-color: #f9f9f9;">
                <td style="padding: 8px; font-weight: bold;">Storage Duration</td>
                <td style="padding: 8px;">${months} months</td>
              </tr>
            </table>

            <!-- Storage Items -->
            <h2 style="color: #FBBF24; font-size: 20px; margin-bottom: 10px;">Storage Items</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              ${items.length > 0 ? items.map(item => `
                <tr>
                  <td style="padding: 8px; font-weight: bold;">${item.name}</td>
                  <td style="padding: 8px;">Quantity: ${item.quantity}</td>
                  <td style="padding: 8px;">R${item.price * item.quantity}</td>
                </tr>
              `).join('') : `
                <tr>
                  <td style="padding: 8px; text-align: center;" colspan="3">No items selected</td>
                </tr>
              `}
              <tr style="background-color: #f9f9f9;">
                <td style="padding: 8px; font-weight: bold;" colspan="2">Total Cost</td>
                <td style="padding: 8px;">R${total}</td>
              </tr>
            </table>

            <!-- Attachments -->
            <h2 style="color: #FBBF24; font-size: 20px; margin-bottom: 10px;">Uploaded Documents</h2>
            <p style="font-size: 16px;">Please find the attached documents (Certified Copy of ID, Proof of Residence, Recent Bank Statement) for your records.</p>

            <p style="font-size: 16px; margin-top: 20px;">We will review your submission and contact you soon to confirm the details.</p>
            <p style="font-size: 16px;">— <strong>HRA Transportation Team</strong></p>
          </div>

          <!-- Footer -->
          <div style="background-color: #FBBF24; text-align: center; padding: 15px; color: #fff; font-size: 12px;">
            &copy; ${new Date().getFullYear()} HRA Transportation. All rights reserved.
            <br>
            <a href="https://www.hratransportation.com" style="color: #fff; text-decoration: underline;">Visit our website</a>
          </div>
        </div>
      </div>
    `,
    attachments,
  };

  // Send email
  await transporter.sendMail(mailOptions);
  console.log('📧 Storage order email sent successfully');

  res.json({ success: true });
});

// @desc    Handle fridge rental order submission and send email
// @route   POST /email/fridge-rental
// @access  Public
const sendFridgeRentalEmail = asyncHandler(async (req, res) => {
  try {
    console.log('📥 Received request body:', req.body);
    console.log('📥 Received files:', req.files);

    // Destructure text fields from req.body
    const {
      firstname,
      lastname,
      dob,
      gender,
      number,
      email,
      residentialAddress,
      institutionName,
      studentId,
      course,
      year,
      residentialStatus,
      residenceName,
      residenceRoom,
      applianceSize,
      rentalDuration,
      startDate,
      emergencyName,
      emergencyRelationship,
      emergencyNumber,
      total,
    } = req.body;

    // Validate required fields
    const requiredFields = {
      firstname,
      lastname,
      dob,
      gender,
      number,
      email,
      residentialAddress,
      institutionName,
      studentId,
      course,
      year,
      residentialStatus,
      residenceName,
      applianceSize,
      rentalDuration,
      startDate,
      emergencyName,
      emergencyRelationship,
      emergencyNumber,
    };
    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([key]) => key);
    if (missingFields.length > 0) {
      console.error('❌ Missing required fields:', missingFields);
      res.status(400);
      throw new Error(`Missing required form fields: ${missingFields.join(', ')}`);
    }

    // Get attachments from files
    const attachments = buildAttachments(req.files);

    // Validate files
    const expectedFileFields = ['idCopy', 'proofOfResidence', 'bankStatement'];
    const missingFiles = expectedFileFields.filter(
      (field) => !req.files[field] || !req.files[field][0]
    );
    if (missingFiles.length > 0) {
      console.error('❌ Missing required files:', missingFiles);
      res.status(400);
      throw new Error(`Missing required files: ${missingFiles.join(', ')}`);
    }

    // Create email transporter
    const transporter = await createTransporter();

    // Format startDate
    const formattedStartDate = new Date(startDate).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Build HTML email
    const mailOptions = {
      from: `"HRA Transportation" <${process.env.EMAIL_USER}>`,
      to: process.env.NOTIFY_EMAIL || process.env.EMAIL_USER,
      cc: email,
      subject: `New Fridge Rental Order: ${firstname} ${lastname}`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #FBBF24; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background-color: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            <!-- Header -->
            <div style="background-color: #FBBF24; padding: 20px; text-align: center;">
              <h1 style="margin: 0; color: #fff; font-size: 24px;">HRA Transportation</h1>
              <p style="margin: 5px 0 0; color: #fff; font-size: 16px;">Fridge Rental Registration</p>
            </div>
            
            <!-- Body -->
            <div style="padding: 25px; color: #333;">
              <p style="font-size: 16px;">Dear ${firstname},</p>
              <p style="font-size: 16px;">Thank you for registering for a fridge rental with <strong>HRA Transportation</strong>. Below are the details of your order:</p>

              <!-- Personal Details -->
              <h2 style="color: #FBBF24; font-size: 20px; margin-bottom: 10px;">Personal Details</h2>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 8px; font-weight: bold;">Full Name</td>
                  <td style="padding: 8px;">${firstname} ${lastname}</td>
                </tr>
                <tr style="background-color: #f9f9f9;">
                  <td style="padding: 8px; font-weight: bold;">Date of Birth</td>
                  <td style="padding: 8px;">${dob}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; font-weight: bold;">Gender</td>
                  <td style="padding: 8px;">${gender}</td>
                </tr>
                <tr style="background-color: #f9f9f9;">
                  <td style="padding: 8px; font-weight: bold;">Email</td>
                  <td style="padding: 8px;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; font-weight: bold;">Contact Number</td>
                  <td style="padding: 8px;">${number}</td>
                </tr>
                <tr style="background-color: #f9f9f9;">
                  <td style="padding: 8px; font-weight: bold;">Residential Address</td>
                  <td style="padding: 8px;">${residentialAddress}</td>
                </tr>
              </table>

              <!-- Academic Details -->
              <h2 style="color: #FBBF24; font-size: 20px; margin-bottom: 10px;">Academic Details</h2>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 8px; font-weight: bold;">Institution Name</td>
                  <td style="padding: 8px;">${institutionName}</td>
                </tr>
                <tr style="background-color: #f9f9f9;">
                  <td style="padding: 8px; font-weight: bold;">Student ID</td>
                  <td style="padding: 8px;">${studentId}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; font-weight: bold;">Course of Study</td>
                  <td style="padding: 8px;">${course}</td>
                </tr>
                <tr style="background-color: #f9f9f9;">
                  <td style="padding: 8px; font-weight: bold;">Year of Study</td>
                  <td style="padding: 8px;">${year}</td>
                </tr>
              </table>

              <!-- Residence Information -->
              <h2 style="color: #FBBF24; font-size: 20px; margin-bottom: 10px;">Residence Information</h2>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 8px; font-weight: bold;">Residential Status</td>
                  <td style="padding: 8px;">${residentialStatus}</td>
                </tr>
                <tr style="background-color: #f9f9f9;">
                  <td style="padding: 8px; font-weight: bold;">Residence Name</td>
                  <td style="padding: 8px;">${residenceName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; font-weight: bold;">Residence Room Number</td>
                  <td style="padding: 8px;">${residenceRoom || 'Not provided'}</td>
                </tr>
              </table>

              <!-- Lease Details -->
              <h2 style="color: #FBBF24; font-size: 20px; margin-bottom: 10px;">Lease Details</h2>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 8px; font-weight: bold;">Appliance Size</td>
                  <td style="padding: 8px;">${applianceSize}</td>
                </tr>
                <tr style="background-color: #f9f9f9;">
                  <td style="padding: 8px; font-weight: bold;">Rental Duration</td>
                  <td style="padding: 8px;">${rentalDuration} months</td>
                </tr>
                <tr>
                  <td style="padding: 8px; font-weight: bold;">Start Date</td>
                  <td style="padding: 8px;">${formattedStartDate}</td>
                </tr>
                <tr style="background-color: #f9f9f9;">
                  <td style="padding: 8px; font-weight: bold;">Total Cost</td>
                  <td style="padding: 8px;">R${total}</td>
                </tr>
              </table>

              <!-- Emergency Contact -->
              <h2 style="color: #FBBF24; font-size: 20px; margin-bottom: 10px;">Emergency Contact</h2>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 8px; font-weight: bold;">Name</td>
                  <td style="padding: 8px;">${emergencyName}</td>
                </tr>
                <tr style="background-color: #f9f9f9;">
                  <td style="padding: 8px; font-weight: bold;">Relationship</td>
                  <td style="padding: 8px;">${emergencyRelationship}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; font-weight: bold;">Contact Number</td>
                  <td style="padding: 8px;">${emergencyNumber}</td>
                </tr>
              </table>

              <!-- Attachments -->
              <h2 style="color: #FBBF24; font-size: 20px; margin-bottom: 10px;">Uploaded Documents</h2>
              <p style="font-size: 16px;">Please find the attached documents (Certified Copy of ID, Proof of Residence, Bank Statement) for your records.</p>

              <p style="font-size: 16px; margin-top: 20px;">We will review your submission and contact you soon to confirm the details.</p>
              <p style="font-size: 16px;">— <strong>HRA Transportation Team</strong></p>
            </div>

            <!-- Footer -->
            <div style="background-color: #FBBF24; text-align: center; padding: 15px; color: #fff; font-size: 12px;">
              &copy; ${new Date().getFullYear()} HRA Transportation. All rights reserved.
              <br>
              <a href="https://www.hratransportation.com" style="color: #fff; text-decoration: underline;">Visit our website</a>
            </div>
          </div>
        </div>
      `,
      attachments,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('📧 Fridge rental order email sent successfully');

    res.json({ success: true });
  } catch (error) {
    console.error('⚠️ Failed to process fridge rental order:', error);
    res.status(error.status || 500).json({ success: false, message: error.message || 'Failed to process fridge rental order' });
  }
});


module.exports = {
  sendStorageEmail,
  sendFridgeRentalEmail
};