export function required(value, label) {
  if (value === undefined || value === null) return `${label} harus diisi`;
  if (typeof value === "string" && !value.trim()) return `${label} harus diisi`;
  if (typeof value === "number" && isNaN(value)) return `${label} harus diisi`;
  return "";
}

export function email(value) {
  if (!value || !value.trim()) return "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Format email tidak valid";
  return "";
}

export function minLength(value, min, label) {
  if (value && value.trim().length < min) return `${label} minimal ${min} karakter`;
  return "";
}

export function matches(value, match, label) {
  if (value && value !== match) return `${label} tidak cocok`;
  return "";
}

export function notMatch(value, other, label) {
  if (value && value === other) return `${label} tidak boleh sama dengan password saat ini`;
  return "";
}

export function selectRequired(value, label) {
  if (!value) return `${label} harus dipilih`;
  return "";
}

export function pointsRequired(value, label) {
  if (value === "" || value === null || value === undefined) return `${label} harus diisi`;
  return "";
}
