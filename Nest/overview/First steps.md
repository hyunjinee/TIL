# First steps

여기서는 Nest의 핵심 기본에 대해 배웁니다. Nest 애플리케이션의 필수 구성 요소를 숙지할 수 있도록 CRUD 애플리케이션을 구축하여 다양한 분야를 포괄하는 기능을 도입하겠습니다.

### Language

우리는 타입스크립트를 사랑하지만, 무엇보다도 노드를 사랑합니다. 이것이 네스트가 타입스크립트와 순수 자바스크립트와 모두 호환되는 이유입니다. 네스트는 최신 언어 기능을 활용하기 때문에 바닐라 자바스크립트와 함께 사용하려면 바벨 컴파일러가 필요합니다.

제공하는 예제에서는 주로 타입스크립트를 사용하지만 바닐라 자바스크립트로 항상 전환할 수 있습니다. (코드 스니펫의 오른쪽 상단 모소리에 있는 언어 버튼을 클릭하여 전환)

### Setup

네스트로 프로젝트를 만들면 보일러플레이트 코드도 같이 생깁니다. src 폴더에 생기는 파일은 다음과 같습니다.

1. app.controller.ts : basic controller with a single route.
2. app.controller.spec.ts: the unit tests for the controller.
3. app.module.ts: the root module of the application.
4. app.service.ts: a basic service with a single method.
5. main.ts: the entry file of the application which uses the core function `NestFactory` to create a Nest application instance.

```ts
import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(3000)
}
bootstrap()
```

Nest 애플리케이션 인스턴스을 만들려면 NestFactory class 를 사용해야합니다. Nestfactory는 몇가지 정적 메소드를 노출해서 애플리케이션 인스턴스를 만들 수 있도록 해줍니다. create 메서드는 어플리케이션 객체를 반환하고, 이는 INestApplication interface를 구현하는 객체입니다.

이 객체는 다음장에서 설명하는 메소드 집합을 제공합니다. 위의 main.ts에서 우리는 응용프로그램이 인바운드 HTTP 요청을 기다릴 수 있도록 HTTP listener를 시작합니다.

Nest CLI로 구성된 프로젝트는 개발자가 각 모듈을 자체 전용 디렉토리에 보관하는 관례를 따르도록 권장하는 초기 프로젝트 구조를 생성한다는 점에 유의하십시오.

### Platform

네스트는 플랫폼에 구애받지 않는 프레임워크가 되는 것을 목표로 합니다. 플랫폼 독립성을 통해 개발자가 여러 유형의 응용 프로그램에서 활용할 수 있는 재사용 가능한 논리 부분을 만들 수 있습니다. 기술적으로 Nest는 일단 어댑터가 만들어지면 노드 HTTP 프레임워크에서 작업할 수 있습니다. 즉 지원되는 HTTP플랫폼은 express 및 fastify 두 가지가 있습니다. 여러분은 여러분에게 맞는 것을 선택할 수 있습니다.

> platform-express: 익스프레스는 웰노운입니다. 기본적으로 @nestjs/platform-express 패키지가 사용됩니다. 많은 사용자가 Express를 사용하고 있으므로 사용 가능으로 설정하기 위해 별도의 조치를 취할 필요가 없습니다.
> platform-fastify: fastify는 최고의 효율성과 속도를 제공하는데 매우 초점을 맞춘 고성능 및 낮은 오버헤드 프레임워크입니다.

어떤 플랫폼을 사용하든 자체 애플리케이션 인터페이스를 노출합니다. 각각 NestExpressApplication 및 NestFastifyApplication 으로 표시됩니다.

```ts
const app = await NestFactory.create<NestExpressApplication>(AppModule)
```

### Running the application

설치 프로세스가 완료되면 OS 명령 프롬프트에서 다음 명령을 실행하여 인바운드 HTTP 요청에 대한 응용프로그램 수신을 시작할 수 있습니다.

```bash
npm run start
```

이 명령은 src/main.ts 파일에 정의된 포트에서 HTTP 서버가 수신 대기하면서 앱을 시작합니다. 응용 프로그램이 실행되면 브라우저를 열고 http://localhost:3000/ 로 이동합니다. Hello wolrd! 메시지가 나와야 합니다.
