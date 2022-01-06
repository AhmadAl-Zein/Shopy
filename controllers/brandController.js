const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Brand = require("../models/Brand");

exports.addBrand = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const { name, products } = req.body;
  const brand = await Brand.create({
    'name': name,
    'products': products
  });

  res.status(200).json({
      success: true,
      data: brand
  });
});
