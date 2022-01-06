const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Product = require("../models/Product");

exports.addProduct = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const { name, colors, price, sizes, numofitems, category } = req.body;
  const product = await Product.create({
    'name': name,
    'colors': colors,
    'price': price,
    'sizes': sizes,
    'brand': req.params.brandid,
    'numofitems': numofitems,
    'category': category
  });

  res.status(200).json({
      success: true,
      data: product
  });
});

exports.getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find().populate({
    path: "brand",
    select: "name"
  });

  console.log(products);

  res.status(200).json({
      success: true,
      data: products
  });
});