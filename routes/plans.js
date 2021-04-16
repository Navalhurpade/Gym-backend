const Plan = require("../models/Plan");

const router = require("express").Router();

router.post("/new", async (req, res) => {
  try {
    const { title, price, validity, description } = req.body;
    console.log(req.body);
    const newPlan = new Plan({
      title,
      price,
      validity,
      description,
    });

    await newPlan.save();
    res.status(200);
    res.send({ info: "Plan Saved Sucsessfully !" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/delete", async (req, res) => {
  const { id } = req.body;

  try {
    await Plan.findByIdAndDelete(id);
    res.send({ info: "Deleted !" });
    res.end();
    return;
  } catch (error) {
    console.log(error);
    res.send({ error: "Error Occured !" });
    res.end();
    return;
  }
});

router.get("/", async (req, res) => {
  try {
    const plans = await Plan.find({});

    if (plan) {
      res.status(200);
      res.send(plans);
      return;
    } else {
      res.status(404);
      res.send({ error: " No Plans available !" });
      return;
    }
  } catch (error) {}
});

module.exports = router;
