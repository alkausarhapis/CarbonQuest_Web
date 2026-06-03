import api from "./api";

const mockArticles = [
  {
    category: "Climate Change",
    title: "Why carbon literacy matters for everyday decisions",
    summary: "Understand the biggest drivers of household emissions and how to reduce them fast.",
    author: "Raya Sutanto",
    readTime: "5 min read",
  },
  {
    category: "Sustainable Living",
    title: "Build a low-carbon routine without sacrificing comfort",
    summary: "Practical shifts in transport, food, and energy that add up quickly.",
    author: "Nico Aulia",
    readTime: "7 min read",
  },
  {
    category: "Renewable Energy",
    title: "Clean energy myths that slow the transition",
    summary: "Separate fact from fiction and see what is already working in 2026.",
    author: "Laras Dwi",
    readTime: "6 min read",
  },
  {
    category: "Carbon Reduction",
    title: "Small actions that cut emissions every week",
    summary: "Micro habits that scale into measurable carbon savings.",
    author: "Farhan Rizki",
    readTime: "4 min read",
  },
];

export async function fetchArticles() {
  try {
    const response = await api.get("/articles");
    return response.data?.data || response.data || mockArticles;
  } catch (error) {
    return mockArticles;
  }
}
