<script setup>
import MarketingNavbar from "../components/layout/MarketingNavbar.vue";
import MarketingFooter from "../components/layout/MarketingFooter.vue";
import HeroSection from "../components/landing/HeroSection.vue";
import FeaturesSection from "../components/landing/FeaturesSection.vue";
import MissionShowcase from "../components/landing/MissionShowcase.vue";
import ArticlesPreview from "../components/landing/ArticlesPreview.vue";
import QuizPreview from "../components/landing/QuizPreview.vue";
import LeaderboardPreview from "../components/landing/LeaderboardPreview.vue";
import StatsSection from "../components/landing/StatsSection.vue";
import CTASection from "../components/landing/CTASection.vue";

const menuItems = [
  { label: "Features", href: "#features" },
  { label: "Missions", href: "#missions" },
  { label: "Articles", href: "#articles" },
  { label: "Quizzes", href: "#quizzes" },
  { label: "Leaderboard", href: "#leaderboard" },
  { label: "Stats", href: "#stats" },
];

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Missions", href: "#missions" },
  { label: "Articles", href: "#articles" },
  { label: "Leaderboard", href: "#leaderboard" },
];
</script>

<template>
  <div class="min-h-screen bg-background font-body text-dark">
    <MarketingNavbar
      brand="CarbonQuest"
      :menu-items="menuItems"
      :cta="{ label: 'Start Journey', href: '/dashboard' }"
      :secondary-cta="{ label: 'Explore Features', href: '#features' }"
    />

    <HeroSection
      :primary-cta="{ label: 'Start Journey', href: '/dashboard' }"
      :secondary-cta="{ label: 'Explore Features', href: '#features' }"
    />
    <FeaturesSection />
    <MissionShowcase />
    <ArticlesPreview />
    <QuizPreview />
    <LeaderboardPreview />
    <StatsSection />
    <CTASection />

    <MarketingFooter
      brand="CarbonQuest"
      :nav-links="navLinks"
      :resource-links="[
        { label: 'Calculator', href: '/calculator' },
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Quizzes', href: '/quizzes' },
      ]"
    />
  </div>
</template>
