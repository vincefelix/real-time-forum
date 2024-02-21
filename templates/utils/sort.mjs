const compare = (a, b) => {
  const A = a.Username.toUpperCase();
  const B = b.Username.toUpperCase();

  let comparison = 0;
  if (A > B) {
    comparison = 1;
  } else if (A < B) {
    comparison = -1;
  }
  return A > B ? 1 : A < B ? -1 : 1;
};

export const sort = (list = []) => {
  console.log("to sort", list);
  return list.sort(compare);
};
