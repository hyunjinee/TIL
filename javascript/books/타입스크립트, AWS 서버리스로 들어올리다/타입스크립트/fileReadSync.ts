import * as fs from 'fs'

console.log('1. start')

let data: string = fs.readFileSync('data.txt', {encoding: 'utf-8'})

console.log(data)



console.log('2. end')