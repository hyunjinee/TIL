# Providers

`Provider`는 Nest의 기본 개념입니다. 대부분의 기본 Nest클래스는 services, repositories, factories, helpers등과 같은 `Provider`로 취급될 수 있습니다. `Provider`의 메인 아이디어는 `Provider`가 dependency로 주입될 수 있다는 것입니다. 즉 객체가 서로 다양한 관계를 형성할 수 있고 객체의 인스턴스를 Nest 런타임 시스템에 위임할 수 있다는 것입니다.

![Components_1](https://user-images.githubusercontent.com/63354527/152488743-e8952f71-7855-4bfc-ad1b-58b21b1b802a.png)

이번 챕터에서는 우리는 간단한 `CatsController`를 만들 것 입니다. 컨트롤러는 HTTP 요청을 핸들링 할 수 있어야하고 복잡한 일들을 `Provider`에게 위임 할 수 있어야 합니다. `Provider`는 plain JavaScript class이고 module에 `providers`에 선언되어 있습니다.

## Services

`CatsService`를 만드는 것부터 시작해봅시다. 이 서비스는 데이터 저장 및 검색을 담당하고,`CatsController`에 의해 사용되도록 디자인 됩니다. 따라서`Provider`로 정의되기 좋은 후보입니다.

```typescript
import { Injectable } from "@nestjs/common";
import { Cat } from "./interfaces/cat.interface";

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
```

:::tip
service를 CLI로 만들고 싶다면 `nest g service cats`라고 입력하면 됩니다.
:::

우리의 `CatsService`는 하나의 속성과 두개의 메서드를 갖는 기본 클래스입니다. 이 클래스의 특징은 `@Injectable()` 데코레이터를 가진다는 것 입니다. 이 데코레이터는 metadata를 클래스에 붙이고, 이 메타데이터는 `CatsService`가 Nest IoC container에 의해서 관리되고 있다는 것을 선언합니다. 그건 그렇고, 이 예는 Cat 인터페이스도 사용합니다. 아래와 같습니다.

```typescript
export interface Cat {
  name: string;
  age: number;
  breed: string;
}
```

이제 고양이를 검색하는 서비스 클래스가 있으므로 CatsController 내부에서 사용하겠습니다.

```typescript
import { Controller, Get, Post, Body } from "@nestjs/common";
import { CreateCatDto } from "./dto/create-cat.dto";
import { CatsService } from "./cats.service";
import { Cat } from "./interfaces/cat.interface";

@Controller("cats")
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
```

`CatsService`는 class constructor에 의해서 주입됩니다. 여기서 우리는 `private` 구문의 사용에 주목해야합니다. 이 약식을 사용하면 동일한 위치에서 `catsService` 멤버를 즉시 선언하고 초기화 할 수 있습니다.

## Dependency Injection

Nest는 일반적으로 의존성 주입으로 알려진 강력한 디자인 패턴을 기반으로 구축되었습니다. 공식 [Angular 문서](https://angular.io/guide/dependency-injection) 에서 이 개념에 대한 훌륭한 설명을 읽는 것이 좋습니다.

Nestd에서는 TypeScript의 기능, 즉 정적 타입 덕분에 의존성들을 관리하기 쉽습니다. 아래의 예제에서, Nest는 `CatsService`의 인스턴스를 생성하고 반환하여 `catsService`를 resolve합니다. (또는 일반적인 싱클톤의 경우 다른 곳에서 이미 요청된 경우 기존 인스턴스를 반환합니다.) 이 의존성은 해결되어 컨트롤러의 생성자로 전달됩니다.

```typescript
constructor(private catsService: CatsService) {}
```

## Scopes

Provider들은 일반적으로 어플리케이션 수명 주기와 동시화된 수명(`scope`)를 갖습니다. 어플리케이션이 bootstrapped 되면 모든 의존성을 해결해야 하므로 모든 Provider를 인스턴스화 해야합니다. 마찬가지로 어플리케이션이 종료되면 각 Provider가 소멸됩니다. 그러나 Provider의 수명을 요청된 범위로 만드는 방법도 있습니다. 자세한 내용은 [여기](https://docs.nestjs.com/fundamentals/injection-scopes)를 클릭하세요.

## Custom providers

Nest는 inversion of control 이라고 하는 provider들 간의 관계를 해결해주는 ("IoC") 컨테이너가 내장되어 있습니다. 이 기능은 위에서 의존성 주입의 기초가 되지만 실제로는 지금까지 설명한 것보다 훨씬 강력합니다. provider를 정의하는 방법은 여러가지 있습니다. 일반 값, 클래스, 비동기 또는 동기 팩토리를 사용할 수 있습니다. 자세한 내용은 [여기](https://docs.nestjs.com/fundamentals/custom-providers)를 클릭하세요.

## Optional providers

경우에 따라서 반드시 해결할 필요가 없는 종속성이 있을 수 있습니다. 예를 들어 여러분의 클래스는 configuration object에 의존할 수 있지만, 아무것도 전달되지 않으면 기본 값을 사용해야합니다. 이러한 경우 구성 공급자가 없어도 오류가 발생하지 않기 때문에 종속성은 선택 사항이 됩니다.

provider가 optional이라는 것을 나타내기 위해 우리는 `@Optional()`데코레이터를 생성자에서 사용합니다.

```typescript
import { Injectable, Optional, Inject } from "@nestjs/common";

@Injectable()
export class HttpService<T> {
  constructor(@Optional() @Inject("HTTP_OPTIONS") private httpClient: T) {}
}
```

위의 예에서 사용자 지정 provider를 사용하고 있으며 이것이 `HTTP_OPTIONS` 사용자 지정 토큰을 포함하는 이유입니다. 이전 예제에서는 생성자의 클래스를 통해 의존성을 나타내는 생성자 기반 주입을 보여줬습니다.

## Property-based injection

우리가 지금까지 사용한 기술은 생성자 기반 주입이라고 하는데, 생성자 메서드를 통해 provider가 주입되기 때문입니다. 매우 특정한 경우에는 `property-based injection`이 유용할 수 있습니다. 예를 들어서 만약 여러분의 top-level 클래스가 하나 또는 여러개의 provider에 의존한다면, 생성자의 하위 클래스에서 `super()`메서드를 서브 클래스에서 호출하여 위로 전달하는 것은 매우 지루할 수 있습니다. 이를 방지하기 위해 속성 수준에서 `@Inject()` 데코레이터를 사용할 수 있습니다.

```typescript
import { Injectable, Inject } from "@nestjs/common";

@Injectable()
export class HttpService<T> {
  @Inject("HTTP_OPTIONS")
  private readonly httpClient: T;
}
```

## Provider registration

이제 우리는 provider를 정의했고, 해당 서비스의 소비자도 있으므로(`CatsController`) Nest가 주입을 실행할 수 있도록 서비스를 등록해야 합니다.

```typescript
import { Module } from "@nestjs/common";
import { CatsController } from "./cats/cats.controller";
import { CatsService } from "./cats/cats.service";

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class AppModule {}
```

## Manual instantiation

지금까지 Nest가 종속성을 해결하는 대부분의 세부사항을 자동으로 처리하는 방법에 대해 논의했습니다. 특정 상황에서는 기본 제공 의존성 주입 시스템을 벗어나 수동으로 provider를 검색하거나 인스턴스화해야 할 수 있습니다. 우리는 아래에서 그러한 두가지 주제에 대해 간략하게 논의합니다.

기존 인스턴스를 가져오거나 provider를 동적으로 인스턴스화하려면 [모듈 참조](https://docs.nestjs.com/fundamentals/module-ref)를 사용할 수 있습니다.

bootsrap() 함수 내에서 provider를 언드려면 [독립 실행형 응용 프로그램](https://docs.nestjs.com/standalone-applications)을 참조하세요.
