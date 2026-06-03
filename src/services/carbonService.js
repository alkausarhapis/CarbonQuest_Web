import api from "./api";

const mockOverview = {
  highlights: [
    {
      title: "Carbon Score",
      value: "845",
      change: "+12%",
      changeLabel: "this week",
      variant: "primary",
    },
    {
      title: "Daily Emission",
      value: "4.3 kg CO2",
      change: "-0.4 kg",
      changeLabel: "from yesterday",
      variant: "light",
    },
    {
      title: "Weekly Progress",
      value: "72%",
      change: "+8%",
      changeLabel: "completion",
      variant: "light",
    },
    {
      title: "Active Missions",
      value: "3",
      change: "2 completed",
      changeLabel: "this week",
      variant: "dark",
    },
  ],
  activities: [
    {
      title: "Completed mission: Use Public Transport",
      time: "Today, 09:45",
      xp: "+50 XP",
    },
    {
      title: "Quiz finished: Climate Awareness",
      time: "Yesterday, 19:30",
      xp: "+70 XP",
    },
    {
      title: "Article saved: Renewable Energy Myths",
      time: "Yesterday, 12:10",
      xp: "Knowledge badge",
    },
    {
      title: "Mission started: Reduce Plastic Usage",
      time: "2 days ago",
      xp: "+75 XP",
    },
  ],
};

export async function fetchCarbonOverview() {
  try {
    const response = await api.get("/carbon/overview");
    return response.data?.data || response.data || mockOverview;
  } catch (error) {
    return mockOverview;
  }
}
