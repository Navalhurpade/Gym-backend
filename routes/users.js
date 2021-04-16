const User = require("../models/User");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const foundUsers = await User.find({});
    res.send(foundUsers);
    res.end();
    return;
  } catch (error) {
    console.log("error while findign users", error);
  }
});

router.put("/delete", async (req, res) => {
  try {
    const { _id } = req.body;
    console.log(_id);
    const responce = await User.deleteOne({ _id: _id });
    if (responce.ok) {
      if (responce.deletedCount === 1)
        res.send({ info: "User deleted sucess!" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.patch("/update", async (req, res) => {
  try {
    const { _id, updatedUser } = req.body;
    delete updatedUser._id;

    const responce = await User.updateOne({ _id: _id }, updatedUser);

    if (!responce.ok) {
      console.log(responce, "Error While connecting mongo DB");
      res.status(300);
      res.send({ error: "Error While Connecting Database !" });
      return;
    }

    if (responce.nModified === 1) {
      console.log(responce.n);
      res.status(200);
      res.send({ info: "Updated one User !" });
      res.end();
      return;
    } else {
      res.status(304);
      res.send({ error: "ohh no! Error Ocured " });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
