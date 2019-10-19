const UserInterface = require("../io/ui")
class Tokenizer{
    constructor() {}
    
    validateInput(strIn){return typeof strIn === "string";}
    
    tokenize(strIn) {
        if(!this.validateInput(strIn)) {
            return 0;
        }
        let patt = new RegExp(/\d{1,3}[+\-\*/%]\d{1,2}/);
        let eq = patt.exec(strIn).toString();
        if (!eq) return 0;

        let res;
        let objRes = {
            firstOperand: 0,
            secondOperand: 1,
            operand: "+"
        };

        if (eq.match(/[+]/)) {
            objRes.operand = "add"; 
            res = eq.split("+");
        }
        else if (eq.match(/[-]/)) {
            objRes.operand = "subtract"; 
            res = eq.split("-");
        }
        else if (eq.match(/[\*]/)) {
            objRes.operand = "multiply"; 
            res = eq.split("\*");
        }
        else if (eq.match(/[/]/)) {
            objRes.operand = "divide"; 
            res = eq.split("/");
        }
        else if (eq.match(/[%]/)) {
            objRes.operand = "modulo"; 
            res = eq.split("%");
        }
        objRes.firstOperand = parseInt(res[0]);
        objRes.secondOperand = parseInt(res[1]);
        return objRes;   
    }
}

module.exports = Tokenizer