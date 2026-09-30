const slugify = require("slugify");

const asyncHandler = require("express-async-handler");
const factory = require("./handlerFactor");

const SubCategory = require("../models/subCategoryModel");
const Apifeatures = require("../utils/apiFeatures");

const ApiError = require("../utils/apiError");

exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body) {
    req.body = {};
  }

  if (!req.body.category) {
    req.body.category = req.params.categoryId;
  }

  next();
};
exports.createSubCatigory = factory.createOne(SubCategory);

// get list subcategories

exports.getSubCategories = factory.getAll(SubCategory);

// create one subcategory

exports.getSubCategory = factory.getOneFactory(SubCategory);

// update name subCategory

exports.updateSubCategory = factory.updateOne(SubCategory);

// Delete one subCategory
exports.deleteSubCategory = factory.deleteOne(SubCategory);
