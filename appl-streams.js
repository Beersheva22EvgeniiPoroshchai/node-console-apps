import http from 'node:http';
import {URL} from 'node:url';
import config from 'config';
import RouterDocText from './routes/Router.js';
const SERVER_PORT = 'server.port'

const server = http.createServer();
new RouterDocText(server);
const port = process.env.PORT || config.has(SERVER_PORT) && config.get(SERVER_PORT) || 0
server.listen(port, () => console.log(`server listening on port ${server.address().port}`));
server.on('request', (req, response) => {
    const request = new URL(`http://${req.headers.host}${req.url}`);
    const file = request.searchParams.get('file');   //searchParams - map
    console.log(`request type: ${request.pathname}; file name is ${file}`);
    server.emit(request.pathname, file, response);
    
})
