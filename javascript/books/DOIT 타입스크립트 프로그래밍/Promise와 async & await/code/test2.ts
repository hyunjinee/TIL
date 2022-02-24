export async function test2() {
  let value = await "hello";
  console.log(value);
  value = await Promise.resolve("world");
  console.log(value);
}
