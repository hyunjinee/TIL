// 로컬 로그인


//  passport -local
// 로그인한 사용자는 회원가입과 로그인 라우터에 접근하면 안된다. 이미 로그인을 했기 떄문이다. ㅏ




exports.isLoggedIn = (req,res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send('로그인 필요');
    }
}

exports.isNotLoggedIn = (req,res, next) => {
    if (!req.isAuthenticated()) {
        next()
    } else {
        const message = encodeURIComponent('로그인한 상태입니다.')
        res.redirect(`/?error=${message}`)
    }
}