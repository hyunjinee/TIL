# mysql

mysql -h 뒤에는 접속할 주소를 -u뒤에는 사용자명을입력

각각 localhost와 root 를 넣고 -p는 비밀번호를 사용하겠다는 뜻이다. 이렇게 명령어를 입력하면 비밀번호 입력창이 뜨는데 여기에 mysql를 설치할 때 설정했던 비밀번호를 입력한다. 

콘솔로는 데이터를 한눈에 보기에 무리가 있는데 워크벤치라는 프로그램을 사용하면 데이터베이스 내부에 저장된 데이터를 시각적으로 관리할 수 있어서 편리하다. 

### 7.4.1 데이터베이스 생성하기 

create schema 데이터베이스명이 데이터 베이스를 생성하는 명령어이다. 스키마라고 되어있는데 mysql에서 데이터베이스와 스키마는 같은 개념이다. 

```mysql
create schema `nodejs` default character set utf8;
use nodejs;
```

### 7.4.2 테이블 생성하기
디비를 생성했다면 테이블을 만든다. 테이블이란 데이터가 들어갈 수 있는 틀을의미하며 테이블에 맞는 데이터만 들어갈 수 있다.사용자의 정보를 저장하는 테이블을 만들어보자.

컬럼을 정의해두면 앞으로 데이터를넣을 때 컬럼 규칙에 맞는 정보들만 넣을 수 있다.컬럼과 로우가 교차하는 한 칸을 필드라고 한다. 칼럼은 세로필드의 집합이고 로우는 가로필드의 집합이다. 

- VARCHAR(자릿수) CHAR(자릿수) CHAR 는 고정길이 바차는 가변길이. char 에는 부족한만큼 스페이스로 공간채운다.
- TEXT는 긴 글을 저장할 때 사용한다. 보통 수백자까지는 바차
- TINYINT -128 부터 127 까지의 정수를 저장할 때 사용한다.  1또는 0만 저장한다면 불값과 같은 역할을 할 수도 있다. 
- DATETIME 은 날짜와 시간에 대한 정보를 담고있다. 날짜 정보만 담는 DATE와 시간 정보만 담는 TIME자료형도 있다. 이외에도 많은 자료형이 있으나 이정도가 자주쓰임

- ZEROFILL 남은 공간을 0채워넣는다.

전국 사람들이 외치네 저괴물체는 뭘까?

- PRIMARYKEY 데이터베이스에 데이터를 넣을 때는 로우 단위로 넣는다. 이때 로우들을 구별할 고유한 식별자가 필요하다. 
- COMMENT 테이블에대한 보충 설명을 의미 이테이블이 무슨 역할을 하는지 적어두면된다. 필수는 아니다.
- DEFAULT CHARACTER SET utf8 
- ENGINE 

```sql
create Table nodejs.comments(id INT NOT NULL AUTO_INCREMENT, commenter INT NOT NULL, comment VARCHAR(100) NOT NULL, created_at DATETIME NOT NULL DEFAULT now(), PRIMARY KEY(id), INDEX commenter_idx(commenter ASC), CONSTRAINT commenter FOREIGN KEY (commenter) REFERENCES nodejs.users (id) ON DELETE CASCADE ON UPDATE CASCADE) COMMENT = '댓글' DEFAULT CHARSET=utf8mb4 ENGINE=InnoDB;
```

commenter 컬럼에는 댓글을 작성한 사용자의 id 를 저장한다. 이렇게 다른 테이블의 기본 키를 저장하는 컬럼을 외래키라고 부른다. CONSTRAINT [제약조건명] FOREIGN KEY[컬럼명] REFERENCES [참고하는 컬럼명]으로 외래키를 지정할 수 있다. ON UPDATE ON DELETE 는 모두  CASCADE로 설정했다. 사용자 정보가 수정되거나 삭제되면 그것과 연결된 댓글 정보도 같이 수정하거나 삭제한다는 뜻이다. 그래야 데이터가 불일치하는 현상이 생기지 않는다.

### 7.5.2 read
```sql
select * from nodejs.users;
select name, age from nodejs.users where married = 1 and age > 30;
select id, name from nodejs.users orderby age desc;
select id, name from nodejs.users orderby age desc limit 1;

```


### 7.5.3 update (수정)

수정은 데이터베이스에 있는 데이터를 수정하는 작업이다. 

```sql
update nodejs.users set comment = '바꿀 내용' where id = 2;


```


### 7.5.4 delete(삭제)

delete(삭제)는 데이터베이스에 있는 데이터를 삭제하는 작업이다. 
```sql
delete from nodejs.users where id = 2;

```


## 7.6 sequelize

노드에서 mysql데이터베이스에 접속해보자 mysql작업을 쉽게 할 수 있도록 도와주는 라이브러리가있다 바로 시퀄라이즈이다. 

시퀄라이즈는 ORM 으로 분류된다. ORM은 자바스크립트 객체와데이터 베이스의 릴레이션을 매핑해주는 도구이다. 시퀄라이즈를 오로지 mysql과 같이 써야하는 것은아니다 다른데이터베이스도 가능하다. 시퀄라이즈를 쓰는 이유는 자바스크립트 구문을 알아서 sql로 바꿔주기 때문이다. 따라서 sql언어를 직접 사용하지 않아도 자바스크립트만으로 mysql을 조작할 수 있고 sql을 몰라도 mysql을 어느정도 다룰수 있게 된다. 물론 sql를 모르는 채로 시퀄라이즈를 사용하는 것을 권장하지 않는다.

sequelize-cli는 시ㅜ컬라이즈 명령어를 실행하기 위한 패키지이고 mysql2는  mysql과 시퀄라이즈를 이어주는 드라이버이다. mysql2자체가 데이터베이스 프로그램은 아니므로 오해하면 안된다.

force: false 라는 옵션 이옵션을 true로 하면 서버 실행시마다 테이블을 재생성한다. 테이블을 잘못 만든 경우에 true 로 설정하면된다.


### 7.6.2 모델 정의하기
mysql에서 정의한 테이블을 시퀄라이즈에서도 정의해야한다. mysql의 테이블은 시퀄라이즈의 모데로가 대응된다. 시퀄라이즈는 모델과 mysql의 테이블을 연결해주는 역할을 한다. User와 Comment 모델을 만들어 users 테이블과 comments 테이블에 연결해보자 시퀄라이즈는 기본적으로 모델 이름은 단수형으로 테이블 이름은 복수형으로 사용한다. 모델은 크게 static init 과 static associate 메서드로 나뉜다. init 메서드에는 테이블에 대한 설정을 하고 associate 메서드에는 다른 모델과의관계를 적는다. 첫번째 인수가 테이블 컬럼에 대한 설정이고 두번째인수가 테이블 자체에 대한 설정이다. 시퀄라이즈는 알아서 id를 기본키로 연결하므로id 컬럼을 적어줄 필요가 없다. 


### 7.6.3 관계 정의하기

users 테이블과 comments 테이블 간의 관계를 정의해보자. 사용자 한명은 댓글을 여러개 작성할 수 있다. 하지만 댓글 하나에 사용자가 여러명일수는 없다. 이러한 관계를 일대다 관계라고 한다. 1:N관계에서는 사용자가 1이고 댓글이 N이다.

다른관계로 일대일 다대다 관계가 있다. 일대ㅣㅇ로간계로는 사용자와 사용자에 대한 정보 테이블을 예로 들수 있다. 다대다관계로는 게시글 테이블과 해시태그 테이블 관계를 예로 들수 있다. 한 게시글에는 해시태그가 여러개 달릴 수 있고 한 해시태그도 여러게시글에 달릴 수 있다. 이러한 관계를 다대다 관계라고 한다. mysql에서는 join기능으로 여러 테이블 간의 관계를 파악해 결과를 도출한다. 시퀄라이즈는 join기능도 알아서 구현한다. 대신 테이블 간에 어떠한 관계가 있는지 시퀄라이즈에 알려야한다.

시퀄라이즈는 저으이한대로 모델간 관계를 파악해서 comment 모델에 foreignkey 인 commeter 칼럼을 추가한다. 

hasMany 메서드에서는 sourceKey 속성에 id 를 넣고 belongsTo메서드에서는 targetKey 속성에 id를 넣는다. 

시퀄라이즈는 워크벤치가 테이블을 만들 때 실행했던 구문과비슷한 SQL문을 만든다. 


#### 7.6.3.2 1:1
1:1 관계에서는 hasMany 메서드 대신 hasOne 메서드를 사용한다. 사용자 정보를 담고 있는 가상의 Info모델이 있다고하면 다음과 같이 표현할 수 있다. 
```js
db.User.hasOne(db.Info, {foreignKey: 'UserId', sourceKey: 'id'})
db.Info.belongsTo(db.User, {foreignKey: 'UserId', targetKey: 'id'})
```


### 7.6.4 쿼리 알아보기
시퀄라이즈로 CRUD작업을 하려면 먼저 시퀄라이즈 쿼리를 알아야한다. SQL문을 자바스크립트로 생성하는 것이라 시퀄라이즈만의 방식이 있다. 쿼리는 프로미스를 반환하므로then을 붙여서 결괏값을 받을 수 있다. async/await 문법과 같이 사용할 수도 있다. 

```
INSERT INTO nodejs.users (name, age, married, comment) values ('zero',24, 0 , 'ㅋㅋ');

const {User} = require('../models);
User.create({
    name: 'zero',
    age: 24,
    married: false,
    comment: '자기소개'
})
```


models 모듈에서 User모델을 불러와 create메서드를 사용한다. 주의할점은 mysql의 자료형이 아니라 시퀄라이즈 모델에 정의한 자료형대로 넣어야한다는 것이다. married 가 0이 아니라 false인 이유이다. 시퀄라이즈가 알아서 mysql자료형으로 바꾼다. 자료형이나 옵션에 부합하지 않는 데이터를 넣었을 때는 시퀄라이즈가 에러를 발생시킨다. 이번에는 로우를 조회하는 쿼리들이다.

```
select * from nodejs.users;
User.findAll({})

select name, married from nodejs.users;
User.findAll({
    attributes: ['name', 'married']
})

select id, name from users where married = 0 or age > 30;
const {Op} =require('sequelize)
const {User} = require('../models')

User.findAll({
    attributes: ['id', 'name'],
    where : {
        [Op.or] : [{ married: false} , {age: [Op.gt]:30}]
    }
})
```

findOne 이나 findAll 메서드를 호출할 때 프로미스의 결과로 모델을 반환한다.

User모델의 정보에도 바로 접근할 수 있지만 더 편리한 점은 관계쿼리를 지원한다는 것이다.  어떤 모델과 관계가 있는지 include 배열에 넣어주면된다. 배열인 이유는 다양한 모델과 관계가 있을 수 있기 때문이다. 
관계를 설정했다면 getComments, setComments, addComment , addComments,removeComments메서드를 지원한다. 동사 뒤에 모델의 이름이 붙는 형식이다.

동사 뒤의 모델 이름을 바꾸고 싶다면 관계 설정시 as옵션을 사용할 수 있다. 


### 7.6.5 쿼리 수행하기 

모델에서 데이터를 받아 페이지를 렌더링하는 방법과 json형식으로 데이터를 가져오는 방법을 알아보자.

