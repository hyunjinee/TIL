# INTRODUCTION

Nest.js는 효율적이고 확장 가능한 Node.js 서버 측 애플리케이션을 구축하기 위한 프레임 워크입니다. 프로그레시브 JavaScript를 사용하고 TypeScript로 빌드되고 완벽하게 지원하며 (개발자가 순수 JavaScript로 코딩할 수 있음) OOP (Object Oriented Programming), FP (Functional Programming)및, FRP (Functional Reactive Programming) 요소를 사용할 수 있게 해줍니다.

## Nest는 내부적으로 어떻게 구성되었나요?

내부적으로 Express와 같은 강력한 HTTP 서버 프레임 워크를 사용하며 선택적으로 Fastify를 사용하도록 구성 할 수도 있습니다.

Nest는 이러한 공통 Node.js 프레임워크 위에 추상화 수준을 제공하지만 API를 개발자에게 직접 노출합니다. 이를 통해 개발자는 기본 플랫폼에서 사용할 수 있는 수 많은 타사 모듈을 자유롭게 사용할 수 있습니다.

## Nest JS의 철학

Node를 위한 훌륭한 라이브러리, 도우미 및 도구가 많이 존재하지만 이들 중 어느 것도 아키텍처의 주요 문제를 효과적으로 해결하지 못합니다.

Nest는 개발자와 팀이 고도로 테스트 가능하고 확장 가능하며 느슨하게 결합되고 유지 관리가 쉬운 애플리케이션을 만들 수 있는 즉시 사용 가능한 애플리케이션 아케텍처를 제공합니다. 이 아케텍처는 Angular에서 크게 영감을 받았습니다.

## Installation

시작하려면 Nest CLI를 사용하여 프로젝트를 시작하거나, 스타터 프로젝트를 복제합니다.

```bash
$ npm i -g @nestjs/cli
$ nest new 여러분의프로젝트이름
```

Nest CLI 를 이용하여 프로젝트를 시작하려면 위 커맨드를 실행합니다. 이렇게 하면 새 프로젝트 디렉토리가 작성되고 디렉토리가 초기 코어 네스트 파일과 지원 모듈로 채워져 프로젝트에 대한 기본 구조가 작성됩니다.

또한 npm을 사용하여 Core및 지원 파일을 설치하여 처음부터 새 프로젝트를 수동으로 생성할 수도 있습니다. 물론 이 경우 프로젝트 boilerplate를 직접 작성해야 합니다.

```bash
$ npm i @nestjs/core @nestjs/common rxjs reflect-metadata
```
