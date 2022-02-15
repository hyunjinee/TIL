import * as fs from 'fs'
import { promisify } from 'util'

console.log(1)

const readFile = promisify(fs.readFile);

// readFile('data.txt' , {encoding: 'utf-8'}).then((data): string)=>{
//     console.log(data)
// }) .catch


readFile('data.txt', {encoding: 'utf-8'})
.then((data: string)=> {
    console.log(data)
})
.catch((e)=> {
    console.log(e)
})


console.log(2)