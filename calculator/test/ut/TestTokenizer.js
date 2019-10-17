const Tokenizer = require("../../src/operators/tokenizer")
const assert = require("assert")

describe("TestTokenizer", ()=>{
    sut = new Tokenizer;
    
    beforeEach(()=>{sut = new Tokenizer})
    
    it("IfNotAString_ShouldReturn 0",()=>{
        assert.equal(sut.tokenize(1), 0);
    })
})

