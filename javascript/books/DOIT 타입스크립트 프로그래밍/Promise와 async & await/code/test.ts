import { readFileSync, readFile } from "fs";

console.log("read package.json using synchronous api...");
const buffer: Buffer = readFileSync("./package.json");
console.log(buffer.toString());

readFile("./package.json", (error: Error, buffer: Buffer) => {
  console.log("read package.json using asynchronous api...");
  console.log(buffer.toString());
});

const readFilePromise = (filename: string): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    readFile(filename, (error: Error, buffer: Buffer) => {
      if (error) reject(error);
      else resolve(buffer.toString());
    });
  });

async () => {
  const content = await readFilePromise("./package.json");
  console.log("read package.json using Promise async/await");
  console.log(content);
};
