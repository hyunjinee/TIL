const asyncReturn = async () => {
  return [1, 2, 3];
};

asyncReturn().then((value) => console.log(value)); // [1, 2, 3]
// async함수는 Promise를 반환합니다.
