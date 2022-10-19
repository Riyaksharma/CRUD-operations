require("dotenv").config();
const db = require("./models/db");
const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const bodyparser = require("body-parser");
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

const studentController = require("./controllers/studentsController");

db();

const app = express();

app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(bodyparser.json());

app.set("views", path.join(__dirname, "/views/"));
app.engine(
  "hbs",
  exphbs.engine({
    extname: "hbs",
    defaultLayout: "mainLayout",
    layoutDir: __dirname,
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("view engine", "hbs");

const PORT = process.env.PORT || 3000;

app.use("/student", studentController);

app.listen(PORT, () => {
  console.log(`connected to server ${PORT}`);
});
