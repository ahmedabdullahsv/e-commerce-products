const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const Apifeatures = require("../utils/apiFeatures");
const slugify = require("slugify");

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);
    if (!document) {
      return next(new ApiError(`no document for this id${id}`, 404));
    }
    res.status(200).send();
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;

    const document = await Model.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      },
    );
    if (!document) {
      return next(new ApiError(`no document for this id${id}`, 404));
    }
    res.status(200).json({ data: document });
  });

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const newDocument = await Model.create(req.body);
    res.status(201).json({ data: newDocument });
  });

exports.getOneFactory = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findById(id);
    if (!document) {
      return next(new ApiError(`no document for this id${id}`, 404));
    }
    res.status(200).json({ data: document });
  });

exports.getAll = (Model) =>
  asyncHandler(async (req, res) => {
    let filter = {};
    if (req.filterObg) {
      filter = req.filterObg;
    }
    const documentsCount = await Model.countDocuments();
    const apiFeatures = new Apifeatures(Model.find(), req.query)
      .paginate(documentsCount)
      .filter()
      .limitfield()
      .search()
      .sort();
    const { mongooseQuery, paginationResult } = apiFeatures;
    const document = await mongooseQuery;

    res
      .status(200)
      .json({ result: document.length, paginationResult, data: document });
  });
