//널그리워하다~


const passport = require('passport')

const kakaoStrategy = require('passport-kakao').Strategy;



const User = require('../models/user')




module.exports = ( )=> {
    passport.use(new kakaoStrategy({
        clientID: process.env.KAKAO_ID,
        callbackURL: '/auth/kakao/callback'
    }, async (accessToken, refreshToken, profile, done)=> {
        console.log('kakao profile', profile)

        try {
            const exUser = await User.findOne({
                where: {snsId: profile.snsId, provider: 'kakao'}
            })

            if (exUser) {
                done( null, exUser)
            }else {
                const newUser = await User.create({
                    email: profile._json && profile._json.kakao_account_email,
                    nick : profile.displayName,
                    snsId: profile.displayName,
                    provider: 'kakao',
                })

                done (null , newUser)
            }
        } catch(error) {
            console.error(error)
            done(error)
        }
    }))
}