const express = require("express");
const router = express.Router();
const Order = require("../models/product.test.model.js");

router.post(
  "/",

  async (req, res) => {
    try {
      const body = req.body;

      const ordersToInsert = [];
   
      ordersToInsert.push(parentOrder);

      for (const category of body.categorizedCartModelList) {
        for (const shop of category.shopsCartList) {
          const shopOrder = {
            addressInputModel: body.addressInputModel,

            categorizedCartModelList: [
              {
                cartCategoryName: category.cartCategoryName,
                createdAt: category.createdAt,
                shopsCartList: [shop],
                totalAmountOfEachCategory: shop.totalAmountOfEachShop,
              },
            ],

            createdAt: body.createdAt,
            deliveryCharge: body.deliveryCharge,
            deliveryChargeGst: body.deliveryChargeGst,
            deliveryChargeandGst: body.deliveryChargeandGst,

            orderCreationId: body.orderCreationId,
            orderId: body.orderId,

            paymentId: body.paymentId,
            paymentStatus: body.paymentStatus,

            platformFee: body.platformFee,
            platformFeeGst: body.platformFeeGst,
            platformFeeandGst: body.platformFeeandGst,

            razorpayOrderId: body.razorpayOrderId,
            signature: body.signature,

            tip: body.tip,
            totalPayableAmount: shop.totalAmountOfEachShop,

            userId: body.userId,
            shopName: shop.shopName,
            shopId: shop.shopId,
          };

          ordersToInsert.push(shopOrder);
        }
      }

      await Order.insertMany(ordersToInsert);

      res.status(201).json({
        message: "Orders created successfully",
        count: ordersToInsert.length,
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
