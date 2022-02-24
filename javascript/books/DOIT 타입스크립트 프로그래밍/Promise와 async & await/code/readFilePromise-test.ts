import { readFilePromise } from "./readFilePromise";

const readFilesAll = async (filenames: string[]) => {
  return await Promise.all(filenames.map((filename) => readFilePromise(filename)));
};

readFilesAll(["./package.json", "./tsconfig.json"])
  .then(([packageJson, tsconfigJson]: string[]) => {
    console.log(packageJson);
    console.log(tsconfigJson);
  })
  .catch((err) => console.log("error", err.message));
