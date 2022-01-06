const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default: "no-photo.jpg",
    },
    products: [{
      type: mongoose.Schema.ObjectId,
      ref: 'Product'
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Brand", BrandSchema);
