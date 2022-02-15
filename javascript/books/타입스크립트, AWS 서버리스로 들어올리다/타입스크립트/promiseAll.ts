import * as fs from 'fs'
import { promisify } from 'util'


const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)






const data = readFile('data.txt', {encoding:'utf-8'})
const data2= readFile('data2.txt', {encoding: 'utf-8'})



console.log(1)



Promise.all([data,data2]).then((values: string[]) => {
    const out = values[0] + values[1]
    console.log(out)
    writeFile('out2.txt', out)
})
.catch(error=> {
    console.log(error)
})


console.log(2)


