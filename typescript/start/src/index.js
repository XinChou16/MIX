"use strict";
var _a;
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
function foo1(data) {
    var data1 = 123;
    return data;
}
/* ?.  */
var obj = {
    a: 1,
    b: {
        c: 2
    }
};
var objc1 = obj.a;
var objc = obj === null || obj === void 0 ? void 0 : obj.a;
var objb = (_a = obj === null || obj === void 0 ? void 0 : obj.b) === null || _a === void 0 ? void 0 : _a.c;
var objb2 = obj === null || obj === void 0 ? void 0 : obj.b.c;
var myClass = /** @class */ (function () {
    function myClass() {
        // this.name = '';
    }
    myClass.prototype.sayName = function () { };
    ;
    return myClass;
}());
