# Exception filters

Nest는 어플리케이션 전체에서 처리되지 않은 모든 예외를 처리하는 예외 레이어가 내장 되있습니다. 어플리케이션 코드에서 예외를 처리하지 않으면 이 계층에서 예외를 포착한 다음 자동으로 적절한 사용자 친화적인 응답을 보냅니다.

![image](https://user-images.githubusercontent.com/63354527/153328380-cd8b01c2-d415-4516-be59-600c84b50785.png)

기본적으로 이 작업은 `HttpExeption` 유형 (및 해당 하위 클래스)의 예외를 처리하는 내장 전역 예외 필터에 의해 수행됩니다. 예외가 인식되지 않는 경우 (`HttpExeption`도 아니고 `HttpExeption`에서 상속하는 클래스도 아님) 기본 제공 예외 필터는 다음과 같은 기본 JSON응답을 생성합니다.

```json
{
  "statusCode": 500,
  "message": "Internal server error"
}
```

## Throwing standard exceptions

Nest는 `@nestjs/common` 패키지에서 노출되는 내장 `HttpException` 클래스를 제공합니다. 일반적인 HTTP REST/GraphQL API 기반 응용 프로그램의 경우 특정 오류 조건이 발생할 때 표준 HTTP 응답 객체를 보내는 것이 가장 좋습니다. 예를 들어 `CatsController`에는 `findAll()`메서드가 있습니다. 이 라우트 핸들러가 어떤 이유로 다음과 같은 예외를 던졌다고 가정해 봅시다. 이를 시연하기위해 다음과 같이 하드 코딩합니다.

```typescript
@Get()
async findAll() {
  throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
}
```

클라이언트가 이 엔드포인트에 요청을 하면 응답은 다음과 같습니다.

```json
{
  "statusCode": 403,
  "message": "Forbidden"
}
```

`HttpException` 생성자는 응답을 결정하는 두개의 필수 인자를 사용합니다.

- 응답 인자는 JSON 응답 본문을 정의합니다. 아래에 설명된 대로 문자열 또는 객체일 수 있습니다.
- status 인자는 HTTP 상태 코드를 정의합니다.

기본적으로 JSON 응답 바디에는 두가지 속성이 있습니다.

- `statusCode`: 기본값은 state 인자에 제공된 HTTP 상태 코드입니다.
- `message`: status에 따른 HTTP 오류에 대한 간단한 설명

JSON 응답 객체의 message 부분을 override 하기 위해서는 `response` 인자에 문자열을 제공해야합니다. 전체 JSON 응답 바디를 재정의하려면 응답 인자에 객체를 전달합니다. Nest는 이를 직렬화하고 JSON 응답 바디로 반환합니다.

두번째 생성자 인수인 `status`는 유효한 HTTP 상태 코드이어야 합니다. 모범 사례는 `@nestjs/common`에서 가져온 HttpStatus 열거형을 사용하는 것입니다. 다음응ㄴ 전체 응답 본문을 재정의하는 예입니다.

```typescript
@Get()
async findAll() {
  throw new HttpException({
    status: HttpStatus.FORBIDDEN,
    error: 'This is a custom message',
  }, HttpStatus.FORBIDDEN);
}
```

위와 같이하면 응답이 다음과 같이 표시됩니다.

```json
{
  "status": 403,
  "error": "This is a custom message"
}
```

## Custom exceptions

대부분의 경우 사용자 지정 예외를 작성할 필요가 없으며 다음 섹션에 설명된 대로 기본 제공 Nest HTTP 예외를 사용할 수 있습니다. 사용자 지정 예외를 만들어야 할 경우 사용자 지정 예외가 기본 `HttpException` 클래스에서 상속되는 고유한 예외 계층을 만드는 것이 좋습니다. 이 접근 방식을 사용하면 Nest가 예외를 인식하고 자동으로 오류 응답을 처리합니다. 이러한 사용자 정의 예외를 구현해 보겠습니다.

```typescript
export class ForbiddenException extends HttpException {
  constructor() {
    super("Forbidden", HttpStatus.FORBIDDEN);
  }
}
```

`ForbiddenException`은 기본 `HttpException`을 상속하므로 내장 예외 처리기와 원활하게 작동하므로 `findAll()` 메서드 내에서 사용할 수 있습니다.

```typescript
@Get()
async findAll() {
  throw new ForbiddenException();
}
```

## Built-in HTTP exceptions

Nest는 기본 `HttpException`에서 상속되는 일련의 표준 예외를 제공합니다. 이들은 `@nestjs/common` 패키지에서 노출되며 가장 일반적인 HTTP 예외를 나타냅니다.

- `BadRequestException`
- `UnauthorizedException`
- `NotFoundException`
- `ForbiddenException`
- `NotAcceptableException`
- `RequestTimeoutException`
- `ConflictException`
- `GoneException`
- `HttpVersionNotSupportedException`
- `PayloadTooLargeException`
- `UnsupportedMediaTypeException`
- `UnprocessableEntityException`
- `InternalServerErrorException`
- `NotImplementedException`
- `ImATeapotException`
- `MethodNotAllowedException`
- `BadGatewayException`
- `ServiceUnavailableException`
- `GatewayTimeoutException`
- `PreconditionFailedException`

## Exception filters

내장 예외 필터가 많은 경우 자동으로 처리할 수 있지만 예외 계층 전체에 대한 제어가 필요할 수 있습니다. 예를들어 일부 동적 요소를 기반으로 로깅을 추가하거나 다른 JSON스키마를 사용할 수 있습니다. 예외 필터는 정확히 이 목적을 위해 설계되었습니다. 이를 통해 정확한 제어흐름과 클라이언트로 다시 전송되는 응답 내용을 제어할 수 있습니다.

`HttpException` 클래스의 인스턴스인 예외를 포착하고 이에 대한 사용자 정의 응답 논리를 구현하는 예외 필터를 만들어봅시다. 이렇게 하려면 기본 플랫폼인 `Request` 및 `Response` 객체에 접근해야합니다. 우리는 `Request`객체에 접근해서 url정보를 가져오고 이를 logging 정보에 포함시킵니다. 또한 우리는 `Response` 객체를 사용해서 응답에 대한 직접적인 제어를 갖습니다. (response.json() 메서드 활용)

```typescript
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
```

:::tip
모든 예외 필터들은 `ExceptionFilter<T>` 인터페이스를 구현해야합니다. 이 인터페이스는 예외처리기로 하여금 `catch(exception: T, host: ArgumentsHost)` 메서드를 구현하게 합니다. T는 예외의 타입을 나타냅니다.
:::

`@Catch(HttpException)` 데코레이터는 필요한 메타데이터를 예외 필터에 바인딩하여 이 필터가 HttpException 타입의 예외를 찾고 있고 다른 것은 없음을 Nest에게 알립니다. `@Catch()` 데코레이터는 하나의 인자를 받을 수 있고 ,로 구분된 리스트도 받을 수 있습니다. 이를 통해 한번에 여러 유형의 예외에 대한 필터를 설정할 수 있습니다.

## Arguments host

catch() 메서드의 인자를 봅시다. exception 인자는 현재 처리중인 예외 객체입니다. `host` 매개변수는 [ArgumentsHost](https://docs.nestjs.com/fundamentals/execution-context) 객체입니다. ArgumentsHost는 실행 컨텍스트 실행 컨텍스트를 다룰 때 더 자세하게 알아봅니다. 이 코드에서 이를 사용하여 원래 요청 핸들러로 전달되는 요청및 응답 객체에 대한 참조를 얻습니다.

이 수준의 추상화에 대한 이유는 `ArgumentsHost`가 모든 컨텍스트에서 작동하기 때문입니다. (예: 현재 작업중인 HTTP 서버 컨텍스트뿐 아니라 마이크로서비스 및 WebSockets) 실행 컨텍스트 챕터에서는 ArgumentsHost 및 해당 도우미 함수의 기능을 사용하여 모든 실행 컨텍스트에 대한 적절한 기본 인자에 엑세스하는 방법을 볼 것입니다. 이를 통해 모든 컨텍스트에서 작동하는 일반 예외 필터를 작성할 수 있습니다.

## Binding filters

새 `HttpExceptionFilter`를 `CatsController`의 create메서드에 연결해 보겠습니다.

```typescript
@Post()
@UseFilters(new HttpExceptionFilter())
async create(@Body() createCatDto: CreateCatDto) {
  throw new ForbiddenException();
}
```

우리는 여기서 `@UseFilters()` 데코레이터를 사용했습니다. `@Catch()` 데코레이터와 비슷하게, 단일 인자를 받거나 리스트를 받을 수 있습니다. 우리는 위에는 인스턴스를 만들었지만, 대안적으로 여러분은 인스턴스 대신 클래스를 전달할 수 있습니다. 프레임워크에게 인스턴스화를 넘김으로써 dependency injection을 사용할 수 있습니다. 가능하다면 인스턴스대신 클래스를 사용하여 필터를 적용하는 것을 선호합니다. Nest는 전체 모듈에서 동일한 클래스의 인스턴스를 쉽게 재사용할 수 있으므로 메모리 사용량을 줄입니다.

```typescript
@Post()
@UseFilters(HttpExceptionFilter)
async create(@Body() createCatDto: CreateCatDto) {
  throw new ForbiddenException();
}
```

위의 예에서 `HttpExceptionFilter`은 단일 create() 라우트 핸들러에서만 적용되어 메소드 범위가 됩니다. 예외 필터는 메서드 범위, 컨트롤러범위 또는 전역 범위 같은 다양한 수준에서 범위를 지정할 수 있습니다. 예를 들어 필터를 컨트롤러 범위로 설정하려면 다음을 수행합니다.

```typescript
@UseFilters(new HttpExceptionFilter())
export class CatsController {}
```

이 구성은 CatsController 내부에 정의된 모든 경로 처리기에 대해 HttpExceptionFilter를 설정합니다. 전역 범위 필터를 만들려면 다음을 수행합니다.

```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
```

:::warning
The useGlobalFilters() method does not set up filters for gateways or hybrid applications.
:::

전역 범위 필터는 모든 컨트롤러 및 모든 경로 처리기에 대해 전체 응용 프로그램에서 사용됩니다. dependency injection 관점에서, 모듈 외부에서 등록된 전역 필터(useGlobalFilters())는 dependency injection을 할 수 없습니다. 이는 이것이 모든 모듈의 컨텍스트 외부에서 수행되기 때문입니다. 이 문제를 해결하기위해서는, 다음 구성을 사용하여 모든 모듈에서 직접 전역 범위 필터를 등록할 수 있습니다.

```typescript
import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
```

이 기술을 사용하여 필요한 만큼 필터를 추가할 수 있습니다. 단순히 provider 배열에 추가하면 됩니다.

## Catch everything

처리되지 않은 모든 예외를 포착하려면(예외 유형에 관계없이) `@Catch()` 데코레이터 매개변수 유형을 비워둡니다.
아래의 예는 HTTP어댑터를 사용하여 응답을 전달하고 플랫폼별 객체를 직접 사용하지 않기 때문에 플랫폼에 구애받지 않는 코드입니다.

```typescript
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
```

## Inheritance

일반적으로 응용 프로그램 요구 사항을 충족하도록 제작된 완전히 사용자 지정된 예외 필터를 만듭니다. 그러나 기본 제공되는 전역 예외 필터를 단순히 확장하고 특정 요인에 따라 동작을 재정의하려는 경우가 있을 수 있습니다.

예외 처리기를 기본 필터에 위임하려면 `BaseExceptionFilter`를 확장하고 상속된 catch메서드를 호출해야합니다.

```typescript
import { Catch, ArgumentsHost } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    super.catch(exception, host);
  }
}
```

`BaseExceptionFilter`를 확장하는 메서드 범위 및 컨트롤러 범위 필터는 new로 인스턴스화 해서는 안됩니다. 대신 프레임워크가 자동으로 인스턴스를 생성하도록 합니다.

위의 구현은 접근 방식을 보여주는 쉘일 뿐입니다. 확장 예외 필터의 구현에는 맞춤형 비즈니스 로직이 포함됩니다.

전역 필터는 기본 필터를 확장할 수 있습니다. 이것은 두가지 방법으로 수행할 수 있습니다.

첫번째 방법은 사용자 지정 전역 필터를 인스턴스와 할 때 HttpServer참조를 삽입하는 것입니다.

```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  await app.listen(3000);
}
bootstrap();
```

두번째 방법은 `APP_FILTER` 토큰을 사용하는 것입니다.
