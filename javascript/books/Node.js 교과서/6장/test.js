const express =require('express')


app = express()

app.use((req,res,next) => {
    const error = new Error("에러다임마")

    error.status = 404;

    next(error);
})

app.use((err, req,res,next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err: {}

    console.log(err)
})

app.listen(3000, () => {
    'server is listening '
})