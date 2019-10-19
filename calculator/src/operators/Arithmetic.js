class Arithmetic {
    constructor() { 
        this.operations = {
            "add": (x, y) => { return (x + y); },
            "subtract": (x, y) => { return (x - y); }, 
            "multiply": (x, y) => { return (x * y); }, 
            "divide": (x, y) => { return y !== 0  ? (x / y) : 0; }, 
            "modulo": (x, y) => { return y !== 0  ? (x % y) : 0; },
    }}

    solve({operand, firstOperand, secondOperand}){
        return this.operations[operand](firstOperand,secondOperand);
    }
};

module.exports = Arithmetic; 