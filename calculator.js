//Controller
import http from 'node:http';
import config from 'config';
import {operations} from './config/operations.js'
import {URL} from 'url'
import CalculatorService from './service/CalculatorService.js';
import CalculatorView from './view/CalculatorView.js';

const server = http.createServer();
const port = process.env.PORT || config.has('server.port') && config.get('server.port') || 0;
const calculatorService = new CalculatorService(server, operations);
const view = new CalculatorView();

server.listen(port, () => console.log(`server is listening on the port ${server.address().port}`))
server.on('request', (request, response) => {
    response.setHeader('content-type', 'text/html')
    const reqUrl = new URL(`http://${request.headers.host}${request.url}`);
    if (!operations.has(reqUrl.pathname)) {
        (writeError(`"${reqUrl.pathname.split("/")[1]}"`+ " Unknown operation", response ));
    } else {
        const operands = [];
        const error = getOperands(reqUrl, operands);
        if (error) {
            writeError(error, response); 
        } else {
            server.emit(reqUrl.pathname, operands, response);
        }
    }
})

    function getOperands(reqUrl, operandsAr) {
        const operands = reqUrl.searchParams;
        const op1 = operands.get('op1');
        const op2 = operands.get('op2');
        let res = '';
        if (op1 == undefined || isNaN(+op1)) {
            res = `Wrong or not exist "${op1}" operand`;
        }
        if (op2 == undefined || isNaN(+op2)) {
            res = `Wrong or not exist "${op2}" operand`;
        }
        if (!res) {
            operandsAr.push(+op1, +op2);
        }
        return res;
}


    function writeError(error, response) {
        response.write(view.getHtml(error, true));
        response.end();
    }
