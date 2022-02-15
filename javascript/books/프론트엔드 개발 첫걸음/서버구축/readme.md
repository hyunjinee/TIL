firebase 펑션을 사용해서 restful api를 작성할 것이다. 앞에서 미리 설정해둔 fucntions 디렉토리 안의 index.js 파일을 편집하면된다. 

cors 패키지는 크로스 도메인 통신을 위해 사용한다.

어드민 sdk 의 auth().verifyIdToken()메서드를 사용하여 사용자를 검증한다. verifyIdToken() 의 인자로 인증으 ㄹ마친 사용자의 accessToken을 넘기면된다. checkUser()함수는 쿼리 파라미터 auth에 들어있는 인증을 거친 사용자의 accessToken을 넘기면된다. 