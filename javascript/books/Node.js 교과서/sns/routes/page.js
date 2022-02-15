const express = require('express')
const { Post } = require('../models')
const { isNotLoggedIn, isLoggedIn } = require('./middlewares')

const router = express.Router()



router.use((req,res,next)=> {
    res.locals.user = null
    res.locals.followerCount = 0
    res.locals.followingCount = 0
    res.locals.followerIdList = []
    next()
})

router.get('/profile', isLoggedIn,(req,res) => {
    res.render('profile', {title: '내 정보 - NodeBird'})
})

router.get('/join',isNotLoggedIn, (req,res) => {
    res.render('join', {title: '회원가입 - NodeBird'})
})

router.get('/', async (req,res,next) => {
    try {
        const posts = await Post.findAll({
            include: {
                model: User,
                attributes: ['id', 'nick']
            },
            order: [['createdAt', 'DESC']]
        })


    res.render('main', {
        title: 'NodeBird',
        twits: posts
    })
    } catch (error) {
        
    }
    
})


module.exports = router;

