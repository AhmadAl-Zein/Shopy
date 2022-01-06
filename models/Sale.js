const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      reuired: true,
    },
    items: [
      {
        product_id: {
          type: mongoose.Schema.ObjectId,
          ref: 'Product'
        },
        num: {
          type: Number,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sale", SaleSchema);
