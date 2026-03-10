const express = require("express");
const router = express.Router();
const twilio = require("twilio");
const userOTP = require("../models/user.otp.model.js");
const { randomInt } = require("crypto");

require("dotenv").config();

const twilio_sid = process.env.TWILIO_ACCOUNT_SID;
const twilio_auth_token = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(twilio_sid, twilio_auth_token);
// TWILIO_PHONE_NUMBER
async function sendOTP(phone, otp) {
  try {
    const message = await client.messages.create({
      body: `your otp is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
  }
}

router.post("/send", async (req, res) => {
  const { phone } = req.body;
  const otp = randomInt(100000, 999999);
  try {
    // const user = await userOTP.findOne({ phone });
    // if(!user){
    //     return res.status(200).json({success:true,message:"not found any user with signup"})
    // }
    const userOtp = await userOTP.findOneAndUpdate(
      { phone },
      { otp, otpExpiration: Date.now() + 30000 },
      { upsert: true, new: true },
    );
    await sendOTP(phone, otp);
    res.status(200).json({
      success: true,
      message: `OTP sent successfully & expires in ${Date.now() + 30000}`,
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

router.post("/verify", async (req, res) => {
  try {
    const { phone, otp } = req.body;
    const user = await userOTP.findOne({ phone, otp });
    if (!user || user.otpExpiration < Date.now()) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
    user.otp = undefined;
    user.otpExpiration = undefined;
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ success: false, message: "Failed to verify OTP" });
  }
});
module.exports = router;
