export function formatNumber(value) {
  const number = Number(value) || 0;
  return new Intl.NumberFormat("en-US").format(number);
}
