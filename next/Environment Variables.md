# 환경 변수

## Loading Environment Variables

Next.js는 `.env.local`에 저장한 환경변수를 `process.env`로 읽어 올 수 있다.

```
# .env.local
DB_HOST = localhost
DB_USER = myuser
DB_PASS = mypassword
```

환경변수는 빌드 타임에 평가된다. `process.env`는 표준 JavaScript 객체가 아니므로 비구조화할당을 통해 가져올 수 없다. 무조건 `process.env.PUBLICK_KEY`와 같은 방법을 사용해야한다.

흥미로운 방법은 Next는 `$var`을 통해 환경 변수를 재사용할 수 있다는 것이다. 예제는 아래와 같다.

```
# .env
HOSTNAME=localhost
PORT=8080
HOST=http://$HOSTNAME:$PORT
```

만약 `$`를 실제 값으로 사용하고 싶으면 다음과 같이 escape 한다.

```
# .env
A=abc

# becomes "preabc"
WRONG=pre$A

# becomes "pre$A"
CORRECT=pre\$A
```

## Exposing Environment Variables to the Browser

기본적으로 환경 변수는 Node.js 환경에서만 사용가능하다. 이 뜻은 브라우저에 환경변수가 노출되지 않음을 의미한다.

브라우저에 환경 변수를 노출하기 위해서는 prefix로 `NEXT_PUBLIC`을 붙여야한다. 예를 들어 다음과 같다.

```
NEXT_PUBLIC_ANALYTICS_ID=abcdefghijk
```

이렇게 환경변수를 선언하면 `process.env.NEXT_PUBLIC_ANALYTICS_ID`를 Node.js 환경에 자동적으로 로드한다.
이 값은 JavaSCript에 인라인되어서 브라우저에게 전송된다. `NEXT_PUBLIC`을 붙였기 때문이다.

```js
// pages/index.js
import setupAnalyticsService from "../lib/my-analytics-service"

// 'NEXT_PUBLIC_ANALYTICS_ID' can be used here as it's prefixed by 'NEXT_PUBLIC_'.
// It will be transformed at build time to `setupAnalyticsService('abcdefghijk')`.
setupAnalyticsService(process.env.NEXT_PUBLIC_ANALYTICS_ID)

function HomePage() {
  return <h1>Hello World</h1>
}

export default HomePage
```

Note that dynamic lookups will not be inlined, such as:

```js
// This will NOT be inlined, because it uses a variable
const varName = "NEXT_PUBLIC_ANALYTICS_ID"
setupAnalyticsService(process.env[varName])

// This will NOT be inlined, because it uses a variable
const env = process.env
setupAnalyticsService(env.NEXT_PUBLIC_ANALYTICS_ID)
```

## Default Environment Variables

일반적으로 하나의 `.env.local` 파일만 필요로한다. 그러나 때때로 개발 또는 프로덕션 환경에 대한 일부 기본값을 추가하고 싶을 수 있다.

`.env`(all environments), `.env.development`(development environment), `.env.production`(production environment)

`.env.local`는 항상 기본 세팅을 오버라이딩한다.

> `.env.`, `.env.devleopment`, `.env.production`는 git repository에 올려져야한다. (기본 값들 정의) 하지만 `.env.local`은 `.gitignore`에 추가해야한다. `.env.local`은 시크릿이 저장될 수 있는 공간이다.

## Test Environment Variables

개발환경, 프로덕션 환경과 다르게 테스트 환경도 존재한다. `.env.test` 파일을 만든다.
이렇게하면 Next는 `.env.development`와 `.env.production`파일을 로딩하지 않는다.

이 방법은 `jest`나 `cypress`를 사용할 때 사용한다. 테스트의 기본값은 `NODE_ENV`를 `test`로 세팅한다. 보통 테스트 도구가 자동으로 해결해주므로 수동으로 설정할 필요가 없다.

테스트 환경과 개발 및 프로덕션 사이에는 약간의 차이가 존재한다. 테스트가 모든 사람에게 동일한 결과를 생성할 것으로 예상되기 때문에 .env.local은 로드되지 않는다.

> Note: similar to Default Environment Variables, .env.test file should be included in your repository, but .env.test.local shouldn't, as .env\*.local are intended to be ignored through .gitignore.

단위 테스트를 실행하는 동안 @next/env 패키지의 loadEnvConfig 함수를 활용하여 Next.js와 동일한 방식으로 환경 변수를 로드할 수 있습니다.

```js
// The below can be used in a Jest global setup file or similar for your testing set-up
import { loadEnvConfig } from "@next/env"

export default async () => {
  const projectDir = process.cwd()
  loadEnvConfig(projectDir)
}
```

## Environment Variable Load Order

Environment variables are looked up in the following places, in order, stopping once the variable is found.

1. `process.env`
2. `.env.$(NODE_ENV).local`
3. `.env.local` (Not checked when `NODE_ENV` is `test`)
4. `.env.$(NODE_ENV)`
5. `.env`

> Note: The allowed values for NODE_ENV are production, development and test.
