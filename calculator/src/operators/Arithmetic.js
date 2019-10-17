class Arithmetic {
    constructor() { }
    verifyInput(x, y) { return (typeof x === "number"  && typeof y === "number"); }
    add(x,y) { return this.verifyInput(x, y) ? (x + y) : 0; }
    subtract(x, y){ return this.verifyInput(x, y) ? (x - y) : 0; } 
    multiply(x, y){ return this.verifyInput(x, y) ? (x * y) : 0; } 
    divide(x, y){ return (this.verifyInput(x, y) && y !== 0 ) ? (x / y) : 0; } 
    modulo(x, y){ return (this.verifyInput(x, y) && y !== 0 ) ? (x % y) : 0; }     
};

module.exports = Arithmetic; 