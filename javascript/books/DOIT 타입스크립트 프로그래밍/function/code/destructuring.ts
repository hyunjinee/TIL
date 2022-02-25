export type Person = { name: string; age: number };

const printPerson = ({ name, age }: Person): void => console.log(`name: ${name}, age: ${age}`);

const makeObject = (key, value) => ({ [key]: value });
