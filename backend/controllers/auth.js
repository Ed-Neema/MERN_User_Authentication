const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // first passes through a middleware to hash the password
    const user = await User.create({
      username,
      email,
      password,
    });
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password is provided
  if (!email || !password) {    
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  try {
    // Check that user exists by email
    /**
     * the password field should be included in the query results. By default, in many database libraries, some fields (like passwords) might be excluded from query results for security reasons. However, by using .select("+password"), the code explicitly requests the password field to be included.
     */
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }
    const isMatch = await user.matchPasswords(password);
    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }
    // response with token
    return res.status(200).json({
      success: true,
      token: "hsghwpghg",
    });
  } catch (error) {
     next(error);
  }

  //   res.send("Login Route");
};
exports.forgotpassword = (req, res, next) => {
  res.send("Forgot Password Route");
};
exports.resetpassword = (req, res, next) => {
  res.send("Reset Password Route");
};
