npm 패키지 정보를 담는 파일인 package.json이 없는 경우에 npm을 실행하면 경고가 출력된다.

`npm un react react-dom` 패키지 삭제


npm 패키지는 시맨틱 버저닝이라는 버전 번호를 붙이는 규칙이 있는데, 버전 번호는 major, minor , patch와 같이 구성괸다.

- major: 하위 호환성이 깨질 때 숫자가 올라감
- minor: 하위 호환성이 유지되면서 새 기능이 추가될 때 숫자가 올라감
- patch: 버그 수정등에 숫자가 올라감


package.json을 수정했으면 npm up 명령을 사용하여 패키지를 업데이트 할 수 있다. 이 경우  package-lock.json 파일의 내용도 업데이트된 패키지에 맞춰 수정된다.

