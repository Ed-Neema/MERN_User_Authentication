const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});
// can run some middleware presaving and post saving into mongoDB
UserSchema.pre("save", async function(next){

    // if the password we are sending in is not modified
    if(!this.isModified("password")){
        return next(); // skip hashing the passowrd when it is not modified
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);//hashing the password
    next();
})

const User = mongoose.model("User", UserSchema);
module.exports = User;