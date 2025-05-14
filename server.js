const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://myprofile-lemon-seven.vercel.app", // your actual deployed frontend
  "https://portfolio-main-eight-delta.vercel.app", // optional: older frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["POST"],
    credentials: true,
    allowedHeaders: ["Content-Type"],
  })
);


// app.use(
//   cors({
//     origin: "http://localhost:5173",// Replace with your frontend URL
//     methods: ["POST"], // Allow only POST requests
//     credentials:true,
//     allowedHeaders: ["Content-Type"],
//   })
// );

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