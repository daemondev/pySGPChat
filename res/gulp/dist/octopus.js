//https://www.typescriptlang.org/docs/handbook/classes.html
var Octopus = /** @class */ (function () {
    function Octopus(theName) {
        this.numberOfLegs = 8;
        this.name = theName;
    }
    return Octopus;
}());
var dad = new Octopus("Man with the 8 strong legs");
//dad.name = "Man with the 3-piece suit"; // error! name is readonly.
var iGreeter = /** @class */ (function () {
    function iGreeter(message) {
        this.greeting = message;
    }
    iGreeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return iGreeter;
}());
//let greeter: iGreeter;
greeter = new iGreeter("world");
console.log(greeter.greet());
