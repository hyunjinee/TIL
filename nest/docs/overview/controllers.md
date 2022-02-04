# Controllers

컨트롤러는 수신 요청을 처리하고 클라이언트에 응답을 반환하는 역할을 합니다.

컨트롤러의 목적은 어플리케이션에 대한 특정 요청을 수신하는 것 입니다. 라우팅 메커니즘은 어떤 컨트롤러가 어떤 요청을 수신하는지 제어합니다. 종종 각 컨트롤러에는 둘 이상의 경로가 있으며 서로 다른 경로가 서로 다른 작업을 수행할 수 있습니다.

기본 컨트롤러를 만들기 위해 클래스와 decorators를 사용합니다. 데코레이터는 클래스를 필수 메타데이터와 연결하고 Nest가 라우팅 맵을 만들 수 있도록 합니다.

## Routing

@Controller()는 기본 컨트롤러를 정의하는데 사용됩니다. 우리는 cats에 대한 선택적 라우팅 경로를 지정합니다. 접두어 경로를 지정함으로써 연관된 라우터들을 그룹화하고 반복되는 코드를 줄여줍니다. 예를 들어, /customers 아래의 고객 엔티티와의 상호작용을 관리하는 경로 집합을 그룹화할 수 있습니다. 이 경우 파일의 각 경로에 대해 경로의 해당 부분을 반복할 필요가 없도록 @Controller() 장식기에 경로 접두사 customers을 지정할 수 있습니다.

```ts
import { Controller, Get } from "@nestjs/common";

@Controller("cats")
export class CatsController {
  @Get()
  findAll(): string {
    return "This action returns all cats";
  }
}
```

:::tip
CLI로 컨트롤러를 만들기 위해서는 `nest g controller cats` 명령어를 사용합니다.
:::

findAll() 메서드 앞에있는 `@Get()` 데코레이터는 Nest에게 HTTP 요청에 대한 특정 엔드포인트에 대한 핸들러를 작성하도록 합니다. 엔드포인트는 HTTP 요청 메서드 (이 경우 GET)의 라우팅 경로와 일치합니다. 라우팅 경로는 뭘까요? 핸들러에 대한 라우팅 경로는 컨트롤러에 대해 선언된 (옵션) 접두사와 메서드의 데코레이터에 지정된 경로를 연결하여 결정합니다. 모든 경로(`cats`)에 대한 접두사를 선언했고 데코레이터에 경로 정보를 추가하지 않았으므로 Nest는 `GET /cats` 요청을 이 핸들러에 매핑합니다. 언급한 대로 경로에는 선택적 컨트롤러 경로 접두사와 요청 메서드 데코레이터에 선언된 경로 문자열이 모두 포함됩니다. 예를 들어서 데코레이터 `@Get('profile')`과 결합된 `customers`의 경로 접두사는 `GET /customers/profile`과 같은 요청에 대한 매핑을 생성합니다.

위의 우리의 예제에서 `GET`요청이 이 엔드포인트에 날라오면, Nest 요청을 우리가 정의한 `findAll()`이라는 메서드로 전달합니다. 여기서 정의한 메서드 이름은 임의입니다. 우리는 분명히 경로를 바인딩할 메서드를 선언해야 하는데, Nest는 선택한 메서드 이름에 의미를 부여하지 않습니다.

이 메서드는 200 상태코드와 연관된 응답을 반환할 것입니다. (여기서는 문자열) 왜 이런 일이 일어날까요? 설명하려면, 우리는 Nest가 응답을 하기위해 두가지 다른 옵션을 사용한다는 개념을 소개하겠습니다.

- Standard (recommended) : 이 내장 방식을 사용하면 요청 핸들러가 자바스크립트 객체나 배열을 반환할 때 자동으로 JSON에 직렬화됩니다. 그러나 JavaScript원시 유형 (예: 문자열, 숫자, 불리언)을 반환할 때 네스트는 직렬화를 시도하지 않고 값만 전송합니다. 따라서 응답 처리가 간단합니다. 값을 반환하기만 하면 네스트가 나머지를 처리할 수 있습니다. 또한 201을 사용하는 POST 요청을 제외하고 응답의 상태 코드는 항상 기본적으로 200입니다. 우리는 `@HttpCode(...)` 데코레이터를 사용하여 응답 상태 코드를 지정할 수 있습니다.
- Library Specific: 메서드 핸들러 시그니처(예: findAll(@Res() response)에서 `@Res()` 데코레이터를 사용하여 주입할 수 있는 라이브러리별(예: Express) 응답 개체를 사용할 수 있습니다. 이 방법을 사용하면 해당 객체에 의해 노출된 네이티브 응답 처리 방법을 사용할 수 있습니다. 예를 들어서 Express에서는 `response.status(200).send()` 요런식으로 표현합니다.

:::warning
Nest는 핸들러가 `@Res()` 또는 `@Nest()`를 사용하는지 알아챕니다. (이는 Library-Specific옵션을 사용했다는 것을 알 수 있습니다.) 만약 두개의 접근이 같은 상황에 이루어진다면, 하나의 경로에 대한 표준 접근은 자동적으로 차단되고 생각한대로 되지 않을 것 입니다. 두가지의 접근 방법을 동시에 활용하고 싶다면 (예: 프레임워크의 나머지 부분은 납두고, 응답객체를 set cookies/headers를 적용하는데만 사용하는 경우) 여러분들은 `passthrough` 옵션을 `@Res({ passthrough: true })` 설정한 후 사용하면 됩니다.
:::

## Request object

핸들러는 종종 클라이언트 요청 세부 정보에 엑세스해야합니다. Nest는 기본 플랫폼의 요청 객체에 대한 엑세스를 제공합니다. 우리는 핸들러의 시그니처에 `@Req()` 데코레이터를 추가하여 Nest에 주입하도록 지시함으로써 요청 객체에 접근할 수 있습니다.

```ts
import { Controller, Get, Req } from "@nestjs/common";
import { Request } from "express";

@Controller("cats")
export class CatsController {
  @Get()
  findAll(@Req() request: Request): string {
    return "This action returns all cats";
  }
}
```

:::tip
Express의 타입을 사용하려면 `@types/express` 패키지를 설치해야합니다.
:::

요청 객체는 HTTP 요청에 대한 속성을 표현합니다.(query string, parameters, HTTP headers, body 등) 많은 경우에 이 속성들을 수동적으로 가져오는 것은 필요하지 않습니다. 우리는 `@Body()`, `@Query(`와 같은 데코레이터를 사용해서 속성에 접근할 수 있습니다.

HTTP 플랫폼 (Express, Fastify)의 타입의 양립가능성을 위해, Nest는 `@Res()`, `@Response` 데코레이터를 제공합니다. `@Res()`는 `@Response()`의 별칭입니다. 이 둘은 모두 내재하는 native platform의 `response`객체의 인터페이스를 노출합니다. 이 데코레이터를 사용할 때 이점을 얻기 위해서는 type들을 설치 및 import 해야합니다. 메서드 핸들러에서 `@Res`,`@Response`를 주입할 때 해당 핸들러의 라이브러리별 모드로 네스트를 전환하고 응답을 관리해야합니다. 이 작업을 수행할 때 응답 개체(예: res.json(...)또는 res.send(...))를 호출하여 일종의 응답을 보내야합니다. 그렇지 않으면 HTTP server는 계속 기다립니다.

## Resources

앞의 예에서 우리는 고양이를 가져오기위한 endpoint를 정의했습니다. 우리는 일반적으로 새로운 레코드를 생성하는 엔드포인트를 제공하고자 합니다. 이를 위해 POST 핸들러를 만들겠습니다.

```ts
import { Controller, Get, Post } from "@nestjs/common";

@Controller("cats")
export class CatsController {
  @Post()
  create(): string {
    return "This action adds a new cat";
  }

  @Get()
  findAll(): string {
    return "This action returns all cats";
  }
}
```

Nest는 standard HTTP 메서드에 대한 모든 데코레이터를 제공합니다. `@Get()`, `@Post()`, `@Delete()`, `Patch()`, `@Options()`, `@Head()`. 추가로 `@All`은 모든 메서드를 핸들링 할 수 있는 endpoint를 정의합니다.

## Route wildcards

패턴에 기반한 경로는 잘 지원됩니다. 예를들어서 `*(asterisk)`는 와일드 카드로 쓰이고, 어떠한 문자와도 일치합니다.

```ts
@Get('ab*cd')
findAll() {
  return 'This route uses a wildcard';
}
```

위의 `ab*cd` 경로는 `abcd` `ab_cd` `abecd`등등 어떠한 것과도 일치합니다.

## Status code

언급했듯이, 응답 코드는 항상 200 입니다. 단 POST요청은 201입니다. 우리들은 이 응답메시지를 `@HttpCode(...)`를 사용하여 핸들러 단에서 쉽게 바꿀 수 있습니다.

```typescript
@Post()
@HttpCode(204)
create() {
  return 'This action adds a new cat';
}
```

가끔, 여러분의 상태코드가 정적이지 않고 여러가지 요인으로 인해 바뀔 수 있습니다. 이러한 경우라면, 여러분은 library-specific 응답객체(injecting useing `@Res()`)를 사용하여 응답코드를 직접 설정 할 수 있습니다.(혹은 에러가 발생했을 때 예외를 던질 수 있습니다.)

## Headers

커스텀 응답 header를 표시하기 위해, 여러분은 `@Header()` 데코레이터 또는 library-specific 응답 객체를 사용할 수 있습니다.(`res.header()`)

```typescript
@Post()
@Header('Cache-Control', 'none')
create() {
  return 'This action adds a new cat';
}
```

## Redirection

구체적인 URL로 redirect 시키기위해, 여러분은 `@Redirect()` 데코레이터 또는 library-specific response object(`res.redirect()`)를 사용할 수 있습니다.

`@Redicrect()` 는 두개의 인자를 받습니다. `url`, `statusCode` 입니다. 두개다 선택적 인자이고, 상태 코드의 기본 값은 `302`(`Found`)입니다.

```typescript
@Get()
@Redirect('https://nestjs.com', 301)
```

가끔 여러분은 HTTP status code를 정의하고 싶을 수도 있습니다. 또는 redirect URL을 다이나믹하게 만들고 싶을 수도 있습니다. 이럴때는 아래와 같은 객체를 라우트 핸들러 메서드에서 리턴하면 됩니다.

```typescript
{
  "url": string,
  "statusCode": number
}
```

리턴한 값은 `@Redirect()`에서 전달된 인자를 덮어씁니다. 아래는 예시입니다.

```typescript
@Get('docs')
@Redirect('https://docs.nestjs.com', 302)
getDocs(@Query('version') version) {
  if (version && version === '5') {
    return { url: 'https://docs.nestjs.com/v5/' };
  }
}
```

## Route parameters

동적 데이터를 요청의 일부로 받아들여야 하는 경우 (예: ID가 1인 cat를 가져오려면 GET /cats/1)정적 경로가 있는 경로는 작동하지 않습니다. 인자가 있는 경로를 정의하기 위해 우리는 경로에 경로 파라미터 토큰을 추가하여 요청 URL의 해당 위치에서 동적 값을 캡처할 수 있습니다. 아래 예제는 `@Get()`데코레이터 안에 있는 경로 파라미터 토큰을 보여줍니다. 경로 파라미터는 이러한 방식으로 선언되고 `@Param()` 데코레이터를 사용해서 접근할 수 있습니다. 이 데코레이터는 메서드 시그니처에 추가 해 주어야 합니다.

```typescript
@Get(':id')
findOne(@Param() params): string {
  console.log(params.id);
  return `This action returns a #${params.id} cat`;
}
```

`@Param()`은 메서드 파라미터를 decorate하는데 사용되며, (`params` in the example above) 경로 매개변수를 메서드 본문 내부의 장식된 메서드 매개변수의 속성으로 사용할 수 있도록 합니다. 위의 코드에서 봤듯이, 우리는 `id` 파라미터에 `params.id`를 통해서 접근 할 수 있습니다. 여러분은 또한, 특정한 파라미터 토큰을 데코레이터에 전달하고, 경로 매개변수를 메서드의 바디에서 직접적으로 참조할 수 있습니다.

```typescript
@Get(':id')
findOne(@Param('id') id: string): string {
  return `This action returns a #${id} cat`;
}

```

## Sub-Domain Routing

`@Controller` 데코레이터는 수신 요청의 HTTP 호스트가 특정 값과 일치하도록 `host`옵션을 선택할 수 있습니다.

```typescript
@Controller({ host: "admin.example.com" })
export class AdminController {
  @Get()
  index(): string {
    return "Admin page";
  }
}
```

:::warning
Fastify는 중첩된 라우터에 대한 지원이 없으므로 하위 도메인 라우팅을 사용할 때 (기본값) Express 어댑터를 대신 사용해야 합니다.
:::

라우팅 경로와 동일하게, `hosts` 옵션은 토큰을 사용해서 호스트 이름의 해당 위치에서 동적 값을 캡처할 수 있습니다. 아래 `@Controller()` 데코레이터 예제의 호스트 매개변수 토큰은 이러한 사용을 보여줍니다. 이렇게 선언된 호스트 매개변수는 메서드 시그니처에 추가해야하는 @HostParam() 데코레이터를 사용하여 엑세스 할 수 있습니다.

```typescript
@Controller({ host: ":account.example.com" })
export class AccountController {
  @Get()
  getInfo(@HostParam("account") account: string) {
    return account;
  }
}
```

## Scopes

각기 다른 프로그래밍 언어 배경을 가진 사람들은 Nest에서 들어오는 요청들 사이에서 거의 모든 것이 공유된다는 것을 알게 되는 것은 예상치 못한 일일 수 있습니다. 데이터베이스에 대한 연결 풀, 글로벌 상태의 싱글톤 서비스 등이 있습니다. `Node.js`는 모든 요청이 별도의 스레드에 의해 처리되는 요청/응답 다중 스레드 무상태 모델을 따르지 않는다는 점을 기억해야합니다. 따라서 싱글턴 인스턴스를 사용하는 것은 애플리케이션에 대해 완전히 안전합니다. 그러나 컨트롤러의 요청기반 lifetime이 원하는 동작인 경우 에지 케이스가 있습니다.(예: GraphQL 응용 프로그램의 요청당 캐싱, 요청 추적 또는 multi-tenancy) scope를 컨트롤 하는 방법은 [여기](https://docs.nestjs.com/fundamentals/injection-scopes)에서 배우세용.

## Asynchronicity

우리는 모던 자바스크립트를 좋아하고 데이터 통신이 대부분 비동기적이라는 것을 알고 있습니다. 네스트가 비동기 기능을 지원하고 잘 작동하는 이유입니다.

모든 비동기 함수는 `Promise`를 반환합니다. 즉, Nest가 자체적으로 확인할 수 있는 지연된 값을 반환할 수 있습니다. 예를 들어보죠.

```typescript
@Get()
async findAll(): Promise<any[]> {
  return [];
}
```

위 코드는 완전히 유효합니다. 게다가 Nest 라우트 핸들러는 RxJS [observable streams](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html)를 반환할 수 있기 때문에 훨씬 더 강력합니다. Nest는 아래에 있는 소스에 자동으로 구독하고 스트림이 완료되면 마지막으로 내보낸 값을 가져갑니다.

```typescript
@Get()
findAll(): Observable<any[]> {
  return of([]);
}
```

위 두개의 방법 모두 유효합니다. 여러분이 원하는 것을 쓰시면 됩니다.

### Request payloads

우리가 이전에 만든 예에서 POST route 핸들러는 클라이언트 매개변수를 받지 않았습니다. 우리 한번 `@Body()` 데코레이터를 추가해서 고쳐봅시다.

우선 여러분이 TypeScript를 사용중이라면, 우리는 DTO(Data Transfer Object) schema를 정의해야합니다. DTO는 데이터가 네트워크에서 어떻게 보내질지 정의하는 객체입니다. 우리는 TypeScript interface를 사용하여 schema를 정의할 수 있고, 클래스를 이용하여 정의할 수 있습니다. 흥미롭게도, 우리는 클래스를 사용할 것을 추천합니다. 왜냐고요? 클래스는 JavaScript ES6 표준의 일부이기 때문입니다. 그러므로 컴파일된 JavaScript에서 그대로 보존됩니다. 반면에 TypeScript interface는 transpile 과정에서 사라집니다. Nest는 사라진 아이들을 런타임에 참조 할 수 없습니다. 이것은 매우 중요합니다. 왜냐하면 `Pipes` 와 같은 기능은 런타임에 변수의 metatype에 접근이 가능할 때 추가적인 가능성을 열어줍니다.(약간 파이프가 접근 가능할 때 이것들로 뭐 다른 일을 할 수 있다는 의미 같습니다.)

`CreateCatDto` 클래스를 만들어보죠.

```typescript
export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}
```

위의 클래스는 세개의 기본 속성을 가지고 있습니다. 그후에 우리는 새롭게 생성된 DTO를 `CatsController`에서 사용할 수 있습니다.

```typescript
@Post()
async create(@Body() createCatDto: CreateCatDto) {
  return 'This action adds a new cat';
}
```

:::tip
우리의 `ValidationPipe`는 메서드 핸들러가 수신하지 않아야 하는 속성을 필터링 할 수 있습니다. 이 경우 허용 가능한 속성을 화이트리스트에 추가할 수 있으며 화이트 리스트에 포함되지 않은 모든 속성이 결과 객체에서 자동으로 제거 됩니다. CreateCatDto에서 whitelist는 이름, 나이 및 품종 속성입니다.
:::

## Full resource sample

아래는 기본적인 컨트롤러를 만들기 위해 사용할 수 있는 예제입니다.

```typescript
import { Controller, Get, Query, Post, Body, Put, Param, Delete } from "@nestjs/common";
import { CreateCatDto, UpdateCatDto, ListAllEntities } from "./dto";

@Controller("cats")
export class CatsController {
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return "This action adds a new cat";
  }

  @Get()
  findAll(@Query() query: ListAllEntities) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return `This action removes a #${id} cat`;
  }
}
```

## Getting up and running

컨트롤러가 완전히 정의되어도 Nest는 CatController가 존재하는지 알지 못하므로 이 클래스의 인스턴스가 생성되지 않습니다. 컨트롤러는 항상 모듈에 속하므로 `@Module()` 데코레이터의 컨트롤러에 배열을 추가해야합니다. 루트 AppModule을 제외한 다른 모듈은 아직 정의하지 않았으므로 이를 사용하여 CatsController를 도입합니다.

```typescript
import { Module } from "@nestjs/common";
import { CatsController } from "./cats/cats.controller";

@Module({
  controllers: [CatsController],
})
export class AppModule {}
```

우리는 `@Module` 데코레이터를 이용하여 모듈 클래스에 메타데이터를 붙였습니다. 이제 Nest는 어떤 컨트롤러를 장착해야 하는지 쉽게 반영할 수 있습니다.

## Library-specific approach

지금까지 Nest의 표준적인 대응 방식에 대해 논의하였습니다. 응답을 조작하는 두 번째 방법은 라이브러리별 응답 객체를 사용하는 것 입니다. 특정한 응답 객체를 주입하려면 `@Res` 데코레이터를 사용해야합니다. 차이점을 표시하기 위해 CatsController는 다음과 같이 다시 작성해 보겠습니다.

```typescript
import { Controller, Get, Post, Res, HttpStatus } from "@nestjs/common";
import { Response } from "express";

@Controller("cats")
export class CatsController {
  @Post()
  create(@Res() res: Response) {
    res.status(HttpStatus.CREATED).send();
  }

  @Get()
  findAll(@Res() res: Response) {
    res.status(HttpStatus.OK).json([]);
  }
}
```

이 접근 방식은 실제로 응답 객체(헤드조작, 라이브러리 특정 기능 등)를 완전히 제어함으로써 더 많은 유연성을 허용하지만 사용에 주의해야 한다. 주된 단점은 (기본 라이브러리가 응답 객체에서 다른 API를 가질 수 있기 때문에) 여러분의 코드가 플랫폼에 의존적이 되고 테스트 하기 더 어렵다는 것입니다.

또한 위의 예에서는 `Interceptors` 및 `@HttpCode() / @Header()` 데코레이터와 같이 Nest 표준 응답 처리에 의존하는 Nest 기능과의 호환성이 손실됩니다. 이 문제를 해결하려면 `passthrough` 옵션을 true로 설정해야합니다.

```typescript
@Get()
findAll(@Res({ passthrough: true }) res: Response) {
  res.status(HttpStatus.OK);
  return [];
}
```

이제 native response object와 상호 작용할 수 있습니다.(예: 특정 조건에 따라 쿠키 또는 헤더 설정)
