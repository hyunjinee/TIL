




const express = require('express')



const app = express()


app.set('port', process.env.PORT || 3000)

app.use((req,res, next)=> {
    console.log("모든 요청에 다 실행됩니다.")
    next()
})

app.get('/', (req,res,next)=> {
    console.log(
        'get요청에 대해서만 실행된다.'
    )

    next()
}, (req,res)=> {
    throw new Error('에러느 에러 처리 미들웨어로 간다.')
})



app.use((err,req,res,next)=> {
    console.error(err);

    res.status(500).send(err.message)
})