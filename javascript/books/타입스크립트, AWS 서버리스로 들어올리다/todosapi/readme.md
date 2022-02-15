- .gitignore
- handler.ts: 핸들러 소스
- serverless.yml: 서버리스 프레임워크 설정 파일



`sls create --template aws-nodejs-typescript`

cd into project

`npm i`


다이나모 디비는 nosql 데이터베이스이다. 키를 제외한 다른 데이터베이스스키마가 자유롭고 aws 에서 클러스터링,백업정책, 다중리전등 다양한 기능을 제공한다. 다이나모디비를 사용함으로써 nosql의 자유로운 데이터형으로 얻는 이득을 누릴수 있으며, 뛰어난 가용성을 누릴 수 있다. 그리고 이런 복잡한 시스템 관리는 aws 에서 해준다. 

참고할 만한 레퍼런스도 많지 않아서 문제해결이 어려울 수도 있다. 


`sls dynamodb install`

설치가 완료되면 .dynamodb 라는 폴더가 생기고 여기서 로컬에서 다이나모디비가 실행된다. 여기서 다이나모디비 로컬 버전을 실행하는데 자바 런타임이 필요핟. 개발 PC에 자바 런타임을 설치한다. 