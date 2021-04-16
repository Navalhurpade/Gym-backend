const Payment = require("../models/Payment");

const router = require("express").Router();

router.post("/new", async (req, res) => {
  try {
    const {
      userId,
      planId,
      amount,
      paymentDate,
      validUpto,
      paymentMode,
      note,
      transactionId,
    } = req.body;

    const paymentDetails = new Payment({
      userId,
      planId,
      amount,
      paymentDate,
      validUpto,
      paymentMode,
      transactionId,
      note,
    });

    await paymentDetails.save();

    res.send({ info: "Payment details saved sucessfully !" });
    res.end();
  } catch (error) {
    console.log(error);
  }
});

router.post("/delete", async (req, res) => {
  try {
    const { id } = req.body;

    await Payment.findByIdAndDelete(id);
    res.send({ info: "Deleted !" });
    res.end();
    return;
  } catch (error) {
    console.log(error);
    res.send({ error: "Error while Deleting !" });
    res.end();
    return;
  }
});

router.get("/", async (req, res) => {
  try {
    const allPayments = await Payment.find({}).populate("userId");
    res.send(allPayments);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
