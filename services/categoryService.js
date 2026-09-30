const slugify = require("slugify");

const asyncHandler = require("express-async-handler");

const categoryModel = require("../models/categorymodel");
const factory = require("./handlerFactor");

const ApiError = require("../utils/apiError");
const Apifeatures = require("../utils/apiFeatures");

// get list categories

exports.getCategories = factory.getAll(categoryModel);

// get one category

exports.getcategory = factory.getOneFactory(categoryModel);

// create new category
exports.createcatigory = factory.createOne(categoryModel);

// update name category

exports.updatecategory = factory.updateOne(categoryModel);

// Delete one category
exports.deletecategory = factory.deleteOne(categoryModel);
