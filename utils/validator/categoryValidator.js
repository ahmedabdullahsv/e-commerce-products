const { check, body } = require("express-validator");
const slugify = require("slugify");

const valedatorMiddleWare = require("../../middlewares/validatorMiddleWare");

exports.getCategoryValidator = [
  check("id").isMongoId().withMessage("ivalid category id format"),
  valedatorMiddleWare,
];

exports.craetCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("category required")
    .isLength({ min: 3 })
    .withMessage("category name too small")
    .isLength({ max: 32 })
    .withMessage("category name too long")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  valedatorMiddleWare,
];

exports.updateCategoryValidator = [
  check("id").isMongoId().withMessage("ivalid category id format"),
  body("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  valedatorMiddleWare,
];

exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("ivalid category id format"),
  valedatorMiddleWare,
];
