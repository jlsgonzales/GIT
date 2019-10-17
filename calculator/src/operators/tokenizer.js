class Tokenizer{
    constructor() {}
    
    validateInput(strIn){return typeof strIn === "string";}
    
    tokenize(strIn) {
        if(!this.validateInput(strIn)) {
            return 0;
        }

        return 1;
    }
}

module.exports = Tokenizer