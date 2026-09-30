const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, "subcategory name must be unique"],
      minlength: [2, "too small subcategory name"],
      maxlength: [32, "too small subcategory name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "subcategory must belong to parent category"],
    },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("subCategory", subCategorySchema);
