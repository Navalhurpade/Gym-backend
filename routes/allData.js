const Blog = require("./../models/Blog");
const Payment = require("../models/Payment");
const Plan = require("../models/Plan");
const User = require("../models/User");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const foundUsers = await User.find({});
    const foundPayments = await Payment.find({}).populate("userId planId");
    const foundPlans = await Plan.find({});
    const foundBlogs = await Blog.find({}).select("tagLine title content");

    res.send({
      users: foundUsers,
      payments: foundPayments,
      plans: foundPlans,
      blogs: foundBlogs,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
