Promise.race([Promise.resolve(true), Promise.resolve("heelo")]).then((value) => console.log(value)); // true

Promise.race([Promise.resolve(true), Promise.reject(new Error("heelo"))])
  .then((value) => console.log(value))
  .catch((error) => console.log(error.message)); // 호출되지 않음

Promise.race([Promise.reject(new Error("error")), Promise.resolve(true)])
  .then((value) => console.log(value)) // 호출되지 않음
  .catch((error) => console.log(error.message)); // error
