const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Student = mongoose.model("Student");

router.get("/", (req, res) => {
  res.render("student/addOrEdit", {
    viewTitle: "Insert Student Details",
  });
});

router.post("/", (req, res) => {
  if (req.body._id == "") insertRecord(req, res);
  else {
    updateRecord(req, res);
  }
});

function insertRecord(req, res) {
  const student = new Student();
  student.fullName = req.body.fullName;
  student.Address = req.body.Address;
  student.Age = req.body.Age;
  student.PhoneNumber = req.body.PhoneNumber;
  student.save((err, doc) => {
    if (!err) res.redirect("student/list");
    else {
      console.log("error in record" + err);
    }
  });
}

function updateRecord(req, res) {
  Student.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect("student/list");
      } else {
        console.log("Error :" + err);
      }
    }
  );
}

router.get("/list", (req, res) => {
  Student.find((err, docs) => {
    if (!err) {
      res.render("student/list", {
        list: docs,
      });
    } else {
      console.log("Error in list" + err);
    }
  });
});

router.get("/:id", (req, res) => {
  Student.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render("student/addOrEdit", {
        viewTitle: "Update Student",
        student: doc,
      });
    }
  });
});

router.get("/delete/:id", (req, res) => {
  Student.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/student/list");
    } else {
      console.log("Error" + err);
    }
  });
});
module.exports = router;
