<script setup>
import LandingNavbar from "../components/layout/LandingNavbar.vue";
import LandingFooter from "../components/layout/LandingFooter.vue";
import HeroSection from "../components/landing/HeroSection.vue";
import FeaturesSection from "../components/landing/FeaturesSection.vue";
import MissionShowcase from "../components/landing/MissionShowcase.vue";
import ArticlesPreview from "../components/landing/ArticlesPreview.vue";
import QuizPreview from "../components/landing/QuizPreview.vue";
import LeaderboardPreview from "../components/landing/LeaderboardPreview.vue";
import StatsSection from "../components/landing/StatsSection.vue";
import CTASection from "../components/landing/CTASection.vue";

const menuItems = [
  { label: "Fitur", href: "#features" },
  { label: "Misi", href: "#missions" },
  { label: "Artikel", href: "#articles" },
  { label: "Kuis", href: "#quizzes" },
  { label: "Peringkat", href: "#leaderboard" },
  { label: "Statistik", href: "#stats" },
];

const navLinks = [
  { label: "Fitur", href: "#features" },
  { label: "Misi", href: "#missions" },
  { label: "Artikel", href: "#articles" },
  { label: "Peringkat", href: "#leaderboard" },
];
</script>

<template>
  <div class="min-h-screen bg-brand-background font-brandBody text-brand-dark">
    <LandingNavbar
      brand="CarbonQuest"
      :menu-items="menuItems"
      :cta="{ label: 'Mulai Perjalanan', href: 'https://drive.google.com/drive/folders/1jFhOWbdc7BVrS3xr8qWJn1KzOh6Z8_26' }"
      :secondary-cta="{ label: 'Jelajahi Fitur', href: '#features' }"
    />

    <HeroSection
      :primary-cta="{ label: 'Mulai Perjalanan', href: 'https://drive.google.com/drive/folders/1jFhOWbdc7BVrS3xr8qWJn1KzOh6Z8_26' }"
      :secondary-cta="{ label: 'Jelajahi Fitur', href: '#features' }"
    />
    <FeaturesSection />
    <MissionShowcase />
    <ArticlesPreview />
    <QuizPreview />
    <LeaderboardPreview />
    <StatsSection />
    <CTASection />

    <LandingFooter
      brand="CarbonQuest"
      :nav-links="navLinks"
      :resource-links="[
        { label: 'Dasbor', href: '/' },
        { label: 'Artikel', href: '/articles' },
        { label: 'Misi', href: '/missions' },
        { label: 'Kuis', href: '/quizzes/create' },
      ]"
    />
  </div>
</template>
