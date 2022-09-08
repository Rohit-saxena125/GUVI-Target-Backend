const mongooose = require("mongoose");

const userSchema = new mongooose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  dob: {
    type: Date,
  },
  gender: {
    type: String
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  pincode: {
    type: Number,
  },
  country: {
    type: String,
  },
  phone: {
    type: Number,
  },
});

const User = mongooose.model("USER", userSchema);

module.exports = User;
