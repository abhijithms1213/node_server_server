const express = require("express");
const router = express.Router();

const Shop = require("../models/shop.model.js");
const UniqueValue = require("../models/unique.value.model.js");

router.get("/", async (req, res) => {
  try {
    const shop = await Shop.find({});
    res.json(shop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const body = req.body;

    // get first 3 letters
    let prefix = body.businessName.substring(0, 3).toUpperCase();

    let uniqueDoc = await UniqueValue.findOne({ prefix });

    let shop_unique_id;

    if (!uniqueDoc) {
      // first shop using this prefix
      await UniqueValue.create({
        prefix: prefix,
        count: 1,
      });

      shop_unique_id = prefix;
    } else {
      uniqueDoc.count += 1;
      await uniqueDoc.save();

      const num = String(uniqueDoc.count).padStart(3, "0");

      shop_unique_id = `${prefix}${num}`;
    }

    const shop = await Shop.create({
      username: body.username,
      password: body.password,

      email: body.email,
      createdBy: body.createdBy,

      businessName: body.businessName,
      businessCategory: body.businessCategory,

      phone: body.phone,
      gstNumber: body.gstNumber,

      address: body.address,
      pincode: body.pincode,
      state: body.state,
      city: body.city,

      deliveryCharge: body.deliveryCharge,
      description: body.description,

      logoUrl: body.logoUrl,
      bannerUrl: body.bannerUrl,

      uid: body.uid,

      // auto fields
      shop_unique_id: shop_unique_id,
      order_count: 0,
      isWaiting: false,
    });

    res.status(201).json({
      message: "Shop created",
      shop,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
