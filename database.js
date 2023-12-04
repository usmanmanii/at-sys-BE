const mongoose = require("mongoose");
const dotenv = require("dotenv");

mongoose.set("strictQuery", false);
dotenv.config();

exports.connectDB = async () => {
  try {
    console.log(process.env.DB_URI)
    mongoose
      .connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        console.log("Connection succesfull to database");
      })
      .catch((error) => {
        console.log("ERROR OCCURED WHILE CONNECTING TO DATABASE" + error);
        process.exit(1);
      });
  } catch (error) {
    console.log("error ---- ",error);
    process.exit(1);
  }
};
