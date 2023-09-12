import fs from 'node:fs/promises';   //file system with promise
import http from 'node:http';    //http module
//streams theory:
//writable stream (write): Output stream
//readable stream (read): Input Stream
//duplex (write, read): TCP socket 
//transform: ZipLibrary
//Examples:
// <redable stream>.pipe(<writable stream>)   //all that in readable stream go on to the writable stream
// <socket stream>.map<request => protocol.getResponse(request)>.pipe(<socket stream>)   //socket close -> end the stream
//pipeline(<readable stream>, <transform stream>, <writable stream>)   //using ZipLibrary(transform)

const isComments = process.argv[2] == 'comments'
const fileInput = process.argv[3] || 'appl-streams.js';   //arguments of command line
const fileOutput = process.argv[4] || 'appl-streams-out';

const handlerInput = await fs.open (fileInput);  //fs all methods with promises
const handlerOutput = await fs.open (fileOutput, 'w')//w -> flag: wright, if not exists: wright, exists: rewright. just for output(wrighting)

//handlerInput.readFile('utf8').then(data => console.log(data));   //read file to console in utf-8 formatt
// const streamInput = handlerInput.createReadStream();   //create stream
// streamInput.setEncoding('utf-8')    //set 'utf-8' format
// streamInput.flatMap(chunk => chunk.split('\n')).filter(line => line.trim().startsWith('//')).map(line => line.substr(2))
// .forEach(line => console.log(line));   //stream works by chunks (pieces of file), not line, forEach: terminal operation
const streamOutput = handlerOutput.createWriteStream();

////////method return stream 

//getStreamWith(handlerInput, isComments).forEach(line => console.log(line))    //for aeach for terminal
getStreamWith(handlerInput, isComments).pipe(streamOutput);

 function getStreamWith(handler, isComments) {
 
let streamInput = handler.createReadStream();
streamInput.setEncoding('utf-8'); 
streamInput = streamInput.flatMap(chunk => chunk.split('\n')).filter(line => {
    const res = line.trim().startsWith('//');
    return isComments ? res : !res;
 }).
 map(line => isComments ? line.substr('//') : line);
return streamInput;
 }