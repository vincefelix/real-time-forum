export const throttle = (func, delay) => {
  let lastCall = 0;
  return () => {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    func();
  };
};
