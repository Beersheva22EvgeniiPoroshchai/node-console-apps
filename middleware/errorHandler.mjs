//error handler as middleware 
//set status of error and send the error as a text (not rendering) for singlepage app

//import { string } from "joi";

export default function errorHandler (err, req, res, next) {
    if (!res.statusCode || res.statusCode < 400) {    //!resStatusCode: status is undefined
        res.status(500);
    }
  
   
    res.send(typeof err === 'string' ? err : err.toString());
}
