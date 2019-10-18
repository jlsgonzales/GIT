const UserInterface = require("./ui.js");

class Keypad {
    constructor(){
        this.ui = new UserInterface();
        this.keypressEvent = this.ui.emitter();
    }
    power(press) {
        if (press == "on"){
            this.ui.out("HELLO! WELCOME!");
            this.keypressEvent.on("enter", (data)=>{
                this.ui.out("data");
            });
        }
        else if (press == "off") {
            this.ui.out("Goodbye!");
            this.ui.exit()
        }
        else {
            this.ui.out("Invalid Keypress");
        }
    }
}

var kp = new Keypad();
kp.power("on");
