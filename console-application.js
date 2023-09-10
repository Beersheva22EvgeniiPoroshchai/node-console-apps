import promptSync from 'prompt-sync';
import config from 'config';
const prompt = promptSync({sigint:true});   //exit from app command+c
const guessNumber = 1 + Math.trunc(Math.random() * 10);
if (config.has('test') && config.get('test')) {
    console.log(guessNumber);
}
let running = true;
do {
    let num = prompt("guess number from 1 to 10 --> ");
    if (num == guessNumber) {
        running = false;
        console.log("congratulations, you're the winner")
    } else {
        console.log("try again")
    }

} while (running);
