export const withErrorHandling = (cb) => {
  return function (...params) {
    try {
      cb(...params);
    } catch (e) {
      console.error(e);
    }
  };
};
