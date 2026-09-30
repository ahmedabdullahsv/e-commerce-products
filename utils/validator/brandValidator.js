const { check, body } = require("express-validator");
const slugify = require("slugify");

const valedatorMiddleWare = require("../../middlewares/validatorMiddleWare");
exports.getBrandValidator = [
  check("id").isMongoId().withMessage("ivalid brand id format"),
  valedatorMiddleWare,
];

exports.createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("brand required")
    .isLength({ min: 3 })
    .withMessage("brand name too small")
    .isLength({ max: 32 })
    .withMessage("brand name too long")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  ,
  valedatorMiddleWare,
];

exports.updateBrandValidator = [
  check("id").isMongoId().withMessage("ivalid brand id format"),
  body("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  valedatorMiddleWare,
];

exports.deleteBrandValidator = [
  check("id").isMongoId().withMessage("ivalid brand id format"),
  valedatorMiddleWare,
];
