import api from "./api";

const mockMissions = [
  {
    title: "Use Public Transport",
    xp: 50,
    progress: 20,
    difficulty: "Easy",
    deadline: "2 days left",
    status: "Available",
  },
  {
    title: "Reduce Plastic Usage",
    xp: 75,
    progress: 55,
    difficulty: "Medium",
    deadline: "4 days left",
    status: "In Progress",
  },
  {
    title: "Plant a Tree",
    xp: 150,
    progress: 15,
    difficulty: "Hard",
    deadline: "7 days left",
    status: "Available",
  },
  {
    title: "Save Electricity",
    xp: 60,
    progress: 100,
    difficulty: "Easy",
    deadline: "Completed",
    status: "Completed",
  },
];

export async function fetchMissions() {
  try {
    const response = await api.get("/missions");
    return response.data?.data || response.data || mockMissions;
  } catch (error) {
    return mockMissions;
  }
}
