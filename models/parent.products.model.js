const mongoose = require("mongoose");

const parentOrderSchema = new mongoose.Schema(
{
  orderCreationId: String,

  userId: String,

  addressInputModel: {
    addressId: String,
    addressType: String,
    district: String,
    formattedAddress: String,
    houseName: String,
    isDefault: Boolean,
    pinCode: String,
    state: String,
    street: String,
  },

  categorizedCartModelList: [
    {
      cartCategoryName: String,
      createdAt: Number,

      shopsCartList: [
        {
          shopId: String,
          shopName: String,
          shopImage: String,
          shopCategory: String,

          products: [
            {
              productcode: String,
              productname: String,
              quantity: Number,
              appprice: Number,
              subTotal: Number
            }
          ],

          totalAmountOfEachShop: Number
        }
      ],

      totalAmountOfEachCategory: Number
    }
  ],

  deliveryCharge: Number,
  deliveryChargeGst: Number,
  deliveryChargeandGst: Number,

  platformFee: Number,
  platformFeeGst: Number,
  platformFeeandGst: Number,

  tip: Number,

  paymentId: String,
  paymentStatus: String,

  totalPayableAmount: Number,

  shopCount: Number,

  createdAt: Number
},
{ timestamps: true }
);

parentOrderSchema.index({ userId: 1 });
parentOrderSchema.index({ orderCreationId: 1 });
parentOrderSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Order", parentOrderSchema);