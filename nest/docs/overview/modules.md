---
description: nestjs modules
tags: ["nest"]
---

# Modules

모듈은 `@Module()` 데코레이터로 주석이 달린 클래스입니다. `@Module()` 데코레이터는 Nest가 어플리케이션 구조를 구성하는데 사용하는 메타데이터를 제공합니다.

![image](https://user-images.githubusercontent.com/63354527/152672747-bebc63b2-0475-4fac-a446-ee8c92c09228.png)

하나의 어플리케이션은 적어도 하나의 모듈이 있어야합니다. (root module) 루트 모듈은 Nest가 application graph(Nest가 모듈 및 provider 관계 및 종속성을 해결하는데 사용하는 내부 데이터 구조)를 빌드하기 위한 시작점 입니다. 매우 작은 응용 프로그램에는 이론적으로 루트 모듈만 있을 수 있지만 일반적인 경우는 아닙니다. 구성 요소를 구성하는 효과적인 방법으로 모듈을 사용하는 것이 좋습니다. 따라서 대부분의 어플리케이션에서 결과 아키텍처는 각각 밀접하게 관련된 기능 집합을 캡슐화하는 여러 모듈을 사용합니다.

`@Module()` 데코레이터는 속성이 모듈을 설명하는 단일 객체를 사용합니다.

- `providers`: Nest injector 에 의해 인스턴스화되고 적어도 이 모듈에서 공유될 수 있는 제공자
- `controllers`: 인스턴스화해야 하는 모듈에 정의도니 컨트롤러 세트
- `imports`: 이 모듈에 필요한 provier를 내보내는 가져온 모듈 목록
- `exports`: 이 모듈에서 제공하고 이 모듈을 가져오는 다른 모듈에서 사용할 수 있어야 하는 `providers`의 하위 집합

모듈은 기본적으로 provider를 캡슐화 합니다. 즉 현재 모듈의 일부도 아니고 가져온 모듈에서 내보낸 것도 아닌 provier를 주입할 수 없습니다. 따라서 모듈에서 내보낸 provider를 모듈의 공개 인터페이스 또는 API로 간주할 수 있습니다.

## Feature moduels

`CatsController` 및 `CatsService`는 동일한 어플리케이션 도메인에 속합니다. 밀접하게 관련되어 있으므로 기능 모듈로 이동하는 것이 좋습니다. 기능 모듈은 단순히 특정 기능과관련된 코드를 구성하여 코드를 구성하고 명확한 경계를 설정합니다. 이는 특히 어플리케이션 및 팀의 규모가 커짐에 따라 복잡성을 관리하고 SOLID 원칙으로 개발하는데 도움이 됩니다.

```typescript
import { Module } from "@nestjs/common";
import { CatsController } from "./cats.controller";
import { CatsService } from "./cats.service";

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
```

:::tip
모듈을 CLI로 만들려면 `nest g module 여러분의모듈이름`으로 쉽게 만들 수 있습니다.
:::

이제 `CatsModule`를 root module에 import 합시다!

```typescript
import { Module } from "@nestjs/common";
import { CatsModule } from "./cats/cats.module";

@Module({
  imports: [CatsModule],
})
export class AppModule {}
```

## Shared modules

Nest에서 모듈은 기본적으로 싱글톤이므로 여러 모듈간에 동일한 공급자 인스턴스를 손쉽게 공유할 수 있습니다.

![image](https://user-images.githubusercontent.com/63354527/152673443-ac47cce1-e1f4-47bd-b0ac-d85cc621fd6b.png)

모든 모듈은 자동으로 공유 모듈입니다. 일단 생성되면 모든 모듈에서 재사용할 수 있습니다. 여러 다른 모듈간에 `CatsService`의 인스턴스를 공유하려고 한다고 가정해 봅시다. 그렇게 하려면 먼저 CatsService provider를 아래와 같이 모듈의 `exports` 배열에 추가하여 내보내야합니다.

```typescript
import { Module } from "@nestjs/common";
import { CatsController } from "./cats.controller";
import { CatsService } from "./cats.service";

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
```

이제 `CatsModule`를 가져오는 모든 모듈은 `CatsService`를 엑세스 할 수 있으며 이를 가져오는 다른 모든 모듈과 동일한 인스턴스를 공유합니다.

## Module re-exporting

위에서 볼 수 있듯이 모듈은 내부 provider를 내보낼 수 있습니다. 또한, 가져온 모듈을 다시 내보낼 수 있습니다. 아래 예에서 `CommonModule`은 `CoreModule`로 가져오기와 CoreModule에서 내보내기를 모두 수행하여 이 모듈을 가져오는 다른 모듈에서 사용할 수 있습니다.

```typescript
@Module({
  imports: [CommonModule],
  exports: [CommonModule],
})
export class CoreModule {}
```

## Dependency injection

모듈 클래스는 provider도 주입할 수 있습니다.

```typescript
import { Module } from "@nestjs/common";
import { CatsController } from "./cats.controller";
import { CatsService } from "./cats.service";

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {
  constructor(private catsService: CatsService) {}
}
```

그러나 순환 종속성으로 인해 모듈 클래스 자체를 provider로 주입할 수 없습니다.

## Global modules

모든 곳에서 동일한 모듈 세트를 가져와야 하는 경우 짜증날 수 있습니다. Nest와 다르게 Angular provider는 전역 범위에 등록됩니다. 일단 정의되면 모든 곳에서 사용할 수 있습니다. 그러나 Nest는 모듈 범위 내에서 공급자를 캡슐화 합니다. 먼저 캡슐화 모듈을 가져오지 않고는 모듈의 provider를 다른 곳에서 사용할 수 없습니다.

모든 곳에서 즉시 사용할 수 있어야 하는 공급자 집합(예: 데이터베이스 연결)을 제공하려면 `@Global()` 데코레이터를 사용하여 모듈을 전역적으로 만들어야 합니다.

```typescript
import { Module, Global } from "@nestjs/common";
import { CatsController } from "./cats.controller";
import { CatsService } from "./cats.service";

@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
```

`@Global()`데코레이터는 모듈을 전역 범위로 만듭니다. 전역 모듈은 일반적으로 루트 또는 코어 모듈에서 한번만 등록해야 합니다. 위의 예시에서 `CatsService` provider는 어디에나 있으며 서비스를 삽입하려는 모듈은 imports 배열에서 CatsModule를 가져올 필요가 없습니다.

## Dynamic modules

Nest 모듈 시스템에는 동적 모듈이라는 강력한 기능이 포함되어 있습니다. 이 기능을 사용하면 공급자를 동적으로 등록하고 구성 할 수 있는 사용자 지정 가능한 모듈을 쉽게 만들 수 있습니다.

다음은 `DatabaseModule`에 대한 동적 모듈 정의의 예입니다.

```typescript
import { Module, DynamicModule } from "@nestjs/common";
import { createDatabaseProviders } from "./database.providers";
import { Connection } from "./connection.provider";

@Module({
  providers: [Connection],
})
export class DatabaseModule {
  static forRoot(entities = [], options?): DynamicModule {
    const providers = createDatabaseProviders(options, entities);
    return {
      module: DatabaseModule,
      providers: providers,
      exports: providers,
    };
  }
}
```

이 모듈은 기본적으로 연결 제공자를 정의합니다.(`@Module()`데코레이터 메타데이터에서) 그러나 추가로 `forRoot()` 메서드에 전달된 엔티티 및 옵션 객체에 따라 provider의 집합을 노출합니다. 동적 모듈이 반환하는 속성은 `@Module()`데코레이터에 정의된 기본 모듈 메타데이터를 재정의하는 대신 확장합니다. 이것이 정적으로 선언된 연결 제공자와 동적으로 생성된 저장소 제공자가 모듈에서 내보내지는 방식입니다.

전역 범위에 동적 모듈을 등록하려면 전역 속성을 true로 설정합니다.

```json
{
  global: true,
  module: DatabaseModule,
  providers: providers,
  exports: providers,
}

```

`DatabaseModule`은 다음과 같은 방식으로 가져오고 구성할 수 있습니다.

```typescript
import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { User } from "./users/entities/user.entity";

@Module({
  imports: [DatabaseModule.forRoot([User])],
})
export class AppModule {}
```

동적 모듈을 다시 내보내려면 내보내기 배열에서 `forRoot()` 메서드 호출을 생략할 수 있습니다.

```typescript
import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { User } from "./users/entities/user.entity";

@Module({
  imports: [DatabaseModule.forRoot([User])],
  exports: [DatabaseModule],
})
export class AppModule {}
```
