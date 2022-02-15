class InsurancePolicy {}
// function makeInsurable(o) {
//   o.addInsurancePolicy = function (p) {
//     this.InsurancePolicy = p;
//   };
//   o.getInsurancePolicy = function () {
//     return this.InsurancePolicy;
//   };
//   o.isInsurred = function () {
//     return !!this.InsurancePolicy;
//   };
// }
const ADD_POLICY = Symbol();
const _POLICY = Symbol();
function makeInsurable(o) {
  o[ADD_POLICY] = function (p) {
    this.s[_POLICY] = p;
  };
}
let o = {};
makeInsurable(o);
console.log(o);
