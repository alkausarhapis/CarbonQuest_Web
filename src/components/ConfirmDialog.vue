<script setup>

defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "Konfirmasi",
  },
  message: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["confirm", "cancel"]);

function handleConfirm() {
  emit("confirm");
}

function handleCancel() {
  emit("cancel");
}
</script>

<template>
  <Transition name="modal">
    <div
      v-if="show"
      class="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] p-4"
      style="margin: 0; width: 100vw; height: 100vh"
      @click.self="handleCancel"
    >
      <div
        class="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transition-colors duration-200"
        @click.stop
      >
        <div class="flex justify-center pt-8 pb-4">
          <div
            class="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center transition-colors duration-200"
          >
            <svg
              class="w-12 h-12 text-red-600 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        <div class="px-8 pb-6">
          <h2
            class="text-2xl font-bold text-gray-900 dark:text-white text-center mb-3"
          >
            {{ title }}
          </h2>
          <p
            v-if="message"
            class="text-gray-600 dark:text-gray-400 text-center leading-relaxed"
          >
            {{ message }}
          </p>
        </div>

        <div class="flex gap-3 px-8 pb-8">
          <button
            @click="handleCancel"
            class="flex-1 py-3.5 px-6 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 font-semibold rounded-xl transition-all duration-200 hover:scale-105"
          >
            Batal
          </button>
          <button
            @click="handleConfirm"
            class="flex-1 py-3.5 px-6 text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg shadow-red-500/30 dark:shadow-red-900/50"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-enter-active {
  transition: all 0.3s ease-out;
}

.modal-leave-active {
  transition: all 0.2s ease-in;
}

.modal-enter-from {
  opacity: 0;
}

.modal-enter-from > div {
  transform: scale(0.9);
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-leave-to > div {
  transform: scale(0.9);
  opacity: 0;
}
</style>
