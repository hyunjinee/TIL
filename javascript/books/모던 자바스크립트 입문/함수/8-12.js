var Module = Module || {};
(function (_Module) {
  var name = "NoName";
  function getName() {
    return name;
  }
  _Module.showName = function () {
    console.log(getName());
  };
  _Module.setName = function (x) {
    name = x;
  };
})(Module);
Module.setName("Tom");
Module.showName();
// showName 메서드는 getName 을 참조 , setName 메서드는 name 을 참조, 이로인해 클로저가 생성, 즉시
// 실행 함수의 지역변수 name 과 지역함수 getName 은 클로저의 내부 상태로 저장
