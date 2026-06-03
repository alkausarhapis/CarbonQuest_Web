<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import FieldError from "../../components/shared/FieldError.vue";
import { useFormValidation } from "../../composables/useFormValidation";
import { required } from "../../utils/validation";
import { useQuizzesStore } from "../../stores/quizzes";
import { useToastStore } from "../../stores/toast";

const router = useRouter();
const quizzesStore = useQuizzesStore();
const toastStore = useToastStore();

const form = ref({
  title: "",
  category: "Harian",
  questions: [
    {
      content: "",
      order: 1,
      answers: [{ content: "", points: 0 }],
    },
  ],
});

const categories = ["Harian", "Mingguan", "Bulanan"];
const apiError = ref("");

const { errors, validate, clearField, clearErrors, touch, hasError } =
  useFormValidation();

function addQuestion() {
  form.value.questions.push({
    content: "",
    order: form.value.questions.length + 1,
    answers: [{ content: "", points: 0 }],
  });
}

function removeQuestion(index) {
  if (form.value.questions.length > 1) {
    form.value.questions.splice(index, 1);
    form.value.questions.forEach((q, i) => { q.order = i + 1; });
  }
}

function addAnswer(questionIndex) {
  form.value.questions[questionIndex].answers.push({ content: "", points: 0 });
}

function removeAnswer(questionIndex, answerIndex) {
  const question = form.value.questions[questionIndex];
  if (question.answers.length > 1) {
    question.answers.splice(answerIndex, 1);
  }
}

async function handleSubmit() {
  apiError.value = "";

  const rules = {
    title: (v) => required(v, "Judul quiz"),
  };

  if (!validate(rules, form.value)) return;

  if (form.value.questions.length === 0) {
    errors.value.questions = "Minimal harus ada 1 pertanyaan";
    touch("questions");
    return;
  }

  for (let i = 0; i < form.value.questions.length; i++) {
    const q = form.value.questions[i];
    if (!q.content.trim()) {
      errors.value[`q${i}_content`] = `Pertanyaan ${i + 1} harus diisi`;
      touch(`q${i}_content`);
      return;
    }
    const filledAnswers = q.answers.filter((a) => a.content.trim());
    if (filledAnswers.length < 2) {
      errors.value[`q${i}_answers`] = `Pertanyaan ${i + 1} harus memiliki minimal 2 jawaban`;
      touch(`q${i}_answers`);
      return;
    }
  }

  clearErrors();

  try {
    const quizData = {
      title: form.value.title,
      category: form.value.category,
      questions: form.value.questions.map((q) => ({
        content: q.content,
        order: q.order,
        answers: q.answers.filter((a) => a.content.trim()).map((a) => ({
          content: a.content,
          points: parseInt(a.points) || 0,
        })),
      })),
    };

    await quizzesStore.createQuiz(quizData);
    toastStore.success("Quiz berhasil dibuat");
    router.push("/");
  } catch (error) {
    apiError.value = error.response?.data?.message || "Gagal membuat quiz";
  }
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        Buat Quiz Baru
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
          Kirim
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
            >Judul Quiz</label
          >
          <input
            v-model="form.title"
            @blur="touch('title')"
            @input="clearField('title')"
            type="text"
            placeholder="contoh: Kuis Harian - Perubahan Iklim"
            :aria-invalid="hasError('title')"
            :aria-describedby="hasError('title') ? 'title-error' : undefined"
            class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            :class="hasError('title') ? 'border-red-500 ring-red-500/20 focus:ring-red-500/30' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'"
          />
          <FieldError :message="hasError('title') ? errors.title : ''" id="title-error" />
        </div>

        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >Kategori</label
          >
          <select
            v-model="form.category"
            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
              >Pertanyaan</label
            >
            <textarea
              v-model="question.content"
              @blur="touch(`q${qIndex}_content`)"
              @input="clearField(`q${qIndex}_content`)"
              rows="3"
              placeholder="Tuliskan pertanyaan di sini..."
              :aria-invalid="hasError(`q${qIndex}_content`)"
              :aria-describedby="hasError(`q${qIndex}_content`) ? `q${qIndex}_content-error` : undefined"
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              :class="hasError(`q${qIndex}_content`) ? 'border-red-500 ring-red-500/20 focus:ring-red-500/30' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'"
            ></textarea>
            <FieldError :message="hasError(`q${qIndex}_content`) ? errors[`q${qIndex}_content`] : ''" :id="`q${qIndex}_content-error`" />
          </div>

          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Jawaban (min. 2)</label
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
              class="flex gap-2 items-end"
            >
              <div class="flex-1">
                <input
                  v-model="answer.content"
                  type="text"
                  placeholder="Tuliskan jawaban..."
                  class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
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
            <FieldError :message="hasError(`q${qIndex}_answers`) ? errors[`q${qIndex}_answers`] : ''" :id="`q${qIndex}_answers-error`" />
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Setiap jawaban memiliki poin tersendiri. Poin tertinggi biasanya untuk jawaban terbaik.
            </p>
          </div>
        </div>
      </div>

      <div
        v-if="apiError"
        class="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
      >
        {{ apiError }}
      </div>

      <div class="flex justify-end gap-3">
        <button
          @click="router.push('/')"
          type="button"
          class="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
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
