require('dotenv').config(); // <---- Load environment variables

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const { OAuth2Client } = require('google-auth-library');

// Use env variables
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

if (!CLIENT_ID || !EMAIL_USER || !EMAIL_PASS) {
  console.error('❌ Missing required environment variables in .env');
  process.exit(1);
}

const client = new OAuth2Client(CLIENT_ID);
const app = express();
app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

app.post('/send-uuid', async (req, res) => {
  const { token } = req.body;

  try {
    // 1. Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload.email;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email not found in token' });
    }

    // 2. Generate UUID
    const uuid = uuidv4();

    // 3. Send email with UUID
    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: 'Your UUID Code',
      text: `Hello,\n\nHere is your UUID: ${uuid}\n\nThank you!`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: 'UUID sent to email' });
  } catch (error) {
    console.error('Error verifying token or sending mail:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`✅ Backend running at http://localhost:${PORT}`));
