const router = require("express").Router();
const Blog = require("../models/Blog");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");

router.post("/new", upload.single("coverImg"), async (req, res) => {
  const img = req.file;
  const { tagLine, title, content } = req.body;

  const file = fs.readFileSync(`uploads/${img.filename}`);
  const newBlog = new Blog({
    tagLine,
    title,
    content,
    img: {
      data: file,
      contentType: img.mimetype,
    },
  });

  try {
    await newBlog.save();
    res.send({ info: "New Blog saved to database !" });
    return;
  } catch (error) {
    console.log(error);
    res.status(400);
    res.send({ error: "faled to save Blog in db" });
    return;
  }
});

router.get("/", async (req, res) => {
  try {
    const allBlogs = await Blog.find({});
    res.send(allBlogs);
  } catch (error) {
    console.log(error);
  }
});

router.post("/delete", async (req, res) => {
  const { id } = req.body;
  const responce = await Blog.findByIdAndDelete(id, {});

  if (responce) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send({ info: "Deleted !" });
    res.end();
    return;
  } else {
    res.send({ error: "Error Ocured !" });
    res.end();
    return;
  }
});

module.exports = router;
