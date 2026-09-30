const slugify = require("slugify");
const factory = require("./handlerFactor");

const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const Apifeatures = require("../utils/apiFeatures");

const Product = require("../models/productModel");

// get list categories

exports.getProducts = factory.getAll(Product);

// get one product

exports.getProduct = factory.getOneFactory(Product);

// create one product

exports.createProduct = factory.createOne(Product);

// update name product

exports.updateProduct = factory.updateOne(Product);

// Delete one product
exports.deleteProduct = factory.deleteOne(Product);
