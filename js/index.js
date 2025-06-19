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
  const alertMsg = document.getElementById("input-alert");

  alertMsg.classList.add("d-none");
  alertMsg.innerText = "";

  // Validate inputs
  if (!category || !difficulty || !amount || !type) {
    alertMsg.innerText = "❗ Please fill in all quiz options before starting.";
    alertMsg.classList.remove("d-none");
    return;
  }

  if (amount <= 0 || isNaN(amount)) {
    alertMsg.innerText = "❗ Please enter a valid number of questions.";
    alertMsg.classList.remove("d-none");
    return;
  }

  currentQuiz = new Quiz(amount, category, difficulty, type);
  questions = await currentQuiz.getQuestions();

  questionOptions.classList.replace("d-flex", "d-none");
  console.log(questions);

  let firstQuestion = new Question(0);
  firstQuestion.displayQuestion();
});
