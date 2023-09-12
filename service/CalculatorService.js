//service
import CalculatorView from "./view/CalculatorView.js";

 //from operations take route and do appropriate operation(in cycle)
//on constructor need to build emitters for all operations: different functionality from map
//calculatorService shoud build all handlers, only emiters and events, regarding to operations
//hardcode . need to build all based on operations. add new operation changes new operation.js

const view = new CalculatorView();                      
export default class CalculatorService {                
    constructor(emitter, operations) {                  
      for (const [operationName, operationFunction] of operations) {
        emitter.on (operationName, (operands, response) => {
           
           const areOperandsValid = operands.every((op) => typeof op === 'number' && !isNaN(op));
           if (!areOperandsValid) {
            response.write(view.getHtml(`${operands[0]} or ${operands[1]} invalid operands`, true))
           return;
           }

           if (!operationName) {
            response.write(view.getHtml(`${operationName} is unknown operation`, true))
           return;
           }
           
           
            const result = operationFunction(...operands);
            this.writeResult(result,response);
        })
      }
      
        // emitter.on("/add", (operands,response) => {     
        //    this.writeResult(operands[0] + operands[1], response)
        // }) 
    }
        writeResult(result, response) {
        response.write(view.getHtml(result, false));
        response.end();


        //handlers here(on controller): if absent operations in config, if not number, etc.
    }
}