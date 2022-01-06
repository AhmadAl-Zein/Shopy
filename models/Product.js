const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    colors: [String],
    price: {
      type: Number,
      required: true,
    },
    /* photo: {
      type: String,
      default: "no-photo.jpg",
    }, */
    sizes: [String],
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
      required: true,
    },
    numofitems: {
      type: Number,
      min: 0,
      required: true,
    },
    category: {
      type: String,
      enum: ["Shoes", "Jacket", "TShirt"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);