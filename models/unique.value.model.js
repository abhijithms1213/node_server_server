const mongoose = require("mongoose");

const uniqueValueSchema = new mongoose.Schema({
  prefix: String,
  count: Number
});

module.exports = mongoose.model("UniqueValue", uniqueValueSchema);