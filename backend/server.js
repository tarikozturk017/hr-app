const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://tarikozturk017:DMTErcP0i2zNbmnV@cluster0.srdqdcu.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const formSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  id: Number,
  isEmployed: Boolean,
  email: String,
  selectedDepartment: String,
  accommodationRequested: Boolean,
  file: String,
});

const FormSubmission = mongoose.model("FormSubmission", formSchema);

app.post("/api/submit-form", upload.single("file"), async (req, res) => {
  //   console.log(`server: ${req.body}`);
  console.log(`server`);
  try {
    const formSubmissionData = req.body;
    if (req.file) {
      formSubmissionData.file = req.file.filename;
    }

    const formSubmission = new FormSubmission(formSubmissionData);
    await formSubmission.save();

    res.status(200).json({ message: "Data stored successfully" });
  } catch (error) {
    console.error("Error storing data:", error);
    res.status(500).json({ error: "An error occurred while storing data" });
  }
});

app.get("/api/get-submitted-forms", async (req, res) => {
  try {
    const submittedForms = await FormSubmission.find();
    console.log(`submittedForms : ${submittedForms}`);
    res.status(200).json(submittedForms);
  } catch (error) {
    console.error("Error fetching submitted forms:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching submitted forms" });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
