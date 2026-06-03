<script setup>
import SectionHeader from "../shared/SectionHeader.vue";

const articles = [
  {
    category: "Climate Change",
    title: "Why carbon literacy matters for everyday decisions",
    summary: "Understand the biggest drivers of household emissions and how to reduce them fast.",
    time: "5 min read",
  },
  {
    category: "Sustainable Living",
    title: "Build a low-carbon routine without sacrificing comfort",
    summary: "Practical shifts in transport, food, and energy that add up quickly.",
    time: "7 min read",
  },
  {
    category: "Renewable Energy",
    title: "Clean energy myths that slow the transition",
    summary: "Separate fact from fiction and see what is already working in 2026.",
    time: "6 min read",
  },
];
</script>

<template>
  <section id="articles" class="bg-brand-white px-6 py-20">
    <div class="mx-auto max-w-6xl space-y-12">
      <SectionHeader
        label="Educational Articles"
        title="Curated insights to power sustainable habits"
        subtitle="Short, focused reads that turn complex climate topics into actionable guidance."
      />

      <div class="grid gap-6 md:grid-cols-3">
        <div
          v-for="article in articles"
          :key="article.title"
          class="group rounded-3xl border border-brand-dark/10 bg-white p-6 shadow-soft transition hover:-translate-y-1"
        >
          <div class="flex items-center justify-between text-xs font-semibold text-brand-dark/60">
            <span class="rounded-full bg-brand-primary/60 px-3 py-1 text-brand-dark">
              {{ article.category }}
            </span>
            <span>{{ article.time }}</span>
          </div>
          <h3 class="mt-5 text-lg font-semibold text-brand-dark">
            {{ article.title }}
          </h3>
          <p class="mt-3 text-sm text-brand-dark/60">
            {{ article.summary }}
          </p>
          <button
            type="button"
            class="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-brand-dark"
          >
            Read more
            <span class="transition group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
