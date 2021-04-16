require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const auth = require("./routes/auth");
const bodyParser = require("body-parser");
const User = require("./models/User");
const users = require("./routes/users");
const Payments = require("./routes/payments");
const plan = require("./routes/plans");
const allDate = require("./routes/allData");
const blogs = require("./routes/blogs");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// "mongodb://127.0.0.1:27017"
mongoose.connect(
  process.env.DATABASE_URL,
  { useUnifiedTopology: true, useNewUrlParser: true, dbName: "Gym" },
  (err) => {
    if (!err) console.log("Connected mongodb to cluster !");
    else throw Error("Cant connet to mongo Db");
  }
);

const server = app.listen(8080, () =>
  console.log("Server is started on port 8080")
);

app.use("/auth", auth);
app.use("/users", users);
app.use("/payments", Payments);
app.use("/plans", plan);
app.use("/allData", allDate);
app.use("/blogs", blogs);

module.exports = server;
