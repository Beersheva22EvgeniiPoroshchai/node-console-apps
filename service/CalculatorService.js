//service
import CalculatorView from "../view/CalculatorView.js";

 //from operations take route and do appropriate operation(in cycle)
//on constructor need to build emitters for all operations: different functionality from map
//calculatorService shoud build all handlers, only emiters and events, regarding to operations
//hardcode . need to build all based on operations. add new operation changes new operation.js

const view = new CalculatorView();                      
export default class CalculatorService {                
    constructor(emitter, operations) {                  
      
      Array.from(operations.entries()).forEach(operation => emitter.addListener(operation[0], (operands, response) => {
        this.writeResult(operation[1](operands[0], operands[1]), response)
      }))
  }
        
        writeResult(result, response) {
        response.write(view.getHtml(result, false));
        response.end();

    }
}