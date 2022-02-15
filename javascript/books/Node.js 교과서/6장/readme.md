nodemon 이 실행되는 콘솔에 rs를 입력해서 수동으로 재시작할 수도 있다. 


express 모듈에는 http모듈이 내장되어있으므로 서버의 역할을 할수 있다. 

app.set

app.get

익스프레스에서는 res.wirte나 res.end 대신res.send 를 사용한다.

미들웨어는 익스프레스의 핵심이다. 요청과 응답의 중간에 위치하여 미들웨어라고한다. 뒤에나오는 라우터와 에러핸들러 또한 미들웨어의 일종이므로 미들웨어가 익스프레스의 전부라고해도과언이 아니다. 미들웨어는 요청과 응답을 조작하여 기능을 추가하기도하고 나쁜 요청을 걸러내기도한다. 에러는 에러처리 미들웨어로간다.

app.use에 매개변수가 req,res,next인 함수를 넣으면 된다. 미들웨어는 위에서부터 아래로 순서대로 실행되면서 요청과 응답사이에 특별한 기능을 추가할 수 있다. 

에러처리 미들웨어는 매개변수가 err,req,res,next로 네개이다. 모든 매개변수를 사용하지 않더라도 매개변수가 반드시 네개이어야한다. 첫 번째 매개변수 err에는 에러에 관한 정보가 담겨있다. res.status 메서드로 http상태코드를 지정할 수 있다. 기본값은 200이다. 에러처리 미들웨어를 직접연결하지 않아도 기본적으로 익스프레스가 에러를 처리하기는 한다. 하지만 실무에서는 직접 에러처리 미들웨어를 연결해주는 것이 좋다. 에러처리 미들웨어는 특별한 경우가 아니면 가장 아래에 위치하도록 한다. 

`npm i morgan cookie-parser express-session dotenv`


미들웨어를 통해 요청과 응답에 다양한 기능을 추가할 수 있고 이미 많은 사람이 유용한 기능들을 패키지로 만들어두었다. 실무에 자주 사용하는 패키지를 설치해보자.

다른사람이 만든 미들웨어내부에 next가 들어있기 때문에 내부적으로 호출하기에 다음 미들웨어로 넘어갈 수 있다.


dotenv 패키지는 .env 파일을 읽어서 process.env 로 만든다. 키=값 형식으로 추가하면된다. process.env 를 별도의 파일로 관리하는 이유는 보안과 설정의 편의성때문이다. 비밀 키들을 소스코드에 그대로 적어두면 소스코드가 유출되었을 때 키도 값이 유출된다. 따라서 .env 같은 별도의 파일에 비밀 키를 적어두고 dotenv 패키지로 비밀키를 로딩하는 방식으로 관리하곤한다. 소스코드가 유출되더라도 .env 파일만 잘관리하면 비밀키는 지킬수 있다.


### 6.2.1 morgan

요청과 응답에 대한 정보를 콘솔에 기록한다.

`app.use(morgan('dev'))`

인수로 dev 외에 combined, common, short , tiny 등을 넣을 수 있다. 인수를 바꾸면 로그가 달라지니 테스트해보자 개발환경에서는 dev를 , 배포환경에서는 combined를 이용하자.


### 6.2.2 static

static 미들웨어는 정적인 파일들을 제공하는 라우터역할을 한다. 기본적으로 제공되기에 따로 설치할 필요없이 express 객체안에서 꺼내 장착하면 된다. 다음과같이 사용한다.

```js

app.use('경로', express.static('실제경로'))
```


실제 서버의 경로에는 public이 들어있지만 요청 주소에는 public이 들어있지 않다는 점을 주목하자. 서버의 폴더경로와 요청 경로가 다르므로 외부인이 서버의 구조를 쉽게 파악할 수 없다. 이는 보안에 큰도움이된다.
만약 요청 경로에 해당하는 파일이 없으면 알아서 내부적으로 next를 호출한다. 만약 파일을 발견했다면 다음 미들웨어는 실행되지 않는다. 응답으로 파일을 보내고 next를 호출하지 않기 때문이다.


### 6.2.3 body-parser

요청의 본문에 있는 데이터를 해석해서 req.body 객체로 만들어주는 미들웨어이다. 보통 폼 데이터나 AJAX요청의 데이터를 처리한다. 단 멀티 파트 데이터는 처리하지 못한다. 그 경우에는 뒤에나오는 multer모듈을 사용하자.

body-parser모듈은 다음과 같이 사용한다.

```js

app.use(express.json())
app.use(express.urlencoded({extended: false}))

```

Raw는 요청의 본문이 버퍼 데이터일 때 Text는 텍스트 데이터일 때 해석하는 미들웨어이다. 버퍼나 텍스트 요청을 처리할 필요가 있다면 body-parser를 설치한 후 다음과같이 추가한다.
```js

app.use(bodyParser.raw())
app.use(bodyParser.text())

```


JSON은 JSON형식으로 데이터를 전달하는 방식이고 URL-encoded는 주소형식으로 데이터를 보내는 방식이다. 폼 전송은 URL-encoded 방식을 주로 사용한다. urlencoded메서드를 보면 extended:false라는 옵션이 들어있다. 이 옵션이 false면 노드의 querystring모듈을 사용하여 쿼리스트링을 해석하고 true면 qs모듈을 사용하여 쿼리스트링을 해석한다. qs모듈은 내장모듈이 아니라 npm패키지 이며 querystring모듈의 기능을 좀더 확장한 모듈이다. 


### 6.2.4 cookie-parser


쿠키파서는 요청에동봉된 쿠키를 해석해req.cookies 객체로 만든다. 

```js
app.use(cookieParser(비밀키))
```
해석된 쿠키들은 req.cookies 객체에 들어간다. 예를 들어 name=hyunjin 쿠키를 보냈다면 req.cookies 는 {name: 'hyunjin'} 이된다. 유효기간이 지난 쿠키는 알아서 걸러낸다.
첫번째 인수로 비밀키를 넣어줄 수 있다. 서명된 쿠키가 있는 경우 제공한 비밀키를 통해 내 서버가 만든 쿠키임을 검증한다. 쿠키는 클라이언트에서 위조하기 쉬우므로 비밀 키를 통해 만들어낸 서명을 쿠키 값 뒤에 붙인다. 서명이 붙으면 쿠키가 name=hyunjin.sign 과 같은 모양이된다.

서명된 쿠키는 req.signedCookies객체에 들어있다.


```js
res.cookie('name', 'hyunjin', {
    expires: new Date(Date.now() + 900000),
    httpOnly: true,
    secure: true,
})

res.clearCookie('name', 'hyunjin', {httpOnly: true, secure:true})

```


쿠키를 지우려면 키와 값 외에 옵션도 정확히 일치해야 쿠키가 지워진다. 단 expires나 maxAge옵션은 일치할 필요가 없다.


옵션중에는 signed 라는 옵션이 있는데, 이를 true로 설정하면 쿠키뒤에 서명이 붙는다. 내 서버가 쿠키를 만들었다는 것을 검증하므로 대부분의 경우 옵션을 켜두는 것이 좋다. 서명을 위한 비밀 키는 cookieParse미들웨어에 인수로 넣은 process.env.COOKIE_SECRET이된다.

### 6.2.5 express-session

세션 관리용 미들웨어이다. 로그인 등의 이유로 세션을 구현하거나 특정 사용자를 위한 데이터를 임시적으로 저장해 둘 때 매우 유용하다. 세션은 사용자별로req.session 객체안에 유지된다.

```js
app.use(session({
    resave:false,
    svaeUninitailized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,

    },
    name: 'session-cookie'
}))


```

resave는 요청이 올 때 세션에 수정 사항이 생기지 않더라도 세션을 다시 저장할지 설정하는 것이고 saveUninitailized는 세션에 저장할 내역이 없더라도 처음부터 세션을 생서할지 설정하는 것이다.

express-session은 세션 관리시에 클라이언트에 쿠키를 보낸다.
세션 큐키가 이것이다. 안전하게 쿠키를 전송하려면 쿠키에 서명을 추가해야하고 쿠키를 서명하는데 secret값이 필요하다. cookie-parser의 secret과 같게 설정하는 것이 좋다.

store옵션도 있는데 메모리에 세션을 저장하도록되있는 것을 store 데이터베이스를 연결하여 세션을 유지하도록한다. 보통 레디스가 자주쓰인다.


s%3A의 뒷부분이 실제 암호화된 쿠키 내용이다. 앞에 s%3A가 붙은 경우 이쿠키가 express-session 미들웨어에 의해 암화화된것이라고 생각하면 된다.


next함수에 인수를 넣는다면 특별한 동작을 한다. route 라는 문자열을 넣으면 다음 라우터의 미들웨어로 바로 이동하고, 그외의 인수를 넣는다면 바로에러처리 미들웨어로 이동한다. 이때의 인수는 에러처리 미들웨어의 err매개변수가 된다. 라우터에서 에러가 발생할 때 에러를 next(err)를 통해 에러처리 미들웨어로 넘길수 있다.

next(err) 

(err,req,res,next) => {}

미들웨어간에 데이터를 전달하는 방법도있다. 세션을 사용한다면 req.session객체에 데이터를 넣어도되지만 세션이 유지되는 동안에 데이터도 계속 유지된다는 단점이있다. 만약 요청이 끝날 때까지만 데이터를 유지하고 싶다면  req객체에 데이터를 넣어두면 된다.

```js

app.use((req,res,next)=> {
    req.data = '데이터 넣기';
    next();
}, (req,res,next) => {
    console.log(req.data);
    next();
}) 
```

현재 요청이 처리되는 동안req.data를 통해 미들웨어간에 데이터를 공유할 수 있다. 새로운 요청이오면 req.data는 초기화된다.속성명이 꼭 data일 필요는 없지만 다른 미들웨어와 겹치지 않게 조심해야한다. 예를 들어서 속성명을 body로 한다면 req.body body-parser 미들웨어와 기능이 겹친다. 

> app.set과의 차이

app.set으로 익스프레스에서 데이터를 저장할 수 있다고 배웠다. app.get또는 app.set으로 언제 어디서든 데이터를 가져올수 있다. 하지만 app.set을 사용하지않고 req객체에 데이터를 넣어서 다음 미들웨어로 전달하는 이유가있다. app.set은 익스프레스에서 전역적으로 사용되므로 사용자 개개인의 값을 넣기에는 부적절하며 앱전체의 설정을 공유할 때 사용한다. req객체는 요청을 보낸 사용자 개개인에게 귀속되므로req객체를 통해 개인의 데이터를 전달하는 것이 좋다.

미들웨어를 사용할 때 유용한 패턴 한가지가 있다. 미들웨어 안에 미들웨어를 넣는 방식이다.

```js
app.use(morgan('dev'))
app.use(req,res,next)=> {
    morgan('dev')(req,res,next);
}
```


이 패턴이 유용한 이유는 기존 미들웨어의 기능을 확장할 수 있기 때문이다.

```js

app.use((req,res,next)=> {
    if (process.env.NODE_ENV === 'production') {
        morgan('combined')(req,res,next)
    }else {
        morgan('dev')(req,res,next)
    }
})
```

### 6.2.7 multer 
이미지 동영상등을 비롯한 여러가지 파일들을 멀티파트 형식으로 업로드할 때 사용하는 미들웨어이다. 멀티파트 형식이란 다음과같이 enctype이 multipart/form-data인 폼을 통해 업로드하는 데이터의 형식을 의미한다. multer함수의 인수로 설정을 넣는다. storage속성에는 어디에 어떤 이름으로 저장할지를 넣는다. destination 과 filename함수의 req매개변수에는 요청에 대한 정보가, file 객체에는 업로드한 파일에대한 정보가 있다. done 매개변수는 함수이다. 첫번째 인수에는 에러가 있다면 에러를 넣고 두번째 인수에는 실제 경로나 파일 이름을 넣어주면된다. req나 file데이터를 가공해서 done으로 넘기는 형식이다.

```js
const multer = require('multer')

const upload = multer({
    storage: multer.disStorage({
        destination(req,file,done) {
            done(null, 'uploads/')
        },
        filename(req, file, done){ 
            const ext = path.extanme(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext;

        }
    }),
    limits: {fileSize: 5 * 1024 * 1024}
})
```


여러 파일을 업로드하는 경우 multiple를 input 태그에 쓴다.

미들웨어는 single 대신 array 로 교체한다.
업로드 결과도req.file 대신 req.files 배열에 들어있다. 파일을 여러개 업로드하지만  input 태그나 폼 데이터의 키가 다른 경우에는 fields 미들웨어를 사용한다.

multer single 이미지 하나는 req.file 로 나머지 정보는 req.body로

multer array 이미지들은 req.files 로 나머지정보는 req.body로

multer fields 위랑같음

multer none 멀티파트로 보내고싶을때 씀 모든 정보를 req.body

## 6.3 Router 객체로 라우팅 분리하기 

next함수에 다음 라우터로 넘어가는 기능이있다. 바로 next('route') 이며, 라우터에 연결된 나머지 미들웨어를 건너 뛰고 싶을 때 사용한다.

라우팅매개변수의 라우트들은 일반 라우터 보다 뒤에위치해야한다.

app.js 에서 에러처리미들웨어 위에 넣어두 ㄴ미들웨어는 일치하는 라우터가 없을 때 404상태코드를 응답하는 역할을 한다. 미들웨어가 존재하지 않아도 익스프레스가 자체적으로 404에러를 처리해주기는 하지만 웬만하면 404응답 미들웨어와 에러처리 미들웨어를 연결해주는 것이 좋다.

```js

router.route('/abc')
.get((req,res)=> {res.send('GET /abc')})
.post((req,res) => {res.send('POST /abc')})
```



## 6.4 req, res객체에 관하여

익스프레스의 req,res 객체는 http모듈의 req,res객체를 확장한 것이다. 기존 http모듈의 메서드도 사용할 수 있고 익스프레스가 추가한 메서드나 속성을 사용할 수도 있다. 예를 들어 res.writeHead, res.write, res.end 메서드를 그대로 사용할 수 있으면서 res.send 나 res.sendFile 같은 메서드도 쓸 수 있다. 다만 익스프레스의 메서드가 워낙 편리하기에 기존http모듈의 메서드는 잘 쓰이지 않는다.

- req.app: req 객체를 통해 app 객체에 접근할 수 있다. req.app.get('port') 와 같은 식으로 사용할 수 있다.
- req.body:body-parser 미들웨어가 만드는 요청의 본문을 해석한 객체이다.
- req.cookies: cookie-parser 미들웨어가 만드는 요청의 쿠키를 해석한 객체이다.
- req.ip: 요청의 ip주소가 담겨있다.
- req.params: 라우트 매개변수에 대한 정보가 담긴 객체이다.
- req.query: 쿼리 스트링에 대한 정보가 담긴 객체이다.
- req.signedCookies 서명된 쿠키들은 여기
- req.get(헤더이름): 헤더의 값을 가져오고 싶을 때 사용하는 메서드이다.

res객체에대해 보자

- res.app: res.app처럼 res객체를 통해 app객체에 접근할 수 있다.
- res.cookie(키,값,옵션): 쿠키를 설정하는 메서드이다.
- res.clearCookie(키,값, 옵션): 쿠키를 제거하는 메서드이다.
- res.end(): 데이터없이 응답을 보낸다.
- res.json(JSON): JSON형식의 응답을 보낸다.
- res.redirect(주소): 리다이렉트할 주소와 함께 응답을 보낸다.
- res.render(뷰, 데이터): 템플릿엔진을 렌더링해서 응답할 때 사용하는 메서드이다.
- res.send(데이터): 데이터와 함께 응답을 보낸다. 데이터는 문자열일 수 있고 HTML일수 있으며 버퍼일수있고 객체나 배열일 수 있다.
- res.sendFile(경로): 경로에 위치한 파일을응답한다.
- res.set(헤더, 값): 응답의 헤더를 설정한다.
- res.status(코드): 응답시의 HTTP상태 코드를 지정한다.

res나 req 객체는 메서드 체이닝을 지원하는 경우가 많다.

## 6.5 템플릿 엔진 사용하기

템플릿 엔진은 자바스크립트를 사용해서 HTML을 렌더링 할수 있게 한다. 기존HTMl과의 문법이 살짝다를 수 있고 자바스크립트 문법이 들어있기도 하다.


### 6.5.1 퍼그 (제이드)

예쩐 이름인 제이드로 더 유명한 퍼그. 문법이간단하므로 코드의 양이 줄어든다. 루비를 ㅏㅅ용해봤다면 문법이 비슷해서 금방 적응하낟. 

views는 템플릿 파일들이 위치하는 폴더를 지정한 것이다.

res.render메서드가 이폴더 기준으로 템플릿 엔진을 찾아서 렌더링한다. res.render('index')라면 views/index.pug 를 렌더링한다. 

html과 다르게 자바스크립트 변수를 템플릿에 렌더링할 수 있다. res.render호출시 보내는 변수를 퍼그가 처리한다. 서버로부터 받은 변수는 다양한 방식으로 퍼그에서 사용할 수 있다. 변수를 텍스트로 사용하고 싶다면 태그 뒤에 = 를 붙인후 변수를 입력한다. 속성에도  = 을 붙인후 변수를 사용할 수 있다. 텍스트 중간에 변수를 넣으려면 #{변수}를 사용하면 된다. 그러면 변수가 그 자리에 들어간다. #{} 의 내부와  = 기호 뒷부분은 자바스크립트로 해석하므로 input 태그의 경우처럼 자바스크립트 구문을 써도 된다.

특수문자를 html엔티티라는 코드로 변환한다. 대표적인 html엔티티는 다음과같다.
- <:&lt;
- >:&gt;
- &: &amp;
- 띄어쓰기: &nbsp;
- ": &quot;
- ': &apos;


#### 6.5.1.5 include



### 6.5.3 에러처리 미들웨어

에러처리 미들웨어에서는 error 라는 템플릿 파일을 렌더링 한다. 렌더링 시 res.locals.message 와 res.locals.error 에 넣어준 값을 함께 렌더링한다.
에러 차리 미들웨어는 error 라는 템플릿 파일을 렌더링한다. 