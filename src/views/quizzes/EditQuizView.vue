<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import LoadingSpinner from "../../components/LoadingSpinner.vue";
import { useQuizzesStore } from "../../stores/quizzes";
import { useToastStore } from "../../stores/toast";

const router = useRouter();
const route = useRoute();
const quizzesStore = useQuizzesStore();
const toastStore = useToastStore();

const loading = ref(true);
const form = ref({
  title: "",
  category: "Harian",
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

      form.value.questions = quiz.questions.map((q) => ({
        content: q.content,
        order: q.order,
        answers: q.answers.map((a) => ({
          content: a.content,
          points: a.points || 0,
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
    order: form.value.questions.length + 1,
    answers: [
      { content: "", points: 0 },
    ],
  });
}

function removeQuestion(index) {
  if (form.value.questions.length > 1) {
    form.value.questions.splice(index, 1);
    form.value.questions.forEach((q, i) => {
      q.order = i + 1;
    });
  }
}

function addAnswer(questionIndex) {
  form.value.questions[questionIndex].answers.push({
    content: "",
    points: 0,
  });
}

function removeAnswer(questionIndex, answerIndex) {
  const question = form.value.questions[questionIndex];
  if (question.answers.length > 1) {
    question.answers.splice(answerIndex, 1);
  }
}

async function handleSubmit() {
  try {
    if (!form.value.title) {
      alert("Judul quiz harus diisi!");
      return;
    }

    if (form.value.questions.length === 0) {
      alert("Minimal harus ada 1 pertanyaan!");
      return;
    }

    for (let i = 0; i < form.value.questions.length; i++) {
      const q = form.value.questions[i];
      if (!q.content) {
        alert(`Pertanyaan ${i + 1} harus diisi!`);
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
      questions: form.value.questions.map((q) => ({
        content: q.content,
        order: q.order,
        answers: q.answers
          .filter((a) => a.content.trim()) // Only include non-empty answers
          .map((a) => ({
            content: a.content,
            points: parseInt(a.points) || 0,
          })),
      })),
    };

    await quizzesStore.updateQuiz(route.params.id, quizData);
    toastStore.success("Quiz berhasil diperbarui");
    router.push("/");
  } catch (error) {
    toastStore.error(error.response?.data?.message || "Gagal memperbarui quiz");
  }
}
</script>

<template>
  <div>
    <div v-if="loading" class="py-12">
      <LoadingSpinner size="lg" />
    </div>

    <div v-else>
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          Edit Quiz
        </h1>
        <div class="flex gap-2">
          <button
            @click="router.push('/')"
            type="button"
            class="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
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
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
            Informasi Quiz
          </h2>

          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Judul Quiz
            </label>
            <input
              v-model="form.title"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="Masukkan judul quiz"
              required
            />
          </div>

          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Kategori
            </label>
            <select
              v-model="form.category"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option v-for="cat in categories" :key="cat" :value="cat">
                {{ cat }}
              </option>
            </select>
          </div>
        </div>

        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
              Pertanyaan
            </h2>
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
            class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4"
          >
            <div class="flex justify-between items-center">
              <h3 class="font-semibold text-gray-900 dark:text-white">
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

            <div>
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Pertanyaan
              </label>
              <textarea
                v-model="question.content"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                rows="3"
                placeholder="Masukkan pertanyaan"
                required
                @input="calculateTotalPoints"
              ></textarea>
            </div>

            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Jawaban (dengan poin masing-masing)
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
                class="flex gap-2 items-end"
              >
                <div class="flex-1">
                  <input
                    v-model="answer.content"
                    type="text"
                    class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                    :placeholder="`Jawaban ${aIndex + 1}`"
                  />
                </div>
                <div class="flex flex-col items-start gap-1">
                  <span class="text-sm text-gray-500 dark:text-gray-400">Poin</span>
                  <input
                    v-model.number="answer.points"
                    type="number"
                    min="0"
                    class="w-20 px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-center"
                    placeholder="0"
                  />
                </div>
                <button
                  v-if="question.answers.length > 1"
                  type="button"
                  @click="removeAnswer(qIndex, aIndex)"
                  class="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Hapus
                </button>
              </div>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Setiap jawaban memiliki poin tersendiri. Poin tertinggi biasanya untuk jawaban terbaik.
              </p>
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
