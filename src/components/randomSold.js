export const randomSold = () => {
  const soldData = [];
  for (let i = 0; i < 200; i++) {
    soldData.push(Math.floor(Math.random() * 100));
  }
  return soldData;
};
