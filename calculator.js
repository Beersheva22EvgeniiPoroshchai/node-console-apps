//Controller
import http from 'node:http';
import config from 'config';
import {operations} from './config/operations.js'
import {writeError} from './service/view/CalculatorView.js'
import {URL, URLSearchParams} from 'url'
import CalculatorService from './service/CalculatorService.js';
import CalculatorView from './service/view/CalculatorView.js';
const view = new CalculatorView();
const server = http.createServer();
const port = process.env.PORT || config.has('server.port') && config.get('server.port') || 0;
const calculatorService = new CalculatorService(server, operations);
server.listen(port, () => console.log(`server is listening on the port ${server.address().port}`))
server.on('request', (request, response) => {
    response.setHeader('content-type', 'text/html')
    const reqUrl = new URL(`http://${request.headers.host}${request.url}`);
    if (!operations.has(reqUrl.pathname)) {
        (writeError(reqUrl.pathname + " Unknown operation", res));
    } else {
        
    }

    let result;
    const operands = reqUrl.searchParams;   //map with operands
    const op1 = +operands.get('op1');  //value of op1
    const op2 = +operands.get('op2');
    
    // if (op1.NaN | op2.NaN) {
    //     view.getHtml(`${op1} or ${op2} are not numbers` ,true)
    // } 
server.emit('/add', [op1, op2], response);
 
    //validation: existing operation, wrong operand, operand not a number 
})
