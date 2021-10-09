export const mockForLine = (item) => {
  if (item !== undefined) {
    return [item * Math.random() * 0.3, item * Math.random() * 0.6, item * Math.random() * 0.75, item * 0.4, item * 0.9];
  }

  return [0, 0, 0, 0, 0];
};
