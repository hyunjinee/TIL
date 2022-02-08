# Middleware

미들웨어는 라우트 핸들러 전에 호출되는 함수입니다. 미들웨어 함수는 요청 및 응답 객체에 접근할 수 있으며 어플리케이션의 요청-응답 주기에 있는 next() 미들웨어 함수에 접근 할 수 있습니다. `next()`미들웨어 함수는 `next`라는 변수로 표시됩니다.

![image](https://user-images.githubusercontent.com/63354527/152908342-dcaf81f8-c2e2-4e1f-a053-5da59538e862.png)

Nest 미들웨어는 기본적으로 익스프레스 미들웨어랑 동일합니다. 공식 익스프레스 문서의 다음 설명은 미들웨어의 기능에 대해 설명합니다.

> 미들웨어 기능은 다음 작업을 수행할 수 있습니다.
>
> - 어떤 코드나 실행가능.
> - 요청 객체와 응답객체를 변화시킬 수 있다.
> - 요청과 응답 사이클을 끝낼 수 있다.
> - stack에 있는 다음 미들웨어 함수를 호출할 수 있다.
> - 현재 미들웨어 함수가 요청-응답주기를 종료하지 않으면 next()를 호출하여 다음 미들웨어 함수에 제어를 전달해야 합니다. 그렇지 않으면 요청이 중단됩니다.

함수또는 `@Injectable()`데코레이터가 있는 클래스에서 사용자 지정 Nest미들웨어를 구현합니다. 클래스는 NestMiddleware 인터페이스를 구현해야 하지만 함수에는 특별한 요구사항이 없습니다. class 메서드를 사용하여 간단한 미들웨어 기능을 구현해봅시다!

```typescript
import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log("Request...");
    next();
  }
}
```

## Dependency injection

Nest 미들웨어는 Dependency Injection을 완벽하게 지원합니다. provider와 컨트롤러와 마찬가지로 동일한 모듈 내에서 사용 가능한 종속성을 주입할 수 있습니다. 이것은 생성자를 통해 수행됩니다.

## Applying middleware

`@Module()` 데코레이터에는 미들웨어가 들어갈 자리가 없습니다. 대신 모듈 클래스의 `configure()` 메서드를 사용하여 설정합니다. 미들웨어를 포함하는 모듈은 NestModule 인터페이스를 구현해야 합니다. AppModule 수준에서 LoggerMiddleware를 설정해 보겠습니다.

```typescript
import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { LoggerMiddleware } from "./common/middleware/logger.middleware";
import { CatsModule } from "./cats/cats.module";

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("cats");
  }
}
```

위의 예에서 우리는 이전에 CatsController 내부에 정의된 /cat 라우트 핸들러에 대해 `LoggerMiddleware`를 설정했습니다. 또한 미들웨어를 구성할 때 라우트 경로와 요청 메서드를 포함하는 개개체를 forRoutes()메서드에 전달하여 미들웨어를 특정 요청 메서드로 제한 할 수 있습니다. 아래의 예에서 원하는 요청 메서드 유형을 참조하기 위해 RequestMethod enum을 가져옵니다.

```typescript
import { Module, NestModule, RequestMethod, MiddlewareConsumer } from "@nestjs/common";
import { LoggerMiddleware } from "./common/middleware/logger.middleware";
import { CatsModule } from "./cats/cats.module";

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({ path: "cats", method: RequestMethod.GET });
  }
}
```

## Route wildcards

패턴 기반 경로도 지원됩니다. 예를 들어 별표는 와일드 카드로 사용되며 모든 문자 조합과 일치합니다.

```typescript
forRoutes({ path: "ab*cd", method: RequestMethod.ALL });
```

`ab*cd` 경로는 `abcd`, `ab_cd`, `abecd` 등과 일치합니다. ?, + 및 () 문자는 라우팅 경로에 사용될 수 있으며 해당 정규식 대응의 하위 집합입니다. -, . 은 문자 그대로 문자열 기반 경로로 해석됩니다.

## Middleware consumer

미들웨어는 도우미 클래스입니다. 미들웨어를 관리하는 몇가지 기본 제공 메서드를 제공합니다. 이들 모두 단순히 fluent style로 체이닝될 수 있습니다.

`forRoutes`메서드는 단일 문자열, 여러문자열, RouteInfo객체, 컨트롤러 클래스 및 여러 컨트롤러 클래스를 사용할 수 있습니다. 대부분의 경우 쉼표로 구분된 컨트롤러 목록을 전달할 것입니다. 아래는 단일 컨트롤러의 예입니다.

```typescript
import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { LoggerMiddleware } from "./common/middleware/logger.middleware";
import { CatsModule } from "./cats/cats.module";
import { CatsController } from "./cats/cats.controller";

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(CatsController);
  }
}
```

## Excluding routes

때때로 우리는 미들웨어가 적용되는 특정 경로를 제외하고 싶을 때가 있습니다. `exclue()`메서드를 사용하여 특정 경로를 쉽게 제거할 수 있습니다. 이 메서드는 아래와 같이 제외할 경로를 식별하는 단일 문자열, 여러 문자열 또는 `RouteInfo`객체를 사용할 수 있습니다.

```typescript
consumer
  .apply(LoggerMiddleware)
  .exclude({ path: "cats", method: RequestMethod.GET }, { path: "cats", method: RequestMethod.POST }, "cats/(.*)")
  .forRoutes(CatsController);
```

## Functional middleware

우리가 사용한 `LoggerMiddleware`는 매우 간단합니다. 이는 멤버, 추가 메서드및 종속성이 없습니다. 클래스 대신 간단한 함수로 정의하면 안됩니까?!!? 네 할 수 있습니다. 이러한 유형의 미들웨어를 `functional middleware`라고 합니다. 차이점을 섦여하기 위해 로거 미들웨어를 클래스기반에서 함수형 미들웨어로 변환해봅시다.

```typescript
import { Request, Response, NextFunction } from "express";

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Request...`);
  next();
}
```

그리고 `AppModule` 에서 다음과 같이 적용합니다.

```typescript
consumer.apply(logger).forRoutes(CatsController);
```

## Multiple middleware

위에서 언급했듯이 순차적으로 실행되는 미들웨어를 바인딩하려면 apply()메서드 내부에 쉼표로 구분된 목록을 제공하기만 하면 됩니다.

```typescript
consumer.apply(cors(), helmet(), logger).forRoutes(CatsController);
```

## Global middleware

등록된 모든 경로에 미들웨어를 바인딩하려는 경우 `INestApplication`에서 제공하는 use() 메서드를 사용할 수 있습니다

```typescript
const app = await NestFactory.create(AppModule);
app.use(logger);
await app.listen(3000);
```
