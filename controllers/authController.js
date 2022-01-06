const path = require("path");
const bcrypt = require('bcrypt');
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");

exports.SignUp = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const { name, email, password, gender, birthdate, phone, address, role } = req.body;

  const salt = await bcrypt.genSalt(10);
  const bpassword = await bcrypt.hash(password, salt);

  /* if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  } */

  /* const file = req.files.file;

  //Make sure the file is an image
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  //Check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  } */

  const user = await User.create({
    'name': name,
    'email': email,
    'password': bpassword,
    'gender': gender,
    'birthdate': birthdate,
    'phone': phone,
    'address': address,
    'role': role
  });

  /* //Create custom filename
  file.name = `photo_${user._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await User.findByIdAndUpdate(user._id, { photo: file.name });
  }); */

  sendTokenResponse(user, 200, res);
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  //Check for user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  //Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  sendTokenResponse(user, 200, res);
});

const sendTokenResponse = (user, statusCode, res) => {
  //Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).json({
    success: true,
    token,
  });
};
