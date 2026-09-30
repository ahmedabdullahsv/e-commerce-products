const mongoose = require("mongoose");

// 1- create Schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "category required"],
      unique: [true, "category must be unique"],
      minlength: [3, "category name too small"],
      maxlength: [32, "category name too long"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true },
);
// 2-  Create Model
const categoryModel = mongoose.model("Category", categorySchema);
module.exports = categoryModel;
