const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const morgan = require('morgan')
const session = require('express-session')
const nunjucks = require('nunjucks')
const dotenv = require('dotenv')
// const passportConfig = require('./passport')
dotenv.config()
const app = express()
// passportConfig()

// const authRouter  = require('./routes/auth')
// // const indexRouter = require('./routes')


const {sequelize} = require('./models')
const { ESRCH } = require('constants')


app.set('port' , process.env.PORT || 8002)
app.set('view engine' , 'html')
nunjucks.configure('views', {
    express: app,
    watch: true,
})


sequelize.sync({ force: false})
.then(()=> {
    console.log('db연결 성공')
})
.catch((err)=> {
console.error(err)
})



app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    }
}))


app.use((req,res,next) => {
    const error = new Error(`${req.method} ${req.ulr} 라우터가 없습니다.`)
    error.status = 404;
    next(error)
})

app.use(err, req,res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.NODE_ENV != 'production' ? err : {}
    res.status(err.status || 500)
res.render('error')
}

app.listen(app.get('port'), ()=> {
    console.log(app.get('port'), '번에서 대기중')
})