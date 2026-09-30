const { check, body } = require("express-validator");
const slugify = require("slugify");

const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Category = require("../../models/categorymodel");
const SubCategory = require("../../models/subCategoryModel");
exports.createProductValidator = [
  check("title")
    .isLength({ min: 3 })
    .withMessage("must be at least 3 chars")
    .notEmpty()
    .withMessage("Product title is required")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  ,
  check("description")
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ max: 2000 })
    .withMessage("Too long description"),

  check("quantity")
    .notEmpty()
    .withMessage("Product quantity is required")
    .isNumeric()
    .withMessage("Product quantity must be a number"),

  check("sold")
    .optional()
    .isNumeric()
    .withMessage("Product sold must be a number"),

  check("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isNumeric()
    .withMessage("Product price must be a number"),

  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("Product priceAfterDiscount must be a number")
    .custom((value, { req }) => {
      if (value >= req.body.price) {
        throw new Error("priceAfterDiscount must be lower than price");
      }

      return true;
    }),

  check("availableColors")
    .optional()
    .isArray()
    .withMessage("availableColors should be an array of strings"),

  check("imageCover").notEmpty().withMessage("Product imageCover is required"),

  check("images")
    .optional()
    .isArray()
    .withMessage("images should be an array of strings"),

  check("category")
    .notEmpty()
    .withMessage("Product must belong to a category")
    .isMongoId()
    .withMessage("Invalid ID format")
    .custom((categoryId) =>
      Category.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(
            `not category found for this id :${categoryId}`,
          );
        }
      }),
    ),
  check("subCategories")
    .optional()
    .isArray()
    .withMessage("subCategories must be an array")

    // نتأكد إن كل الـ IDs موجودة
    .custom(async (subCategoryIds) => {
      const subCategories = await SubCategory.find({
        _id: { $in: subCategoryIds },
      });

      if (subCategories.length !== subCategoryIds.length) {
        throw new Error("Some subcategories are invalid");
      }

      return true;
    })

    // نتأكد إن الـ subCategories تابعين للـ category
    .custom(async (subCategoryIds, { req }) => {
      const subCategories = await SubCategory.find({
        _id: { $in: subCategoryIds },
        category: req.body.category,
      });

      if (subCategories.length !== subCategoryIds.length) {
        throw new Error("subcategories not belong to category");
      }

      return true;
    }),

  check("brand").optional().isMongoId().withMessage("Invalid ID format"),

  check("ratingsAverage")
    .optional()
    .isNumeric()
    .withMessage("ratingsAverage must be a number")
    .isFloat({ min: 1, max: 5 })
    .withMessage("Rating must be between 1.0 and 5.0"),

  check("ratingsQuantity")
    .optional()
    .isNumeric()
    .withMessage("ratingsQuantity must be a number"),

  validatorMiddleware,
];

exports.getProductValidator = [
  check("id").isMongoId().withMessage("Invalid ID format"),

  validatorMiddleware,
];

exports.updateProductValidator = [
  check("id").isMongoId().withMessage("Invalid ID format"),
  body("title")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  validatorMiddleware,
];

exports.deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid ID format"),

  validatorMiddleware,
];
