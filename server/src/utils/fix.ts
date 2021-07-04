export const fix = (s: string) => {
  if (!s) return 0;
  const num = parseFloat(s);
  return num % 1 != 0 ? num.toFixed(1) : num;
};
