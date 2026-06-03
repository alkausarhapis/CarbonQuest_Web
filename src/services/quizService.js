import api from "./api";

const mockQuizzes = [
  { category: "Climate Awareness", questions: 12, time: "8 min", xp: 80 },
  { category: "Carbon Footprint", questions: 10, time: "6 min", xp: 70 },
  { category: "Recycling", questions: 8, time: "5 min", xp: 60 },
  { category: "Renewable Energy", questions: 14, time: "9 min", xp: 90 },
];

export async function fetchQuizzes() {
  try {
    const response = await api.get("/quizzes");
    return response.data?.data || response.data || mockQuizzes;
  } catch (error) {
    return mockQuizzes;
  }
}
