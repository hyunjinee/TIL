Promise.resolve(1).then((value) => console.log(value));
Promise.resolve("hello").then((value) => console.log(value));

Promise.resolve([1, 2, 3]).then((value) => console.log(value));
Promise.resolve({ name: "jack", age: 32 }).then((value) => console.log(value));

Promise.reject(new Error("에러발생")).catch((err: Error) => console.log("error:", err.message));
