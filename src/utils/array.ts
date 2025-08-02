export const uniqueArray = <T>(array: T[]): T[] => {
  return Array.from(new Set(array));
};

export const shuffleArray = <T>(array: T[]): T[] => {
  return array.sort(() => Math.random() - 0.5);
};