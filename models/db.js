require("dotenv").config();
const mongoose = require("mongoose");

const db = async () => {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected Succesfully");
};

require("./student.model");

module.exports = db;
