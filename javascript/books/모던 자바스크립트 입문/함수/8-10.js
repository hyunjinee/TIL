function Primes(n) {
  //에라토스 테네스의 체로 2~n 의 소수 구하기
  let p = [];
  for (let i = 2; i <= n; i++) {
    p[i] = true;
  }
  let max = Math.floor(Math.sqrt(n));
  let x = 2;
  while (x <= max) {
    for (let i = 2 * x; i <= n; i += x) p[i] = false;
    while (!p[++x]);
  }
  let primes = [],
    nprimes = 0;
  for (let i = 2; i <= n; i++) if (p[i]) primes[nprimes++] = i;
  p = null;
  return function (m) {
    for (let i = 0, product = 1; i < m; i++) {
      product *= primes[Math.floor(Math.random() * nprimes)];
    }
    return product;
  };
}
let primeProduct = Primes(100000);
console.log(primeProduct(2));
console.log(primeProduct(2));
