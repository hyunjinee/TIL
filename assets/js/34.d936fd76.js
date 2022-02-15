(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{442:function(s,t,a){"use strict";a.r(t);var n=a(56),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"클래스와-인터페이스"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#클래스와-인터페이스"}},[s._v("#")]),s._v(" 클래스와 인터페이스")]),s._v(" "),a("p",[s._v("객체지향 프로그래밍언어를 사용하는 대부분의 프로그래머에게 클래스란 필수 양식과도 같은 존재다. 클래스는 코드를 조직하고 이해할 수 있는 방법을 제공할 뿐 아니라, 캡슐화의 주요 단위이기도하다. 타입스크립트의 클래스의 기능 대부분은 C#에서 빌려왔으며 가시성 한정자, 프로퍼티 초기자(property initializer), 다형성, 데코레이터, 인터페이스등을 지원한다.")]),s._v(" "),a("p",[s._v("타입스크립트 클래스를 컴파일하면 일반 자바스크립트 클래스가 되므로 믹스인같은 자바스크립트 표현식도 타입안정성을 유지하며 사용할 수 있다. 프로퍼티 초기화와 데코레이터 같은 타입스크립트 기능 일부는 자바스크립트에서도 지원하므로 실제 런타임 코드를 생성한다. 반면 가시성 접근자, 인터페이스 ,제네릭등은 타입스크립트만의 고유 기능이므로 컴파일 타임에만 존재하며 응용프로그램을 자바스크립트로 컴파일 할 때는 아무 코드도 생성되지 않는다.")]),s._v(" "),a("h3",{attrs:{id:"super"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#super"}},[s._v("#")]),s._v(" super")]),s._v(" "),a("p",[s._v("자바스크립트 처럼 타입스크립트도 super 호출을 지원한다. 자식 클래스가 부모 클래스에 정의된 메서드를 오버라이드하면 자식 인스턴스는 super를 이용해서 부모 버전의 메서드를 호출할 수 있다. 타입스크립트는 다음처럼 두가지 버전의 super호출을 지원한다.")]),s._v(" "),a("ul",[a("li",[s._v("super.take  같은 메서드 호출")]),s._v(" "),a("li",[s._v("생성자 함수에서만 호출할 수 있는 super()라는 특별한 타입의 생성자 호출, 자식 클래스에 생성자 함수가 있다면 super()를 호출해야 부모 클래스와 직접적으로 연결된다. 이호출을 잊으면 타입스크립트가 경고해주므로 걱정할 필요 없다.")])]),s._v(" "),a("p",[s._v("super로 부모 클래스의 메서드에만 접근할 수 있고 프로퍼티에는 접근할 수 없다는 사실을 기억하자.")]),s._v(" "),a("h3",{attrs:{id:"인터페이스"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#인터페이스"}},[s._v("#")]),s._v(" 인터페이스")]),s._v(" "),a("p",[s._v("클래스는 인터페이스를 통해 사용할 때가 많다.\n타입 별칭처럼 인터페이스도 타입에 이름을 지어주는 수단이므로 인터페이스를 사용하면 타입을 더 깔끔하게 정의할 수 있다. 타입 별칭과 인터페이스는 문법만 다를 뿐 거의 같은 기능을 수행한다.")]),s._v(" "),a("p",[s._v("다음은 타입 별칭이다.")]),s._v(" "),a("div",{staticClass:"language-ts extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ts"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("type")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Sushi")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    calories"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("number")]),s._v("\n    salty"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("boolean")]),s._v("\n    tasty"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("boolean")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),a("p",[s._v("이를 다음처럼 간단하게 인터페이스로 바꿀수 있다.")]),s._v(" "),a("div",{staticClass:"language-ts extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ts"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("interface")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Sushi")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    calories"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("number")]),s._v("\n    salty"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("boolean")]),s._v("\n    tasty"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("boolean")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),a("p",[s._v("Sushi 타입 별칭을 사용한 모든곳에 Sushi인터페이스를 대신 사용할 수 있다. 둘다 형태를 정의하며 두 형태 정의는 서로 할당할 수 있다. (실제로 둘은 같은 존재다.)\n타입을 조합하기 시작하면 더 흥미로운 일이 벌어진다. Sushi 외에 다른 음식을 만들어보자.")]),s._v(" "),a("div",{staticClass:"language-ts extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ts"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("type")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Cake")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    calories"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("number")]),s._v("\n    sweet"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("boolean")]),s._v("\n    tasty"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("boolean")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),a("p",[s._v("Sushi와 Cake뿐 아니라 많은 음식이 칼로리와 tasty를 포함한다. 그러니 Food라는 타입을 따로 빼서 공통 정보를 정의하고 다른 음식들도 Food를 이용해 다시 정의해 보자.")]),s._v(" "),a("div",{staticClass:"language-ts extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ts"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("type")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Food")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    calories"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("number")]),s._v("\n    tasty"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("boolean")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("type")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Sushi")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" Food "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    salty"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("boolean")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("type")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Cake")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" Food "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    sweet"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("boolean")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),a("p",[s._v("이 코드를 인터페이스로 정의하면 다음과 같다.")]),s._v(" "),a("div",{staticClass:"language-ts extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ts"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("interface")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Food")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    calories"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("number")]),s._v("\n    tasty"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("boolean")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("interface")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Sushi")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("extends")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Food")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    salty"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("boolean")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("interface")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Cake")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("extends")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Food")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    sweet"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("boolean")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),a("blockquote",[a("p",[s._v("인터페이스가 반드시 다른 인터페이스를 상속받아야 하는 것은 아니다. 사실 인터페이스는 객체 타입, 클래스, 다른 인터페이스를 모두 상속 받을 수 있다.")])]),s._v(" "),a("p",[s._v("타입과 인터페이스는 뭐가다를까? 미묘하지만 세가지 면에서 차이가 난다. 첫째 타입 별칭은 더 일반적이어서 타입 별칭의 오른편에는 타입 표현식( 타입 그리고  & | 같은 타입 연산자 )를 포함한 모든 타입이 등장할 수 있다. 반면 인스턴스의 오른편에는 반드시 형태가 나와야한다. 예를 들어 다음과 같은 타입 별칭코드는 인터페이스로 다시 작성할 수 없다.")]),s._v(" "),a("div",{staticClass:"language-ts extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ts"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("type")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("A")])]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("number")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("type")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("B")])]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("A")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("string")]),s._v("\n")])])]),a("p",[s._v("둘째 인터페이스를 상속할 때 타입스크립트는 상속 받는 인터페이스의 타입에 상위 인터페이스를 할당 할수 있는지를 확인한다. 다음 예를 살펴보자.")]),s._v(" "),a("div",{staticClass:"language-ts extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ts"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("interface")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("A")])]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("good")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("x"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("number")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("string")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("bad")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("x"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("number")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("string")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("interface")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("B")])]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("extends")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("A")])]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("good")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("x"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("string")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("number")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("string")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("bad")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("x"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("string")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("string")]),s._v(" \n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n")])])]),a("p",[s._v("인터 섹션 타입을 사용하면 상황이 달라진다. 앞의 예에서 인터페이스는 타입 별칭으로 바구고 extends 는 인터섹션(&)로 바꾸면 타입스크립트는 확장하는 타입을 최대한 조합하는 방향으로 동작한다. 결과적으로 컴파일 에러가 발생하지 않고  bad를 오버로드한 시그니처가 만들어진다.\n객체 타입의 상속을 표현할 때 인터페이스에 제공되는 타입스크립트의 할당성 확인 기능을 이용하면 쉽게 에러를 검출할 수 있다.\n셋째, 이름과 범위가 같은 인터페이스가 여러개 있다면 이들이 자동으로 합쳐진다.같은 조건에서 타입별칭이 여러개 있다면 컴파일 타임 에러가 난다. 이를 선언 합침이라고 부른다.\n선언 합침(declaration merging) 은 같은 이름으로 정의된 여러 정의를 자동으로 합치는 타입스크립트의 기능이다.\n예를 들어서 User라는 똑같은 이름의 인터페이스를 두개 정의하면 타입스크립트는 자동으로 둘을 하나의 인터페이스로 합친다.")]),s._v(" "),a("div",{staticClass:"language-ts extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ts"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("interface")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("User")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    name"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("string")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("interface")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("User")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    age "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("number")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" a "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" User "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    name "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'Ashely'")]),s._v("\n    age"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("30")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n")])])]),a("p",[s._v("위 코드를 타입 별칭으로 하면 중복된 식별자 에러가난다. 한편 인터페이스 끼리는 충돌 해서는 안된다. 한타입의 프로퍼티는 T와 다른 타입의 프로퍼티 U가 동일하지 않다면 에러가 발생한다.")]),s._v(" "),a("div",{staticClass:"language-ts extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ts"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("interface")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("User")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    age"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("string")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("interface")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("User")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    age "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("number")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 에러 : 다른 프로퍼티 선언도 다른 타입을 가져야함 ")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 프로퍼티 age 는 반드시 string 타입이어야하는데 number 타입으로 선언함.")]),s._v("\n\n제네릭을 선언한 인터페이스들의 경우 제네릭들의 선언 방법과 이름까지 똑같아야 합칠수 있다"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("\n\n")])])]),a("p",[s._v("클래스를 선언할 때 implements 라는 키워드를 이용해 특정 인터페이스를 만족시킴을 표현할 수 있다. 다른 명시적인 타입 어노테이션처럼 implements로 타입 수준의 제한을 추가하면 구현에 문제가 있을 때 어디가 잘못되었는지 쉽게 파악할 수 있다. 인터페이스로 인스턴스 프로퍼티를 정의할 수 있지만 가시성 한정자는 선언할 수 없으며 static 키워드도 사용할 수 없다. 객체안의 객체타입처럼 인스턴스 프로퍼티를 readonly로 설정할 수 있다.")]),s._v(" "),a("p",[s._v("인터페이스 구현은 추상클래스 상속과 아주 비슷하다. 인터페이스가 더 범용으로 쓰이며 가벼운 반면, 추상클래스는 특별한 목적과 풍부한 기능을 갖는다는 점이 다르다.")]),s._v(" "),a("p",[s._v("인터페이스는 형태를 정의하는 수단이다. 값수준에서 이는 객체 배열 함수 클래스, 클래스 인스턴스를 정의할 수 있다는 뜻이다. 인터페이스는 아무런 자바스크립트 코드를 만들지 않으며 컴파일 타임에만 존재한다.\n추상클래스는 오직 클래스만 정의할 수 있다. 예상할 수 있겠지만 추상 클래스는 런타임 자바스크립트 클래스 코드를 만든다.추상 클래스는 생성자와 기본 구현을 가질수 있으며 프로퍼티와 메서드에 접근 한정자를 지정할 수 있다. 모두 인터페이스에는 제공되지 않는 기능이다. 인터페이스와 추상 클래스 중 무엇을 사용할지는 상황에 따라 다르다. 여러 클래스에서 공유하는 구현이라면 추상클래스를 사용해야 하고, 가볍게 이 클래스는 T다. 라고 말하는 것이 목적이라면 인터페이스를 사용하자.\n타입스크립트는 클래스를 비교할 때 다른 타입과 달리 이름이 아니라 구조를 기준으로 삼는다. 클래스는 자신과 똑같은 프로퍼티와 메서드를 정의하는 기존의 일반 객체를 포함해 클래스의 형태를 공유하는 다른 모든 타입과 호환된다. 예를 들어서 아래와 같은 코드를 보자")]),s._v(" "),a("div",{staticClass:"language-ts extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ts"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Zebra")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("trot")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("...")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Poodle")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("trot")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("...")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("ambleAround")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("animal"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" Zebra "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    animal"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("trot")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" zebra "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Zebra")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" podle "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("poodle")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("ambleAround")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("zebra"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// ok")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("ambleAround")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("podle"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// ok")]),s._v("\n")])])]),a("p",[s._v("함수의 관점에서 두 클래스가 .trot을 구현하며 서로 호환되므로 아무 문제가 없다. 이름으로 클래스의 타입을 구분하는 언어라면, 에러를 발생시키겠지만 타입스크립트는 구조를 기준으로 삼으므로 이 코드는 정상 동작한다.")]),s._v(" "),a("p",[s._v("클래스를 다룰 때는 이 변수는 이 클래스의 인스턴스여야 한다라고 표현할 수 있는 방법이 필요한데, 이는 열거형도 마찬가지이다 .\n함수와 타입처럼 클래스와 인터페이스도 기본값과 상한/하한 설정을 포함한 다양한 제네릭 타입 매개변수 기능을 지원한다. 제네릭 타입의 범위는 클래스나 인터페이스 전체가 되게 할 수 도 있고 특정 메서드로 한정할 수도 있다.")]),s._v(" "),a("p",[s._v("constructor 에서는 제네릭 타입을 선언할 수 없음을 기억하자. constructor 대신 class선언에 사용해야한다.\n정적 메서드는 클래스 인스턴스 변수에 값 수준에서 접근할수 없듯이 클래스 수준의 제네릭을 사용할 수 없다. 따라서 정적 메서드에서 선언한 자신만의 제네릭을 갖는다. 인터페이스에도 제네릭을 사용할 수 있다.")]),s._v(" "),a("div",{staticClass:"language-ts extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ts"}},[a("code",[s._v("interfface MyMap"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("K")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("V")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("get")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("key"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("K")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("V")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("set")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("key"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("K")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" value"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[s._v("V")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("void")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),a("h3",{attrs:{id:"mixin"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#mixin"}},[s._v("#")]),s._v(" mixin")]),s._v(" "),a("p",[s._v("js와 ts는 trait나 mixin 키워드를 제공하진 않지만 손쉽게 직접 구현할 수 있다. 두 키워드 모두 둘이상의 클래스를 상속받는 다중 상속과 관련된 기능을 제공하며, 역할 지향 프로그래밍을 제공한다. 역할 지향 프로그래밍에서는 이것은 Shape이에요.라고 표현하는 대신 측정할 수 있어요. 네게의 변을 가지고있어요 처럼 속성을 묘사하는 방식을 사용한다. 즉 is-a관계대신 can has-a관계를 사용한다.")]),s._v(" "),a("h3",{attrs:{id:"데코레이터"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#데코레이터"}},[s._v("#")]),s._v(" 데코레이터")]),s._v(" "),a("p",[s._v("데코레이터는 타입스크립트의 실험적 기능으로 클래스, 클래스 메서드 프로퍼티, 메서드 매개변수를 활용한 메타프로그래밍에 깔끔한 문법을 제공한다. 데코레이터는 장식하는 대상의 함수를 호출하는 기능을 제공하는 문법이다.\n데코레이터는 장식하는 대상의 함수를 호출하는 기능을 제공하는 문법이다.\nexperimentalDecorators 테코레이터는 아직 실험 단계의 기능이다. 즉 미래에도 호환된다는 보장이 없고 아예 타입스크립트에서 삭제될수 있으므로 TSC플래그를 따로 설정해야 사용할 수 있다.")]),s._v(" "),a("h3",{attrs:{id:"final타입스크립트는-클래스나-메서드에-final키워드를-지원하지-않지만-클래스에서-final-키워드-효과를-흉내내기-어렵지-않다-객체-지향-언어를-많이-사용해보지-않은-독자를-위해-설명하자면-final키워드는-클래스나-메서드를-확장하거나-오버라이드할-수-없게-만드는-기능이다"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#final타입스크립트는-클래스나-메서드에-final키워드를-지원하지-않지만-클래스에서-final-키워드-효과를-흉내내기-어렵지-않다-객체-지향-언어를-많이-사용해보지-않은-독자를-위해-설명하자면-final키워드는-클래스나-메서드를-확장하거나-오버라이드할-수-없게-만드는-기능이다"}},[s._v("#")]),s._v(" final타입스크립트는 클래스나 메서드에 final키워드를 지원하지 않지만 클래스에서 final 키워드 효과를 흉내내기 어렵지 않다. 객체 지향 언어를 많이 사용해보지 않은 독자를 위해 설명하자면 final키워드는 클래스나 메서드를 확장하거나 오버라이드할 수 없게 만드는 기능이다.")]),s._v(" "),a("p",[s._v("타스에서는 비공개 생성자(private constructor)를 이용해서 final 클래스를 흉내낼 수 있다.")]),s._v(" "),a("div",{staticClass:"language-ts extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ts"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("MessageQueue")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("private")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("contstructor")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("private")]),s._v(" messages"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("string")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("BadQueue")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("extends")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("MessageQueue")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 클래스를 확장할수 없음 클래스의 생성자가 private 으로 설정됨")]),s._v("\n")])])]),a("p",[s._v("클래스 상속만 막아야하는 상황이지만 비공개 생성자를 이용하면 클래스를 인스턴스화 하는 기능도 같이 사라진다. 반면, final 클래스는 상속만막을뿐 인스턴스는 정상적으로 만들수 있다.")]),s._v(" "),a("div",{staticClass:"language-ts extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ts"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("MessageQueue")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("private")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("constructor")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("private")]),s._v(" messages"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("string")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("static")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("create")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("messages"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("string")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("MessageQueue")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("messages"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),a("h3",{attrs:{id:"builder-pattern"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#builder-pattern"}},[s._v("#")]),s._v(" builder pattern")]),s._v(" "),a("p",[s._v("갑자기 빌더패턴에 대해 알아보자. 빌더 패턴으로 객체의 생성과 객체 구현방식을 분리할 수 있다.\n제이쿼리나 ES6의 MAP,SET 등의 자료구조를 사용해봤다면 빌더 패턴에 친숙할 것이다.")]),s._v(" "),a("div",{staticClass:"language-ts extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ts"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("RequestBuilder")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("setURL")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'/users'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("setMethod")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'get'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("setData")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("firstName"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'Anna'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("send")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])])]),a("p",[s._v("빌더 패턴 클래스에 대해 한번 적어보겠다.")]),s._v(" "),a("div",{staticClass:"language-ts extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ts"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("RequestBuilder")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("private")]),s._v(" data"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" object "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("null")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("null")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("private")]),s._v(" method"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'get'")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'post'")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("null")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("null")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("private")]),s._v(" url"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("string")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("null")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("null")]),s._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("setMethod")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("method"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'get'")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'post'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("this")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("method "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" method\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("this")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 다른 메서도도 동일")]),s._v("\n\n\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n")])])])])}),[],!1,null,null,null);t.default=e.exports}}]);