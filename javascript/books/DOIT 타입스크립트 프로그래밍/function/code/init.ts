export const init = (callback: () => void): void => {
  console.log("default init finished");
  callback();
  console.log("all init finished");
};
