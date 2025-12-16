<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useQuizzesStore } from "../../stores/quizzes";

const router = useRouter();
const quizzesStore = useQuizzesStore();

const form = ref({
  title: "",
  category: "Harian",
  totalPoints: 0,
  questions: [
    {
      content: "",
      points: 10,
      order: 1,
      answers: [
        { content: "", isCorrect: true },
        { content: "", isCorrect: false },
        { content: "", isCorrect: false },
        { content: "", isCorrect: false },
      ],
    },
  ],
});

const categories = ["Harian", "Mingguan", "Bulanan"];

function addQuestion() {
  form.value.questions.push({
    content: "",
    points: 10,
    order: form.value.questions.length + 1,
    answers: [
      { content: "", isCorrect: true },
      { content: "", isCorrect: false },
      { content: "", isCorrect: false },
      { content: "", isCorrect: false },
    ],
  });
}

function removeQuestion(index) {
  if (form.value.questions.length > 1) {
    form.value.questions.splice(index, 1);
    // Update order numbers
    form.value.questions.forEach((q, i) => {
      q.order = i + 1;
    });
  }
}

function addAnswer(questionIndex) {
  form.value.questions[questionIndex].answers.push({
    content: "",
    isCorrect: false,
  });
}

function removeAnswer(questionIndex, answerIndex) {
  const question = form.value.questions[questionIndex];
  if (question.answers.length > 2) {
    question.answers.splice(answerIndex, 1);
  }
}

function setCorrectAnswer(questionIndex, answerIndex) {
  // Set all answers to false, then set selected one to true
  form.value.questions[questionIndex].answers.forEach((answer, i) => {
    answer.isCorrect = i === answerIndex;
  });
}

function calculateTotalPoints() {
  form.value.totalPoints = form.value.questions.reduce(
    (sum, q) => sum + (parseInt(q.points) || 0),
    0
  );
}

async function handleSubmit() {
  try {
    // Calculate total points
    calculateTotalPoints();

    // Validate
    if (!form.value.title) {
      alert("Judul quiz harus diisi!");
      return;
    }

    if (form.value.questions.length === 0) {
      alert("Minimal harus ada 1 pertanyaan!");
      return;
    }

    // Validate each question
    for (let i = 0; i < form.value.questions.length; i++) {
      const q = form.value.questions[i];
      if (!q.content) {
        alert(`Pertanyaan ${i + 1} harus diisi!`);
        return;
      }

      const hasCorrectAnswer = q.answers.some((a) => a.isCorrect);
      if (!hasCorrectAnswer) {
        alert(`Pertanyaan ${i + 1} harus memiliki jawaban yang benar!`);
        return;
      }

      const filledAnswers = q.answers.filter((a) => a.content.trim());
      if (filledAnswers.length < 2) {
        alert(`Pertanyaan ${i + 1} harus memiliki minimal 2 jawaban!`);
        return;
      }
    }

    const quizData = {
      title: form.value.title,
      category: form.value.category,
      total_points: form.value.totalPoints,
      questions: form.value.questions.map((q) => ({
        content: q.content,
        points: q.points,
        order: q.order,
        answers: q.answers
          .filter((a) => a.content.trim()) // Only include non-empty answers
          .map((a) => ({
            content: a.content,
            is_correct: a.isCorrect,
          })),
      })),
    };

    await quizzesStore.createQuiz(quizData);
    router.push("/");
  } catch (error) {
    alert(error.response?.data?.message || "Gagal membuat quiz");
  }
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Buat Quiz Baru</h1>
      <button
        @click="handleSubmit"
        :disabled="quizzesStore.loading"
        class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
      >
        Kirim
      </button>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Quiz Info -->
      <div class="bg-white rounded-lg shadow p-6 space-y-4">
        <h2 class="text-lg font-semibold text-gray-900">Informasi Quiz</h2>

        <!-- Title -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Judul Quiz *</label
          >
          <input
            v-model="form.title"
            type="text"
            placeholder="contoh: Kuis Harian - Perubahan Iklim"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            required
          />
        </div>

        <!-- Category -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Kategori *</label
          >
          <select
            v-model="form.category"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option v-for="cat in categories" :key="cat" :value="cat">
              {{ cat }}
            </option>
          </select>
        </div>

        <!-- Total Points (Auto-calculated) -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Total Points (otomatis)</label
          >
          <input
            :value="
              form.questions.reduce(
                (sum, q) => sum + (parseInt(q.points) || 0),
                0
              )
            "
            type="number"
            disabled
            class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
          />
        </div>
      </div>

      <!-- Questions -->
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold text-gray-900">
            Pertanyaan ({{ form.questions.length }})
          </h2>
          <button
            type="button"
            @click="addQuestion"
            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            + Tambah Pertanyaan
          </button>
        </div>

        <div
          v-for="(question, qIndex) in form.questions"
          :key="qIndex"
          class="bg-white rounded-lg shadow p-6 space-y-4"
        >
          <div class="flex justify-between items-center">
            <h3 class="font-semibold text-gray-900">
              Pertanyaan {{ qIndex + 1 }}
            </h3>
            <button
              v-if="form.questions.length > 1"
              type="button"
              @click="removeQuestion(qIndex)"
              class="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
            >
              Hapus
            </button>
          </div>

          <!-- Question Content -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Pertanyaan *</label
            >
            <textarea
              v-model="question.content"
              rows="3"
              placeholder="Tuliskan pertanyaan di sini..."
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-y"
              required
            ></textarea>
          </div>

          <!-- Question Points -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Poin untuk pertanyaan ini</label
            >
            <input
              v-model.number="question.points"
              type="number"
              min="1"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <!-- Answers -->
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <label class="block text-sm font-medium text-gray-700"
                >Jawaban (min. 2) *</label
              >
              <button
                type="button"
                @click="addAnswer(qIndex)"
                class="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition"
              >
                + Tambah Jawaban
              </button>
            </div>

            <div
              v-for="(answer, aIndex) in question.answers"
              :key="aIndex"
              class="flex gap-2 items-center"
            >
              <input
                type="radio"
                :name="`correct-${qIndex}`"
                :checked="answer.isCorrect"
                @change="setCorrectAnswer(qIndex, aIndex)"
                class="w-5 h-5 text-green-600"
                title="Tandai sebagai jawaban benar"
              />
              <input
                v-model="answer.content"
                type="text"
                placeholder="Tuliskan jawaban..."
                class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <button
                v-if="question.answers.length > 2"
                type="button"
                @click="removeAnswer(qIndex, aIndex)"
                class="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Hapus
              </button>
            </div>
            <p class="text-sm text-gray-500">
              Klik radio button untuk menandai jawaban yang benar
            </p>
          </div>
        </div>
      </div>

      <!-- Submit Button (bottom) -->
      <div class="flex justify-end gap-3">
        <button
          type="button"
          @click="router.push('/')"
          class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
        >
          Batal
        </button>
        <button
          type="submit"
          :disabled="quizzesStore.loading"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {{ quizzesStore.loading ? "Menyimpan..." : "Simpan Quiz" }}
        </button>
      </div>
    </form>
  </div>
</template>
