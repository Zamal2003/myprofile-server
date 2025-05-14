const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());





app.use(
  cors({
    origin: "https://myprofile-lemon-seven.vercel.app",// Replace with your frontend URL
    methods: ["POST"], // Allow only POST requests
    credentials:true,
    allowedHeaders: ["Content-Type"],
  })
);

// Email Configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Contact Form Endpoint
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Failed to send the message" });
    }
    res.status(200).json({ message: "Message sent successfully" });
  });
});

app.use('*', (req,res)=>{
  res.json({message:'server is working properly'})
})
// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



// fmfq cnzz gyum ahpo
//  // https://portfolio-main-eight-delta.vercel.app/