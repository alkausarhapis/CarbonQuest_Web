<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useQuizzesStore } from "../../stores/quizzes";

const router = useRouter();
const route = useRoute();
const quizzesStore = useQuizzesStore();

const loading = ref(true);
const form = ref({
  title: "",
  category: "Harian",
  totalPoints: 0,
  questions: [],
});

const categories = ["Harian", "Mingguan", "Bulanan"];

onMounted(async () => {
  try {
    const quizId = route.params.id;
    const quiz = await quizzesStore.getQuizById(quizId);

    if (quiz) {
      form.value.title = quiz.title;
      form.value.category = quiz.category;
      form.value.totalPoints = quiz.total_points || 0;

      // Map questions with answers
      form.value.questions = quiz.questions.map((q) => ({
        content: q.content,
        points: q.points,
        order: q.order,
        answers: q.answers.map((a) => ({
          content: a.content,
          isCorrect: a.is_correct,
        })),
      }));
    }
  } catch (error) {
    alert("Gagal memuat data quiz");
    router.push("/");
  } finally {
    loading.value = false;
  }
});

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

    await quizzesStore.updateQuiz(route.params.id, quizData);
    router.push("/");
  } catch (error) {
    alert(error.response?.data?.message || "Gagal mengupdate quiz");
  }
}
</script>

<template>
  <div>
    <div v-if="loading" class="text-center py-12">
      <div class="text-gray-600">Memuat...</div>
    </div>

    <div v-else>
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Edit Quiz</h1>
        <div class="flex gap-2">
          <button
            @click="router.push('/')"
            type="button"
            class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            Batal
          </button>
          <button
            @click="handleSubmit"
            :disabled="quizzesStore.loading"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            Perbarui Quiz
          </button>
        </div>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Quiz Basic Info -->
        <div class="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 class="text-lg font-semibold text-gray-900">Informasi Quiz</h2>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Judul Quiz
            </label>
            <input
              v-model="form.title"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Masukkan judul quiz"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Kategori
            </label>
            <select
              v-model="form.category"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option v-for="cat in categories" :key="cat" :value="cat">
                {{ cat }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Total Points
            </label>
            <input
              :value="form.totalPoints"
              type="number"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
              readonly
            />
            <p class="text-sm text-gray-500 mt-1">
              Total points dihitung otomatis dari semua pertanyaan
            </p>
          </div>
        </div>

        <!-- Questions -->
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-semibold text-gray-900">Pertanyaan</h2>
            <button
              type="button"
              @click="addQuestion"
              class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              + Tambah Pertanyaan
            </button>
          </div>

          <div
            v-for="(question, qIndex) in form.questions"
            :key="qIndex"
            class="bg-white rounded-lg shadow p-6 space-y-4"
          >
            <div class="flex justify-between items-start">
              <h3 class="text-md font-semibold text-gray-900">
                Pertanyaan {{ qIndex + 1 }}
              </h3>
              <button
                v-if="form.questions.length > 1"
                type="button"
                @click="removeQuestion(qIndex)"
                class="text-red-600 hover:text-red-800"
              >
                Hapus
              </button>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Pertanyaan
              </label>
              <textarea
                v-model="question.content"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
                placeholder="Masukkan pertanyaan"
                required
                @input="calculateTotalPoints"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Points
              </label>
              <input
                v-model.number="question.points"
                type="number"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="10"
                min="1"
                required
                @input="calculateTotalPoints"
              />
            </div>

            <!-- Answers -->
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <label class="block text-sm font-medium text-gray-700">
                  Jawaban (Pilih jawaban yang benar)
                </label>
                <button
                  type="button"
                  @click="addAnswer(qIndex)"
                  class="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  + Tambah Jawaban
                </button>
              </div>

              <div
                v-for="(answer, aIndex) in question.answers"
                :key="aIndex"
                class="flex gap-2 items-start"
              >
                <input
                  type="radio"
                  :name="`correct-${qIndex}`"
                  :checked="answer.isCorrect"
                  @change="setCorrectAnswer(qIndex, aIndex)"
                  class="mt-3 w-4 h-4 text-blue-600"
                />
                <input
                  v-model="answer.content"
                  type="text"
                  class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  :placeholder="`Jawaban ${aIndex + 1}`"
                />
                <button
                  v-if="question.answers.length > 2"
                  type="button"
                  @click="removeAnswer(qIndex, aIndex)"
                  class="px-3 py-2 text-red-600 hover:text-red-800"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="flex gap-4">
          <button
            type="submit"
            class="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Perbarui Quiz
          </button>
          <button
            type="button"
            @click="router.push('/')"
            class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
