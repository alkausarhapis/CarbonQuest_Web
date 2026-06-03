import { onBeforeUnmount, onMounted, ref } from "vue";

export const useScrollReveal = (options = { threshold: 0.2 }) => {
  const target = ref(null);
  const isVisible = ref(false);
  let observer;

  onMounted(() => {
    if (typeof IntersectionObserver === "undefined") {
      isVisible.value = true;
      return;
    }

    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        observer.disconnect();
      }
    }, options);

    if (target.value) {
      observer.observe(target.value);
    }
  });

  onBeforeUnmount(() => {
    if (observer) {
      observer.disconnect();
    }
  });

  return { target, isVisible };
};
