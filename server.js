const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const morgan = require("morgan");
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddleware");
const dpconnection = require("./config/database");
const categoryRoute = require("./routes/categoryRoute");
const brandRoute = require("./routes/brandRoute");
const productRoute = require("./routes/productRoute");
const subCategoryRoute = require("./routes/subCategoryRout");
const qs = require("qs");

app.set("query parser", (str) => qs.parse(str));
// connections
dpconnection();
// middlewares
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

//mount Routes
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subcategories", subCategoryRoute);
app.use("/api/v1/brands", brandRoute);
app.use("/api/v1/products", productRoute);

app.get("/", (req, res) => {
  res.send("Our Api v2");
});

app.use((req, res, next) => {
  next(new ApiError(`cant found thit route${req.originalUrl}`, 400));
});

app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App Running on Port ${PORT}`);
});

// handle rejection

process.on("unhandledRejection", (err) => {
  console.error(`UnhandleRejection Error : ${err.name}|${err.message}`);
  server.close(() => {
    console.log("shuting down...");
    process.exit(1);
  });
});
