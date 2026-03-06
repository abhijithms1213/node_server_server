const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: String,
  productname: String,
  quantity: Number,

  price: Number,
  mrp: Number,
  discount: Number,

  cgst: Number,
  sgst: Number,

  imageUrl: String,

  subTotal: Number,
});

const commissionSchema = new mongoose.Schema({
  type: String,
  values: {
    commission: Number,
    mode: String,
    platformFee: Number,
  },
});

const shopOrderSchema = new mongoose.Schema(
  {
    parentOrderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },

    orderCreationId: String,

    shopId: String,
    shopName: String,
    shopImage: String,

    shop_unique_id: String,
    userId: String,

    products: [productSchema],

    mynCommission: commissionSchema,

    totalAmount: Number,

    status: {
      type: String,
      default: "Submitted",
    },
    billno: { type: String },

    createdAt: Number,
  },
  { timestamps: true },
);

shopOrderSchema.index({ shopId: 1 });
shopOrderSchema.index({ userId: 1 });
shopOrderSchema.index({ orderCreationId: 1 });
shopOrderSchema.index({ createdAt: -1 });

module.exports = mongoose.model("ShopOrder", shopOrderSchema);
