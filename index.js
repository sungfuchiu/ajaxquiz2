const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());


const examRecordSchema = new mongoose.Schema({
    name: String,
    sid: String,
  });
  
  const ExamRecord = mongoose.model("ExamRecord", examRecordSchema);
  

app.get("/", (req, res) => {
  mongoose.connect(`${process.env.CONNECTION_STRING}/Exams23002`, {
    useNewUrlParser: true,
  });
  let myExamRecord = new ExamRecord({
    name: "Sung-Fu Chiu",
    sid: "300371200",
  });
  ExamRecord.insertMany([myExamRecord])
    .then(() => {
      console.log("Successfully insert an exam record.");

      res.send("Name and sid are sent to the database");
    })
    .catch((err) => {
      console.log(err);
    })
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
