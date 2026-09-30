const express = require("express");
const {
  getCategoryValidator,
  craetCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validator/categoryValidator");
const {
  getCategories,
  createcatigory,
  getcategory,
  updatecategory,
  deletecategory,
} = require("../services/categoryService");
const subCategoryRoute = require("./subCategoryRout");

const router = express.Router();
router.use("/:categoryId/subcategory", subCategoryRoute);
router
  .route("/")
  .get(getCategories)
  .post(craetCategoryValidator, createcatigory);
router
  .route("/:id")
  .get(getCategoryValidator, getcategory)
  .put(updateCategoryValidator, updatecategory)
  .delete(deleteCategoryValidator, deletecategory);
module.exports = router;
