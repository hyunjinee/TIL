type Person = {
  address: string
}

let person2: unknown

person2 = JSON.parse('{"address": "서울시 서초구 서초동"}')
// console.log(person2.address)
