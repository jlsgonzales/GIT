const EventEmitter = require("events").EventEmitter;
const readline = require("readline")

class UserInterface {
    constructor() 
    {
        this.rl = readline.createInterface({
            input : process.stdin,
            output : process.stdout,
            prompt: "EQ > "
        });
        this.eventEmitter = new EventEmitter();
        this.rl.on("line", (data)=>{
            this.eventEmitter.emit("enter", data.trim());
        });
        this.rl.on("close", ()=>{
            this.rl.pause();
            process.stdout.write("GOODBYE!");
            this.rl.resume();
        })
    }
    out(data) {
        this.rl.pause();
        process.stdout.write(data + "\n");
        this.rl.prompt();
        this.rl.resume();
    }
    in(question, cbk) {
        this.rl.question(question,cbk);
    }
    exit() {
        this.rl.close();
        process.exit();
    }
    prompt(newPrompt){
        if(newPrompt) {this.rl.setPrompt(newPrompt);}
        this.rl.prompt();
    }
    emitter(){
        return this.eventEmitter;
    }
};

module.exports = UserInterface;
