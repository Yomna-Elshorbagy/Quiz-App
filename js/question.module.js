import { container, currentQuiz, questions } from "./index.js";

export default class Question {
  constructor(index) {
    // question , correct_answer, incorrect_answers, answered;
    this.question = questions[index].question;
    this.correct = questions[index].correct_answer;
    this.incorrect = questions[index].incorrect_answers;
    this.category = questions[index].category;
    this.index = index;
    this.answers = this.allAnswers();
    this.answered = false;
  }

  //make correct answers come in random place
  allAnswers() {
    return this.incorrect.concat(this.correct).sort();
  }

  displayQuestion() {
    let answerContainer = `
        <div
      class="question shadow-lg col-lg-6 offset-lg-3  p-4 rounded-3 d-flex flex-column justify-content-center align-items-center gap-3 animate__animated animate__bounceIn"
    >
      <div class="w-100 d-flex justify-content-between">
        <span class="btn btn-category"> ${this.category}</span>
        <span class="fs-6 btn btn-questions">${this.index + 1} of ${
      questions.length
    } Questions</span>
      </div>
      <h2 class="text-capitalize h4 text-center"> ${this.question}</h2>  
      <ul class="choices w-100 list-unstyled m-0 d-flex flex-wrap text-center">
      ${this.answers.map((choice) => `<li>${choice}</li>`).join("")}
      </ul>
      <h2 class="text-capitalize text-center score-color h3 fw-bold">
        <i class="bi bi-emoji-laughing"></i> 
        Score: ${currentQuiz.score}
      </h2>        
    </div>
    `;

    container.innerHTML = answerContainer;
    let allChoices = document.querySelectorAll(".choices li");
    allChoices.forEach((choice) => {
      choice.addEventListener("click", (eventInfo) => {
        this.checkAnswer(eventInfo);
      });
    });
  }

  checkAnswer(eventInfo) {
    const answerQues = eventInfo.target.innerHTML;

    if (!this.answered) {
      this.answered = true;
      if (this.correct.toLowerCase() === answerQues.toLowerCase()) {
        eventInfo.target.classList.add(
          "correct",
          "animate__animated",
          "animate__flipInY"
        );
        currentQuiz.score++;
      } else {
        eventInfo.target.classList.add(
          "wrong",
          "animate__animated",
          "animate__shakeX"
        );
      }
    }
    this.animationQuestion(eventInfo.target);
  }

  getNextQuestion() {
    const nextIndex = this.index + 1;
    if (nextIndex < questions.length) {
      const nextQuestion = new Question(nextIndex);
      nextQuestion.displayQuestion();
      return;
    }
    container.innerHTML = currentQuiz.endQuiz();
    const tryAgainBtn = document.querySelector(".again");
    tryAgainBtn.addEventListener("click", function () {
      window.location.reload();
    });
  }
animationQuestion(element) {
  const questionBox = element.closest(".question");
  questionBox.classList.remove("animate__bounceIn");
  questionBox.classList.add("animate__bounceOutLeft");

  setTimeout(() => {
    this.getNextQuestion();
  }, 1000);
}

}
