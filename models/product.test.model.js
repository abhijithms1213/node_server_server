// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema({
//   appprice: Number,
//   bywhom: String,
//   bywhomname: String,
//   category: String,
//   cdate: String,
//   cgst: Number,
//   description: String,
//   discount: Number,
//   foodType: String,
//   imageUrl: String,
//   imagesArray: [String],
//   mrp: Number,
//   myncommission: Number,
//   productPriceWithTax: Number,
//   productcode: String,
//   productname: String,
//   projectTags: [String],
//   quantity: Number,
//   refno: String,
//   sgst: Number,
//   subTotal: Number,
//   subcategory: String,
//   taxAmountWithQuantity: Number,
//   unit: String,
//   unitTaxAmount: Number,
// });

// const commissionSchema = new mongoose.Schema({
//   type: String,
//   values: {
//     commission: Number,
//     mode: String,
//     platformFee: Number,
//   },
// });

// const shopCartSchema = new mongoose.Schema({
//   shop_unique_code_for_sell: String,
//   agreementAccepted: Boolean,
//   closingTime: String,
//   createdAt: Number,

//   mynCommission: commissionSchema,

//   openingTime: String,
//   orderStatus: String,

//   products: [productSchema],

//   shopCategory: String,
//   shopId: String,
//   shopImage: String,
//   shopName: String,
//   shopOrderId: String,
//   shop_unique_id: String,
//   totalAmountOfEachShop: Number,
// });

// const categoryCartSchema = new mongoose.Schema({
//   cartCategoryName: String,
//   createdAt: Number,
//   shopsCartList: [shopCartSchema],
//   totalAmountOfEachCategory: Number,
// });

// const addressSchema = new mongoose.Schema({
//   addressId: String,
//   addressType: String,
//   district: String,
//   formattedAddress: String,
//   houseName: String,
//   isDefault: Boolean,
//   pinCode: String,
//   state: String,
//   street: String,
// });

// const orderSchema = new mongoose.Schema(
//   {
//     addressInputModel: addressSchema,

//     categorizedCartModelList: [categoryCartSchema],

//     createdAt: Number,
//     deliveryCharge: Number,
//     deliveryChargeGst: Number,
//     deliveryChargeandGst: Number,

//     orderCreationId: String,
//     orderId: String,

//     paymentId: String,
//     paymentStatus: String,

//     platformFee: Number,
//     platformFeeGst: Number,
//     platformFeeandGst: Number,

//     razorpayOrderId: String,
//     signature: String,

//     tip: Number,
//     totalPayableAmount: Number,

//     userId: String,
//     shopName: String,
//     shopId: String,
//   },
//   { timestamps: true },
// );
// const orderModel = mongoose.model("Order", orderSchema);
// module.exports = orderModel;
