const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const registerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is incorrect");
      }
    },
  },
  password: {
    type: String,
    required: true,
  },
});

// we have hash the password before saving the data to database
registerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 10);
  this.confirmPassword = undefined;
});

const Register = mongoose.model("Register", registerSchema);
module.exports = Register;
