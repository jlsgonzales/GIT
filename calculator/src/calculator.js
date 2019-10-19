const Keypad = require("./io/keypad")
const Tokenizer = require("./operators/tokenizer")
const UserInterface = require("./io/ui")
const Arithmetic = require("./operators/Arithmetic")

class Calculator {
    constructor(){
        this.ui = new UserInterface();
        this.keypad = new Keypad(this.ui);
        this.keypressEvents = this.keypad.emitter();
        this.tokenizer = new Tokenizer();
        this.solver = new Arithmetic();
    }
    turnOn(){
        this.keypad.power("on");
        this.keypressEvents.on("keypress", (data)=>{this.onEquation(data);});
    }

    turnOff() {
        this.keypad.power("off");
    }

    onEquation(data){
        if (data == 'exit') {this.keypad.power("off"); return;}
        let tokenizedData = this.tokenizer.tokenize(data);
        if (!tokenizedData) return;

        this.ui.prompt("RES > ")
        let res = this.solver.solve(tokenizedData)
        this.ui.out(res);
        this.ui.prompt("EQ > ")
    }

    execute(){
        this.turnOn();
    }
};

module.exports = Calculator