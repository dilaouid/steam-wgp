export const hashGenerator = (turn: number) => {
  let hash = '';
  while (turn-- > 0) {
    hash += Math.random().toString(36).substring(2, 15);
  }
  return hash;
};