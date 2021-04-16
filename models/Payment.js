const mongoose = require("mongoose");

const paymetsSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: "Plan" },
  amount: Number,
  paymentDate: Date,
  validUpto: Date,
  paymentMode: String,
  transactionId: String,
  note: String,
});

const Payment = new mongoose.model("Payment", paymetsSchema);

module.exports = Payment;
