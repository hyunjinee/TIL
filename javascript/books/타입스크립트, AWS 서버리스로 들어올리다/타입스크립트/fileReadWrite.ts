import * as fs from 'fs'


console.log(1)

fs.readFile('data.txt', {encoding: 'utf-8'}, (error, data:string)=> {
    fs.readFile('data2.txt', {encoding: 'utf-8'}, (error, data2: string)=> {
        const outdata = data + data2;
        fs.writeFile('out.txt', outdata, (error)=> {
            console.log(outdata);
        })
    })
})


console.log(2)