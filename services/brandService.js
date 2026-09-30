const slugify = require("slugify");
const factory = require("./handlerFactor");
const asyncHandler = require("express-async-handler");

const Brand = require("../models/brandModel");
const ApiError = require("../utils/apiError");
const Apifeatures = require("../utils/apiFeatures");
// get list Brand

exports.getBrands = factory.getAll(Brand);

// get specific brand

exports.getBrand = factory.getOneFactory(Brand);

// create new brand
exports.createBrand = factory.createOne(Brand);

// update name brand

exports.updateBrand = factory.updateOne(Brand);

// Delete one brand
exports.deleteBrand = factory.deleteOne(Brand);
