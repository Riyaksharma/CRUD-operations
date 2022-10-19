const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  Age: {
    type: Number,
    required: true,
  },
  PhoneNumber: {
    type: Number,
    required: true,
  },
});

mongoose.model("Student", studentSchema);
