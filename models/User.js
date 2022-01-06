const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default: "no-photo.jpg",
    },
    email: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    birthdate: {
      type: Date,
      required: true,
    },
    phone: {
      type: String,
      maxlength: 15,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      maxlength: 50,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    liked_brands: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Brand",
      },
    ],
  },
  { timestamps: true }
);

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
