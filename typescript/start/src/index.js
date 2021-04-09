"use strict";
exports.__esModule = true;
require("./transfer");
var a = 10;
var b = '12';
var nameMe = {
    first: 'Xin',
    // age: 18,
    sex: 0
};
/* 泛型 */
function reverse(list) {
    var result = [];
    return list.reverse();
}
var result = reverse([1, 2, 3]);
var list = [];
myPoint.z = 1;
/* 枚举 */
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 3] = "Blue";
})(Color || (Color = {}));
var color = Color.Red;
// 字符串类型
var Action;
(function (Action) {
    Action["SET_DATE"] = "SET_DATE";
    Action["SET_SECONDS"] = "SET_SECONDS";
})(Action || (Action = {}));
var action = Action.SET_DATE;
var foo = 123;
var bar = foo.toString();
window.helloWorld;
