const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    sales_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Sale",
    },
    description: {
      type: String,
      maxlength: 50,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', ReviewSchema);