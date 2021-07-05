export const fix = (s: string): string => {
  console.log(s);
  if (!s) return "0";
  else return parseFloat(s).toFixed(2);
};
