import express from 'express'
import { users } from './routes/users.mjs';
import bodyParser from 'body-parser'
import morgan from 'morgan';
import config from 'config'
import errorHandler from './middleware/errorHandler.mjs';
import auth from './middleware/auth.mjs';
import cors from 'cors';
import { employees } from './routes/employees.mjs';
import expressWs from 'express-ws'



const app = express();   //create instance of express application
const expressWsInstant = expressWs(app);  //connect wsServer with express server 
const wss = expressWsInstant.getWss(); //get ws server

app.use(cors());
app.use(bodyParser.json());   //This middleware is used to parse JSON data from incoming HTTP requests. It Express appto understand and work with JSON data sent in the request body.
app.use(morgan('short'));
app.use(auth);   //if we need autorization we use it
app.ws('/employees/websocket', (ws, req) => {
    console.log(`connection from ${req.socket.remoteAddress} was eastablished, protokol: ${ws.protokol}`);
   // ws.send('hello');  //message get all of connected clients
    //wss.clients.forEach(socket => socket.send(`number of connections is ${wss.clients.size}`)) //clients - map(all sockets)
})
app.use((req, res, next) => {
    req.wss = wss;
    next();
})

app.use('/employees', employees)
// app.use((req, res, next) => {   //middleware (should be before routing, after won't work)
//     req.body.ad = 100;
//     next();
// })
app.use('/users', users);  //router
app.use(errorHandler);   //own errorHandler which set status of error and send the error as a text (not rendering) for singlepage app
const port = process.env.PORT || config.get('server.port')
const server = app.listen(port);
server.on('listening', () => console.log(`server is listening on port ${server.address().port}`));
