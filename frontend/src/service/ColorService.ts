export const convertHexToRgba = (hex: string): string => {
  const r = Number.parseInt(hex.substring(0, 2), 16);
  const g = Number.parseInt(hex.substring(2, 4), 16);
  const b = Number.parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, 1)`;
};
