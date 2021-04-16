const router = require("express").Router();

const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const satltingRound = 10;

router.post("/register", async (req, res) => {
  const { name, email, number, age, isAdmin, password } = req.body;
  const trimedNumber = number.replace(/ /g, "");

  const foundUser = await User.findOne({ email: email }).exec();

  if (foundUser) {
    console.log("fire !");
    res.status(400);
    res.send({ error: "Email already used !" });
    res.end();
    return;
  }

  if (password) {
    const hashedPassword = await bcrypt.hash(password, satltingRound);

    const adminUser = new User({
      name,
      email,
      number,
      age,
      isAdmin,
      password: hashedPassword,
    });

    adminUser.save();
    res.status(200);
    res.send({ info: "Registered as admin !" });
    res.end();
    return;
  }

  const newUser = new User({
    name,
    email,
    number: trimedNumber,
    age,
    isAdmin,
  });

  newUser.save((err, result) => {
    if (err) console.log("Error while saving new User !", err);
    res.status(200);
    res.send({ info: "Registered new user !" });
    res.end();
    return;
  });
});

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  const foundUser = await User.findOne({ email: email }).exec();

  if (!foundUser) {
    res.status(404);
    res.send({ error: "User Not Found !" });
    res.end();
    return;
  } else if (!foundUser.isAdmin) {
    res.status(400);
    res.send({ error: "Invalide Credentials !" });
    res.end();
    return;
  }

  const match = await bcrypt.compare(password, foundUser.password);

  if (match) {
    const { name, email, number, age, isAdmin } = foundUser;
    const token = jwt.sign(
      {
        name,
        email,
        number,
        age,
        isAdmin,
      },
      process.env.APP_SECRET
    );

    res.send(token);
    res.end();
    return;
  } else {
    res.status(400);
    res.send({ error: "Invalide Credentials !" });
    res.end();
    return;
  }
});

module.exports = router;
