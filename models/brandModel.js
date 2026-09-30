const mongoose = require("mongoose");

// 1- create Schema
const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "brand required"],
      unique: [true, "brand must be unique"],
      minlength: [3, "brand name too small"],
      maxlength: [32, "brand name too long"],
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
module.exports = mongoose.model("brand", brandSchema);
