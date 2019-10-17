const assert = require("assert").strict
const Arithmetic = require("../../src/operators/Arithmetic")

describe("TestArithmetic", ()=>{
    var sut = new Arithmetic;
    
    beforeEach(()=>{sut = new Arithmetic;})
    
    it("IfAdd_ShouldSum", ()=>{
        assert.strictEqual(sut.add(1, "a"), 0);
        assert.strictEqual(sut.add(4, 5), 9);
    })

    it("IfSubtract_ShouldDifference", ()=>{
        assert.strictEqual(sut.subtract(7,"a"), 0);
        assert.strictEqual(sut.subtract(3,1), 2);
        assert.strictEqual(sut.subtract(1,3), -2);
    })

    it("IfMultiply_ShouldProduct", ()=>{
        assert.strictEqual(sut.multiply(2,"a"), 0);
        assert.strictEqual(sut.multiply(3,2), 6);
    })

    it("IfDivide_ShouldQuotient", ()=>{
        assert.strictEqual(sut.divide(7,"a"), 0);
        assert.strictEqual(sut.divide(3,0), 0);
        assert.strictEqual(sut.divide(9,3), 3);
    })

    it("IfModulo_ShouldRemainder", ()=>{
        assert.strictEqual(sut.modulo(7,"a"), 0);
        assert.strictEqual(sut.modulo(3,1), 0);
        assert.strictEqual(sut.modulo(9,2), 1);
    })
});