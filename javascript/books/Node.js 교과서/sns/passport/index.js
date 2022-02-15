const passport = require('passport')
const local = require('./localStrategy')
const kakao = require('./kakaoStrategy')
const User = require('../models/user')


module.exports =  () => {
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findOne({where: {id}})
        .then(user => done(null, user))
        .catch(err => done(err))
    })

    local()
    kakao()
    
}

// serializeUser 는 로그인 시 실행되며, req.session 객체에 어떤 데이터를 저장할지 정하는 메서드이다.  

// done 함수의 첫번째 인수는 에러 발생시 사용하는 것이고, 두번째 인수에는 저장하고 싶은 데이터를 넣는다. 로그인시 사요앚 데이터를 세션에 저장하는데 , 세션에 사용자 정보를
// 모두 저장하면 세션의 용량이 커지고 데이터 ㅣㅇㄹ관선에 문제생기므로 사용자의 아이디만 저장하라고 명령

//  serailize User 는 사용자 정보 객체르 ㄹ세션에 아이디로 저장하는거싱고, deseializeUSer 는 세션에 저장한 아이디를 통해 사용자 정보 객체를 불러온다. 세션에 불필요한 데이터 담아두지 않기위한과정


// 1. 라우터 로그인 요청
// 2. passport.authnticate 메서드 호출
// 3. 로그인 전랴 ㄱ수행
// 4. 로그인 성공시 사용자 정보 객체와 함계 req.login 호출
// 5. lre.login 메서드가 passport serailzieUer - > req.session에 사용자 아이디만 저장
// 로그인 완료






