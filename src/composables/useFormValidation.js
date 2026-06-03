import { ref } from "vue";

export function useFormValidation() {
  const errors = ref({});
  const touched = ref(new Set());

  function touch(field) {
    touched.value = new Set([...touched.value, field]);
  }

  function clearField(field) {
    const updated = { ...errors.value };
    delete updated[field];
    errors.value = updated;
  }

  function clearErrors() {
    errors.value = {};
  }

  function setErrors(errs) {
    errors.value = errs;
  }

  function hasError(field) {
    return touched.value.has(field) && !!errors.value[field];
  }

  function validate(rules, form) {
    clearErrors();
    let valid = true;
    for (const [field, ruleFn] of Object.entries(rules)) {
      const msg = ruleFn(form[field]);
      if (msg) {
        errors.value[field] = msg;
        valid = false;
      }
    }
    const allTouched = new Set([...touched.value, ...Object.keys(rules)]);
    touched.value = allTouched;
    return valid;
  }

  return {
    errors,
    touched,
    validate,
    clearField,
    clearErrors,
    setErrors,
    hasError,
    touch,
  };
}
