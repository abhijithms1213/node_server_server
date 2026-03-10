const mongoose = require('mongoose');

const userSchemaOTP = new mongoose.Schema({
  username: String,
  phone: String,
  otp: String,
  otpExpiration: Date,
});

module.exports = mongoose.model('Userotp', userSchemaOTP);