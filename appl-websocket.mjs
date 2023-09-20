import { es } from "@faker-js/faker";
import { WebSocketServer } from "ws";
import { PromptAsync } from "./PromptAsync.js";
//import PromptSync from "prompt-sync";
const wss = new WebSocketServer({port: 8030})
//const promptSync = PromptSync();
const promptAsync = new PromptAsync();

wss.on('listening', ()=> {
    console.log(`server is listening on port 8030`);
})
wss.on('connection', (ws, req) => {
    console.log(`connection from ${req.socket.remoteAddress} established`);
    console.log(`body inside request ${req.body}`);
    ws.send('hello');
    ws.on('close', () => {
        console.log(`connection from ${req.socket.remoteAddress} closed`);
    });
    ws.on(`message`, async message => {
       // console.log(message.toString());   //beacuse message it is an array of bytes
     // const answer = promptSync(message.toString());
        const answer = await promptAsync.prompt(message.toString());
      ws.send(answer);
    })
    
})