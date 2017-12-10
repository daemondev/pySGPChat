class Person {
    protected name: string;
    protected constructor(theName: string) { this.name = theName; }
}

// iEmployee can extend Person
class iEmployee extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard = new iEmployee("Howard", "Sales");
//let john = new Person("John"); // Error: The 'Person' constructor is protected
