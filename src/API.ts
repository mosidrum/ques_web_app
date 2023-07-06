const API = 'https://opentdb.com/api.php?amount=50&category=21';

export enum level {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard"
}

export const fetchQuestions = async (amount: number, difficulty: level, category:number) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;

  const data = await (await fetch (endpoint)).json();
  console.log(data);
}