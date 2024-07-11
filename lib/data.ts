export const randomImage = () => {
  return `/imgs/${Math.floor(Math.random() * 6) + 1}.jpg`;
};
