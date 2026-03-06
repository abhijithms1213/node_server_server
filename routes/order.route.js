const express = require("express");
const router = express.Router();
// const Order = require("../models/product.test.model.js");
const Order = require("../models/parent.products.model.js");
const ShopOrder = require("../models/shop.products.model.js");

router.post(
  "/",

  async (req, res) => {
    try {
      const body = req.body;
      /* -------------------------
       1️⃣ Create Parent Order
    --------------------------*/

      const parentOrder = await Order.create({
        orderCreationId: body.orderCreationId,
        userId: body.userId,

        addressInputModel: body.addressInputModel,

        categorizedCartModelList: body.categorizedCartModelList,

        deliveryCharge: body.deliveryCharge,
        deliveryChargeGst: body.deliveryChargeGst,
        deliveryChargeandGst: body.deliveryChargeandGst,

        platformFee: body.platformFee,
        platformFeeGst: body.platformFeeGst,
        platformFeeandGst: body.platformFeeandGst,

        tip: body.tip,

        paymentId: body.paymentId,
        paymentStatus: body.paymentStatus,

        totalPayableAmount: body.totalPayableAmount,

        shopCount: body.categorizedCartModelList.reduce(
          (count, cat) => count + cat.shopsCartList.length,
          0,
        ),

        createdAt: body.createdAt,
      });

      /* -------------------------
       2️⃣ Create Shop Orders
    --------------------------*/
      const ordersToInsert = [];

      for (const category of body.categorizedCartModelList) {
        for (const shop of category.shopsCartList) {
          const shopOrder = {
            parentOrderId: parentOrder._id,
            orderCreationId: body.orderCreationId,

            shopId: shop.shopId,
            shopName: shop.shopName,
            shopImage: shop.shopImage,

            userId: body.userId,

            products: shop.products.map((p) => ({
              productId: p.productcode,
              productname: p.productname,
              quantity: p.quantity,

              price: p.appprice,
              mrp: p.mrp,
              discount: p.discount,

              cgst: p.cgst,
              sgst: p.sgst,

              imageUrl: p.imageUrl,

              subTotal: p.subTotal,
            })),

            mynCommission: shop.mynCommission,

            totalAmount: shop.totalAmountOfEachShop,

            status: shop.orderStatus || "Submitted",

            createdAt: body.createdAt,
          };
          ordersToInsert.push(shopOrder);
        }
      }

      await ShopOrder.insertMany(ordersToInsert);

      res.status(201).json({
        message: "Order created successfully",
        parentOrderId: parentOrder._id,
        shopOrdersCreated: ordersToInsert.length,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
);
router.get("/", async (req, res) => {
  try {
    const order = await OrderSchema.find({});
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
