const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());

mongoose.connect(`${process.env.CONNECTION_STRING}Exam`, {
  useNewUrlParser: true,
});
const quizSchema = new mongoose.Schema({
  name: String,
  sid: String,
});

const Quiz = mongoose.model("Quiz", quizSchema);
const myQuiz = new Quiz({
  name: "Sung-Fu Chiu",
  sid: "300371200",
});
Quiz.insertMany([myQuiz])
  .then(() => {
    console.log("Successfully insert a quiz.");
  })
  .catch((err) => {
    console.log(err);
  });

Quiz.find()
  .then((quizzes) => {
    quizzes.forEach((quiz) => {
      console.log(`name: ${quiz.name}`);
      console.log(`sid: ${quiz.sid}`);
    });
  })
  .catch((err) => {
    console.log(err);
    mongoose.connection.close();
  }).finally(() => {
    mongoose.connection.close();
  })

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
