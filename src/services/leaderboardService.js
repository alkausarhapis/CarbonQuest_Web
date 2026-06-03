import api from "./api";

const mockLeaderboard = {
  Monthly: [
    { rank: 1, name: "Alya Quinn", level: "Eco Explorer", score: 895, xp: 3420 },
    { rank: 2, name: "Raka Pratama", level: "Green Builder", score: 872, xp: 3270 },
    { rank: 3, name: "Maya Putri", level: "Impact Maker", score: 858, xp: 3120 },
    { rank: 4, name: "Fajar Utama", level: "Leaf Runner", score: 832, xp: 2980 },
    { rank: 5, name: "Sinta Wardana", level: "Eco Starter", score: 812, xp: 2840 },
  ],
  "All Time": [
    { rank: 1, name: "Kevin Jaya", level: "Planet Guardian", score: 980, xp: 5120 },
    { rank: 2, name: "Alya Quinn", level: "Eco Explorer", score: 955, xp: 4980 },
    { rank: 3, name: "Dimas Surya", level: "Impact Maker", score: 934, xp: 4760 },
    { rank: 4, name: "Maya Putri", level: "Green Builder", score: 910, xp: 4620 },
    { rank: 5, name: "Raka Pratama", level: "Eco Starter", score: 902, xp: 4480 },
  ],
};

export async function fetchLeaderboard() {
  try {
    const response = await api.get("/leaderboard");
    return response.data?.data || response.data || mockLeaderboard;
  } catch (error) {
    return mockLeaderboard;
  }
}
