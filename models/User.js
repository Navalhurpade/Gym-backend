const mongoose = require("mongoose");

const UserScheema = mongoose.Schema({
  name: String,
  number: Number,
  email: String,
  age: Number,
  isAdmin: { type: Boolean, default: false },
  password: { type: String },
});

const User = mongoose.model("User", UserScheema);

module.exports = User;
