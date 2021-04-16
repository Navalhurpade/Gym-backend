const mongoose = require("mongoose");

const planSchema = mongoose.Schema({
  title: String,
  price: Number,
  validity: String,
  description: String,
});

const Plan = new mongoose.model("Plan", planSchema);

module.exports = Plan;
