const express = require("express");
const Product = require("./product.model");

const router = express.Router();

// Get All products

router.get("/allproducts", async (req, res) => {
  const product = await Product.find();
  res.status(200).json({
    success: true,
    product,
  });
});

router.post("/product/filter", async (req, res) => {
  const filter = req.body;
  const product = await Product.aggregate([
    {
      $match: {
        $and : [
            filter.ram ? {
                ram : {
                    $in : filter.ram
                }
            } : null,
            filter.storage ? {
                storage : {
                    $in : filter.storage
                }
            } : null,
            filter.brand ? {
                brand : {
                    $in : filter.brand
                }
            } : null
        ].filter(Boolean)
      },
    },
  ]);

  res.status(200).json({
    success: true,
    totalItems : product.length,
    totalPages : 2,
    product,
  });
});

module.exports = router;
