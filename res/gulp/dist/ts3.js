var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Person = /** @class */ (function () {
    function Person(theName) {
        this.name = theName;
    }
    return Person;
}());
// iEmployee can extend Person
var iEmployee = /** @class */ (function (_super) {
    __extends(iEmployee, _super);
    function iEmployee(name, department) {
        var _this = _super.call(this, name) || this;
        _this.department = department;
        return _this;
    }
    iEmployee.prototype.getElevatorPitch = function () {
        return "Hello, my name is " + this.name + " and I work in " + this.department + ".";
    };
    return iEmployee;
}(Person));
var howard = new iEmployee("Howard", "Sales");
//let john = new Person("John"); // Error: The 'Person' constructor is protected
