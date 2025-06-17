// https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=multiple

import Question from "./question.module.js";
import Quiz from "./quiz.module.js";

// ========> Html Elements <================
const categoryMenu = document.getElementById("categoryMenu");
const difficultyOptions = document.getElementById("difficultyOptions");
const questionsNumber = document.getElementById("questionsNumber");
const typeOptions = document.getElementById("TypeOptions");
const startQuizBtn = document.getElementById("startQuiz");

let questionOptions = document.getElementById("quizOptions");
export let container = document.getElementById("questions-container");

// ========> Html Variables <================
export let questions = [];
export let currentQuiz = {};

// ========> Events <================
startQuizBtn.addEventListener("click", async function () {
  let category = categoryMenu.value;
  let difficulty = difficultyOptions.value;
  let amount = questionsNumber.value;
  let type = typeOptions.value;

  currentQuiz = new Quiz(amount, category, difficulty, type);
  questions = await currentQuiz.getQuestions();

  questionOptions.classList.replace("d-flex", "d-none");
  console.log(questions);

  let firstQuestion = new Question(0);
  firstQuestion.displayQuestion();
});
