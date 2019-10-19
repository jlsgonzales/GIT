const UserInterface = require("./ui.js");

class Keypad {
    constructor(_io){
        this.io = _io;
        this.keypressEvent = this.io.emitter();
    }
    power(press) {
        if (press == "on"){
            this.io.out("HELLO! WELCOME!");
            this.keypressEvent.on("enter", (data)=>{
                this.keypressEvent.emit("keypress", data);
            });
        }
        else if (press == "off") {
            this.io.exit();
        }
        else {
            this.io.out("Invalid Keypress");
        }
    }
    emitter(){
        return this.keypressEvent;
    }
}

module.exports = Keypad;