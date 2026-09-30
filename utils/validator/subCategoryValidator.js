const { check, body } = require("express-validator");
const slugify = require("slugify");

const valedatorMiddleWare = require("../../middlewares/validatorMiddleWare");

exports.getSubCategoryValidator = [
  check("id").isMongoId().withMessage("ivalid subCategory id format"),
  valedatorMiddleWare,
];

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("subCategory required")
    .isLength({ min: 2 })
    .withMessage("subCategory name too small")
    .isLength({ max: 32 })
    .withMessage("subCategory name too long")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("category")
    .notEmpty()
    .withMessage("subcategory must belong to category")
    .isMongoId()
    .withMessage("ivalid Category id format"),
  valedatorMiddleWare,
];

exports.updateSubCategoryValidator = [
  check("id").isMongoId().withMessage("ivalid subCategory id format"),
  body("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  valedatorMiddleWare,
];

exports.deleteSubCategoryValidator = [
  check("id").isMongoId().withMessage("ivalid subCategory id format"),
  valedatorMiddleWare,
];
