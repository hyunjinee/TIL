# 웹팩이란?

![웹팩](https://miro.medium.com/max/639/1*HuwdpQuSFh9ogZfxOn53Mg.png)

webpack은 최신 프런트엔드 프레임워크에서 가장 많이 사용되는 모듈 번들러(Module Bundler)이다. 모듈 번들러란 웹 애플리케이션을 구성하는 자원(HTML, CSS, JS, Img)을 모두 각각의 모듈로 보고 이를 조합해서 병합된 하나의 결과물을 만드는 도구를 의미한다.

### 모듈이란?

모듈이란 프로그래밍 관점에서 특정 기능을 갖는 작은 코드 단위를 의미한다. 아래와 같은 코드가 모듈이다.

```javascript
//math.js
function sum(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

const pi = 3.14;

export { sum, substract, pi };
```

이처럼 성격이 비슷한 기능들을 하나의 의미 있는 파일로 관리하면 모듈이 된다.

### 웹팩에서의 모듈

웹팩에서 지칭하는 모듈의 개념은 자바스크립트의 모듈에만 국한되지 않고 웹 어플리케이션을 구성하는 모든 자원을 의미한다. 모든 파일 하나하나가 모듈!

### 모듈 번들링이란?

아래와 같이 웹어플리케이션을 구성하는 몇십 몇백개의 자원들을 하나의 파일로 병합, 압축해주는 동작이다. (빌드 = 번들링 = 변환)
![modulebundleing](https://joshua1988.github.io/webpack-guide/assets/img/webpack-bundling.e79747a1.png)

### 웹팩의 등장 배경

1. 파일 단위의 자바스크립트 모듈 관리의 필요성
2. 웹 개발 작업 자동화 도구(Web Task Manager)
3. 웹 어플리케이션의 빠른 로딩 속도와 높은 성능

### 파일 단위의 자바스크립트 모듈 관리

```html
<!-- index.html -->
<html>
  <head>
    <!-- ... -->
  </head>
  <body>
    <!-- ... -->
    <script src="./app.js"></script>
    <script src="./main.js"></script>
  </body>
</html>
```

```javascript
// app.js
var num = 10;
function getNum() {
  console.log(num);
}
// main.js
var num = 20;
function getNum() {
  console.log(num);
}
```

자바스크립트 변수 유효범위는 전역범위인데, 실제 어플리케이션을 개발 할때 위와 같은 문제점을 만나게 된다.
이러한 문제점은 실제로 복잡한 어플리케이션을 개발할때 발생한다.
파일 단위를 변수로 관리하고 싶은 욕구, 자바스크립트 모듈화에 대한 욕구를 예전까지는 AMD, Common.js 라이브러리 로 풀어왔다.

### 웹 개발 작업 자동화 도구

이전부터 프런트엔드 개발 업무를 할 때 가장 많이 반복하는 작업은 텍스트 편집기에서 코드를 수정하고 저장한 뒤 브라우저에서 새로 고침을 누르는 것이었습니다. 그래야 화면에 변경된 내용을 볼 수 있었죠.
이외에도 웹 서비스를 개발하고 웹 서버에 배포할 때 아래와 같은 작업들을 해야 했습니다.

HTML, CSS, JS 압축
이미지 압축
CSS 전처리기 변환

이러한 일들을 자동화 해주는 도구들이 필요했습니다. 그래서 Grunt와 Gulp 같은 도구들이 등장했습니다.

### 웹 어플리케이션 빠른 로딩 속도와 높은 성능

웹사이트의 로딩속도를 높이기 위한 노력중 대표적인 노력은 브라우저에서 서버로 요청하는 파일 숫자를 줄이는 것이였다. 이를 위해 앞에서 살펴본 웹 태스크 매니저를 이용해서 파일을 압축하고, 병합하는 작업을 진행하였다. 뿐만아니라 초기 페이지 로딩 속도를 높이기 위해 나중에 필요한 자원들은 나중에 요청하는 레이지 로딩(Lazy Loading)이 등장했다. 웹팩은 기본적으로 필요한 자원은 미리 로딩하는게 아니라 그때 그때 요청하자는 철학을 가지고 있다.

### 웹팩으로 해결하려는 문제?

1. 자바스크립트 변수 유효범위
2. 브라우저별 HTTP 요청 숫자의 제약
3. 사용하지 않는 코드의 관리
4. Dynamic Loading & Lazy Loading 미지원

### 자바스크립트 변수 유효 범위 문제

웹팩은 변수 유효 범위의 문제점을 ES6의 Modules 문법과 웹팩의 모듈 번들링으로 해결한다.

### 브라우저별 HTTP 요청 숫자의 제약

TCP 스펙에 따라 브라우저에서 한번에 서버로 보낼 수 있는 HTTP 요청 숫자는 제약되어있다. 따라서, HTTP 요청 숫자를 줄이는 것이 웹 애플리케이션의 성능을 높여줄 뿐 아니라 사용자가 사이트를 조작하는 시간을 당겨준다. (클라이언트가 서버에 HTTP요청을 보내기 위해서는 먼저 TCP/IP가 연결되어야 한다.)
웹팩을 이용해서 여러개의 파일을 합치면 위와 같은 브라우저별 HTTP 요청 숫자 제약을 피할 수 있다.

### Dynamic Loading & Lazy Loading 미지원

Require.js와 같은 라이브러리를 쓰지 않으면 동적으로 원하는 순간에 모듈을 로딩하는 것이 불가능 했습니다. 그러나 이젠 웹팩의 Code Splitting 기능을 이용하여 원하는 모듈을 원하는 타이밍에 로딩할 수 있습니다

### Hello Webpack

[practice01](https://github.com/HYUNJINE/Frontend/tree/master/webpack/practice/practice01)

### 웹팩의 4가지 주요속성

1. entry
2. output
3. loader
4. plugin

## Entry

entry 속성은 웹팩에서 웹 자원을 변환하기 위해 필요한 최초 진입점이자 자바스크립트 파일 경로이다.

```javascript
// webpack.config.js
module.exports = {
  entry: "./src/index.js",
};
```

위 코드는 웹팩을 실행했을 때, src 폴더 밑의 index.js 을 대상으로 웹팩이 빌드를 수행하는 코드이다.

### Entry 파일에는 어떤 내용이 들어가야 하나?

entry 속성에 지정된 파일에는 웹애플리케이션의 전반적인 구조와 내용이 담겨져 있어야 한다. 웹팩이 해당 파일을 가지고 웹 애플리케이션에서 사용되는 모듈들의 연관관계를 이해하고 분석하기 때문에 애플리케이션을 동작시킬 수 있는 내용들이 담겨져 있어야 한다.
예를 들어서 블로그 서비스를 웹팩으로 빌드한다고 했을 때 코드의 모양은 아래와 같다.

```javascript
// index.js
import LoginView from "./LoginView.js";
import HomeView from "./HomeView.js";
import PostView from "./PostView.js";

function initApp() {
  LoginView.init();
  HomeView.init();
  PostView.init();
}

initApp();
```

위 코드는 해당 서비스가 싱글 페이지 애플리케이션이라고 가정하고 작성한 코드입니다. 사용자의 로그인 화면, 로그인 후 진입하는 메인 화면, 그리고 게시글을 작성하는 화면 등 웹 서비스에 필요한 화면들이 모두 index.js 파일에서 불려져 사용되고 있기 때문에 웹팩을 실행하면 해당 파일들의 내용까지 해석하여 파일을 빌드해줄 것입니다.

![빌드예시](https://joshua1988.github.io/webpack-guide/assets/img/webpack-entry.90e26197.png)
위와같이 모듈간의 의존관계가 생기는 구조를 디펜던시 그래프(Dependency Graph) 라고 한다.

### Entry 유형

엔트리 포인트는 한개 또는 여러개가 될 수 있다.

```javascript
entry: {
  login: './src/LoginView.js',
  main: './src/MainView.js'
}
```

위와 같이 엔트리 포인트를 분리하는 경우는 싱글페이지 애플리케이션이 아닌 특정 페이지로 진입했을 때 서버에서 해당 정보를 내려주는 형태의 멀티 페이지 애플리케이션에 적합하다.

## Output

output 속성은 웹팩을 돌리고 난 결과물의 파일 경로를 의미한다.

```javascript
// webpack.config.js
module.exports = {
  output: {
    filename: "bundle.js",
  },
};
```

앞에서 entry 속성과는 다르게 객체 형태로 옵션을 추가해야한다.

### Output 속성 옵션 형태

최소한 filename 은 지정해줘야 하며, 일반적으로 path 속성을 함께 정의 한다.

```javascript
// webpack.config.js
var path = require("path");

module.exports = {
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
  },
};
```

filename 속성은 웹팩으로 빌드한 파일의 이름을 의미하고, path 속성은 해당 파일의 경로를 의미한다. 그리고path 속성에 사용된 path.resolve() 코드는 인자로 넘어온 경로들을 조합하여 유효한 파일 경로를 만들어 주는 Node.js API 이다.

### Output 파일 이름 옵션

filename 에는 여러가지 옵션을 넣을 수 있다.

1. 결과 파일 이름에 entry 속성을 포함하는 옵션

   ```javascript
   module.exports = {
     output: {
       filename: "[name].bundle.js",
     },
   };
   ```

2. 결과 파일 이름에 웹팩 내부적으로 사용하는 모듈 ID를 포함하는 옵션
   ```javascript
   module.exports = {
     output: {
       filename: "[id].bundle.js",
     },
   };
   ```
3. 매 빌드시 마다 고유 해시 값을 붙이는 옵션
   ```javascript
   module.exports = {
     output: {
       filename: "[name].[hash].bundle.js",
     },
   };
   ```
4. 웹팩의 각 모듈 내용을 기준으로 생성되 해시 값을 붙이는 옵션
   ```javascript
   module.exports = {
     output: {
       filename: "[chunkhash].bundle.js",
     },
   };
   ```

## Loader

로더(Loader) 는 웹팩이 웹애플리케이션을 해석할 때 자바스크립트 파일이 아닌 웹 자원(HTML,CSS,Images,폰트 등)들을 변환할 수 있도록 도와주는 속성이다. 엔트리나 아웃풋 속성과는 다르게 module이라는 이름을 사용한다.

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [],
  },
};
```

### Loader가 필요한 이유

```javascript
// app.js
import "./common.css";

console.log("css loaded");
```

```css
/* common.css */
p {
  color: blue;
}
```

```javascript
// webpack.config.js
module.exports = {
  entry: "./app.js",
  output: {
    filename: "bundle.js",
  },
};
```

위 파일을 웹팩으로 빌드시 나오는 에러
![에러](https://joshua1988.github.io/webpack-guide/assets/img/css-loading-error.a03a18eb.png)
이 메세지는 app.js 에서 import 한 common.css 파일을 해석하기 위해 적절한 로더를 추가해 달라는 것이다.

### CSS Loader 적용하기

```code
npm i css-loader -D
```

```javascript
// webpack.config.js
module.exports = {
  entry: "./app.js",
  output: {
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["css-loader"],
      },
    ],
  },
};
```

test: 로더를 적용할 파일 유형(일반적으로 정규 표현식 사용)
use: 해당 파일에 적용할 로더의 이름
위코드는 해당 프로젝트의 모든 CSS 파일에 대해서 CSS 로더를 적용시키는 코드이다. 적용후 빌드시 정상적으로 실행된다.

### 자주 사용되는 로더의 종류

- Babel Loader
- Sass Loader
- File Loader
- Vue Loader
- TS Loader
  로더를 여러개 사용하는 경우 아래와 같이 rules 배열에 로더 옵션을 추가한다.

```javascript
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: "css-loader" },
      { test: /\.ts$/, use: "ts-loader" },
      // ...
    ],
  },
};
```

### 로더 적용 순서

특정 파일에 대해 여러 개의 로더를 사용하는 경우 로더가 적용되는 순서에 주의해야한다. 로더는 기본적으로 <em>오른쪽에서 왼쪽</em>순으로 적용된다.
CSS의 확장문법인 SCSS파일에 로더를 적용하는 예시

```javascript
module: {
  rules: [
    {
      test: /\.scss$/,
      use: ["css-loader", "sass-loader"],
    },
  ];
}
```

위 코드는 scss파일에 대해 먼저 Sass 로더로 전처리(scss파일을 css파일로 변환)를 한다음에 웹팩에서 CSS 파일을 인식할 수 있게 CSS로더를 적용하는 코드이다.
만약 웹팩으로 빌드한 자원으로 실행했을 때 해당 CSS 파일이 웹 어플리케이션에 인라인 스타일 태그로 추가되는 것을 원한다면 아래와 같이 style 로더도 추가할 수 있다.

```javascript
{
  test: /\.scss$/,
  use: ['style-loader', 'css-loader', 'sass-loader']
}
```

그리고 위와 같이 배열로 입력하는 대신 아래와 같이 옵션을 포함한 형태로도 입력가능

```javascript
module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        { loader: "style-loader" },
        {
          loader: "css-loader",
          options: { modules: true },
        },
        { loader: "sass-loader" },
      ],
    },
  ];
}
```

## Plugin

플러그인은 웹팩의 기본적인 동작에 추가적인 기능을 제공하는 속성이다. 로더랑 비교하면 로더는 파일을 해석하고 변환하는 과정에 관여하는 반면, 플러그인은 해당 결과물을 바꾸는 역할을 한다.
선언방법은 아래와같다.

```javascript
// webpack.config.js
module.exports = {
  plugins: [],
};
```

플러그인의 배열에는 생성자 함수로 생성한 객체 인스턴스만 추가 될 수 있다.

```javascript
// webpack.config.js
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  plugins: [new HtmlWebpackPlugin(), new webpack.ProgressPlugin()],
};
```

HtmlWebpackPlugin: 웹팩으로 빌드한 결과물로 HTML파일을 생성해주는 플러그인
ProgressPlugin: 웹팩의 빌드 진행율을 표시해주는 플러그인

### 자주 사용하는 플러그인

- split-chunks-plugin
- clean-webpack-plugin
- image-webpack-loader
- webpack-bundle-analyzer-plugin

## Concepts Review

![리뷰](https://joshua1988.github.io/webpack-guide/assets/img/diagram.519da03f.png)

1. Entry 속성은 웹팩을 실행할 대상 파일.진입점
2. Output 속성은 웹팩의 결과물에 대한 정보를 입력하는 속성.일반적으로 filename 과 path를 정의
3. Loader 속성은 CSS, 이미지와 같은 비 자바스크립트 파일을 웹팩이 인식할 수 있게 추가하는 속성, 로더는 오른쪽에서 왼쪽 순으로 적용
4. Plugin 속성은 웹팩으로 변환한 파일에 추가적인 기능을 더하고 싶을 때 사용하는 속성, 웹팩 변환 과정 전반에 대한 제어권을 가지고 있음
   위 속성 이외에도 resolve, devServer, devtool 속성도 있다.

## 웹팩 데브 서버

웹팩 데브 서버로 빌드한 결과물이 파일 탐색기에서 보이진 않지만 정상적으로 어플리케이션이 로딩되어 돌아가는 것에 주의합니다.

### Webpack Dev Server

웹팩 데브 서버는 웹 어플리케이션을 개발하는 과정에서 유용하게쓰이는 도구이다. 웹팩의 빌드 대상 파일이 변경 되었을 때 매번 웹팩 명령어를 실행하지 않아도 코드만 변경하고 저장하면 웹팩으로 빌드한 후 브라우저를 새로고침 해준다. 매번 명령어를 치는 시간과 브라우저를 새로 고침하는 시간 뿐 아니라 웹팩 빌드 시간 또한 줄여주기 때문에 웹팩 기반의 웹 어플리케이션 개발에 필수로 사용된다.

### 웹팩 데브 서버의 특징

```javascript
"scripts": {
  "dev": "webpack serve",
  "build": "webpack"
}
```

웹팩 데브 서버를 실행하여 빌드를 하는 경우에는 빌드한 결과물이 파일 탐색기나 프로젝트 폴더에서 보이지 않는다. 좀더 구체적으로 이야기하면, 웹팩 데브서버로 빌드한 결과물은 메모리에 저장되고, 파일로는 생성되지 않기때문에 컴퓨터 내부적으로 접근할 수 있지만 사람이 직접 눈으로 보고 파일을 조작할 수는 없다. 따라서, 웹팩 데브서버는 개발할 때만 사용하다가 개발이 완료되면 웹팩 명령어를 이용해서 결과물을 파일로 생성해야 한다.
컴퓨터 구조 관점에서 파일 입출력보다 메모리 입출력이 더 빠르고 컴퓨터 자원이 덜 소모된다.

### 프록시 설정

```javascript
// webpack.config.js
module.exports = {
  devServer: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
};
```

위와 같이 설정하면 로컬 웹팩 데브 서버에서 발생하는 API요청에 변화가 생긴다. 다음은 프록시를 쓰지 않았을 때의 기본적인 웹팩 데브서버와 API서버의 통신 구조이다.
![구조](https://joshua1988.github.io/webpack-guide/assets/img/cors-error.e6e73b68.png)
CORS: 다른 도메인 간에는 자바스크립트로 자원 요청을 할 수 없다.
뷰, 리액트 같은 프런트엔드 프레임워크를 쓰면 개발 편의상 로컬에 웹팩 데브 서버를 띄워놓고 개발하는 경우가 많은데, 이 때 이러한 문제를 해결하기 위해 아래와 같이 프록시 속성을 설정하면 서버에서 해당 요청을 받아준다.

```javascript
module.exports = {
  devServer: {
    proxy: {
      "/api": "domain.com",
    },
  },
};
```

![구조](https://joshua1988.github.io/webpack-guide/assets/img/proxy.dce9d87c.png)
CORS가 브라우저 보안과 관련있기 때문에 브라우저에서 벗어나 서버에서 서버로 요청한다.실제로 브라우저에서는 localhost:8080/api/login 으로 요청했지만 중간에 프록시 서버의 활약으로 domain.com 서버에서는 같은 도메인에서 온 요청으로 인식하여 CORS 에러가 나지 않습니다.
위 프록시 설정은 최대한 간단히 설명하기 위해 옵션을 하나 뺐습니다. 위와 같이 도메인 이름이 IP 주소가 아니라 가상 이름(domain.com)으로 되어 있는 경우 아래 옵션을 추가해 주셔야 합니다.

```javascript
module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "domain.com",
        changeOrigin: true,
      },
    },
  },
};
```

## HMR (Hot Module Replacement)

HMR 은 브라우저를 새로 고치지 않아도 웹팩으로 빌드한 결과물이 웹 애플리케이션에 실시간으로 반영될 수 있게 도와주는 설정이다. 브라우저 새로 고침을 위한 LiveReload 대신에 사용할 수 있으며, 웹팩 데브 서버와 함께 사용할 수 있다.

### HMR 설정하기

리액트,앵귤러, 뷰와 같이 대부분의 프레임워크에서 이미 HMR을 사용할 수 있는 로더들을 지원하고 있지만 만약 개별적으로 설정하고 싶다면 다음과같다.

```javascript
module.exports = {
  devServer: {
    hot: true,
  },
};
```

데브 서버에 옵션으로 hot: true 를 추가하고 자바스크립트나 css 스타일시트를 변경하면 해당 모듈이 바로 업데이트가 된다. 그리고 화면에서는 브라우저가 다시 로딩되지 않고도 변경된 내용을 확인 할 수 있다.

## 소스 맵

소스 맵이란 배포용으로 빌드한 파일과 원본 파일을 서로 연결시켜주는 기능입니다. 보통 서버에 배포할 때 성능 최적화를 위해 HTML, CSS, JS와 같은 웹 자원들을 압축한다. 그런데 만약 압축하여 배포한 파일에서 에러가 난다면 어떻게 디버깅 할까?
정답은 바로 소스맵을 이용해 배포용 파일의 특정 부분이 원본 소스의 어떤 부분인지 확인하는 것이다. 이러한 편의성을 제공하는 것이 소스맵이다.

### 소스 맵 설정하기

```javascript
// webpack.config.js
module.exports = {
  devtool: "cheap-eval-source-map",
};
```

## 웹팩 실행 모드 -mode

웹팩 버전 4 부터 mode 라는 개념이 추가되었다.

```javascript
module.exports = {
  mode: "none",
  entry: "",
  // ...
};
```

웹팩 설정을 정의 할 때 위와 같이 mode라는 속성을 정의하면 웹팩의 실행 모드가 설정된다.

- none: 모드 설정 안함
- development: 개발 모드
- production: 배포 모드
  각 실행 모드에 따라 웹팩의 결과물 모습이 달라진다. 개발모드 경우에는 개발자들이 좀 더 보기 편하게 웹팩 로그나 결과물이 보여지고, 배포 모드인 경우에는 성능 최적화를 위해 기본적인 파일 압축 등의 빌드 과정이 추가된다.
  모드의 기본 값을 설정하지 않으면 production 모드로 자동 설정된다.

### 실행 모드에 따라 웹팩 설정 달리하기

- 개발 할 때 사용할 웹팩 설정
- 개발이 끝나고 배포할 때 사용할 웹팩 설정
  웹팩 설정 파일이 한개인 상태에서 실행모드에 따라 특정 설정을 적용하는 방법

```javascript
// webpack.config.js
module.exports = (env) => {
  let entryPath = env.mode === "production" ? "./public/index.js" : "./src/index.js";

  return {
    entry: entryPath,
    output: {},
    // ...
  };
};
```

```json
// package.json
{
  "build": "webpack",
  "development": "npm run build -- --env.mode=development",
  "production": "npm run build -- --env.mode=production"
}
```

위 코드를 보면 먼저 웹팩 설정 파일 방식은 객체에서 함수 형식으로 바뀌었다.

```javascript
// 기존
module.exports = {};
// 현재
module.exports = () => {};
```

그리고 함수에 넘겨준 env인자는 환경변수를 의미하며 웹팩을 실행할 때 실행 옵션으로 넘겨줄 수 있다.
webpack --env.a=10

## Webpack Merge

웹팩 머지는 단어 그대로 여러 개의 웹팩 설정 파일을 하나로 병합해주는 라이브러리이다. 실행 모드에 따라 웹팩 설정하기에서도 언급했지만 일반적으로 웹 애플리케이션을 제작할 때는 웹팩 설정을 개발용과 배포용으로 나누어 적용한다.
실행모드에 따라 조건 문으로 설정을 구분할 수 있으나 실제로 파일을 아예 나눠놓는게 더 권장하는 방식이다. 웹팩 머지는 이러한 상황에서 더 빛을 발휘할 수 있다.

### 웹팩 설정 파일 구분 전략

웹팩 머지를 효율적으로 사용하는 방법은 개발용과 배포용 설정 파일에서 공통으로 쓰이는 부분을 먼저 분리하는 것이다. 파일 체계는 아래와 같은 형식으로 구성한다.

```sh
webpack.common.js
webpack.dev.js
webpack.prod.js
```

각 파일의 모습은 다음과 같다.

```javascript
// webpack.common.js
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
  },
  plugins: [new CleanWebpackPlugin(), new HtmlWebpackPlugin()],
};
```

공통 설정 파일에는 엔트리,아웃풋, 플러그인과같이 실행 모드에 관계없이 항상 들어가야 하는 코드를 추가한다.

```javascript
// webpack.dev.js
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: { contentBase: "./dist" },
});
```

개발용 설정 파일에는 개발자 도구나 웹팩 데브 서버와 같은 설정을 추가한다. 그리고 webpack-merge 라이브러리를 설치 및 로딩하고 나서 웹팩 공통 설정 파일인 webpack.common.js 파일을 로딩해서 같이 병합해준다.

```javascript
// webpack.prod.js
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
});
```

배포용 설정 파일에서는 배포하기 전 웹 리소스 최적화를 위한 설정들을 추가해준다.

참고문헌
[웹팩 핸드북](https://joshua1988.github.io/webpack-guide/)
