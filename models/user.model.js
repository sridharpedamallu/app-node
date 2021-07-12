const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    emailConfirmed: {
      type: Boolean,
      default: false,
      required: true,
    },
    emailOtp: {
      type: Number
    },
  },
  { timestamps: true }
);

const user = mongoose.model("User", userSchema);

module.exports = user;

