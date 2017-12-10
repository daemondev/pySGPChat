class iAnimal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

class Rhino extends iAnimal {
    constructor() { super("Rhino"); }
}

class Employee {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

let animal = new iAnimal("Goat");
let rhino = new Rhino();
let employee = new Employee("Bob");

animal = rhino;
