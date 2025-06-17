export default class Quiz {
  constructor(amount, category, difficulty, type) {
    this.amount = amount;
    this.category = category;
    this.difficulty = difficulty;
    this.type = type;
    this.score = 0;
  }
  async getQuestions() {
    let api =
      await fetch(`https://opentdb.com/api.php?amount=${this.amount}&category=${this.category}&difficulty=${this.difficulty}&type=${this.type}
`);
    let response = await api.json();
    return response.results;
  }
}
