const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    isWaiting: { type: Boolean },
    shop_unique_id: { type: String },
    order_count: {
      type: Number,
    },

    role: {
      type: String,
      default: "business user",
    },

    email: {
      type: String,
      required: true,
    },

    createdBy: String,

    businessName: {
      type: String,
      required: true,
    },

    businessCategory: {
      type: String,
      enum: ["restaurant", "grocery", "pharmacy", "other"],
      required: true,
    },

    phone: String,

    gstNumber: String,

    address: String,

    pincode: String,

    state: String,

    city: String,

    deliveryCharge: Number,

    description: String,

    logoUrl: String,

    bannerUrl: String,

    uid: String,
  },
  { timestamps: true },
);

shopSchema.index({ businessCategory: 1 });
shopSchema.index({ city: 1 });

module.exports = mongoose.model("Shop", shopSchema);
