import * as fs from 'fs'


console.log('1. start')


fs.readFile('data.txt', {encoding: 'utf-8'}, (error, data: string) => {
    console.log(data);
})




console.log('2. end')