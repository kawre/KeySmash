export const fix = (s: string): string => {
  if (!s) return "0";
  else return parseFloat(s).toFixed(2);
};
