const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  tagLine: String,
  title: String,
  content: String,
  date: {
    type: Date,
    default: Date(),
  },
  img: {
    data: Buffer,
    contentType: String,
  },
});

const Blog = new mongoose.model("Blog", blogSchema);

module.exports = Blog;
