const mongoose = require("mongoose");
const dpconnection = () => {
  mongoose.connect(process.env.DB_URI).then((conn) => {
    console.log(`Database Connected: ${conn.connection.host}`);
  });
  // .catch((err) => {
  //   console.error(`Database Errer: ${err}`);
  //   process.exit(1);
  // });
};

module.exports = dpconnection;
