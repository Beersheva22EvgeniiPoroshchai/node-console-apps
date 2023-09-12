import fs from 'node:fs/promises';   //file system with promise
import http from 'node:http';
//streams theory:
//writable stream (write): Output stream
//readable stream (read): Input Stream
//duplex (write, read): TCP socket 
//transform: ZipLibrary
//Examples:
// <redable stream>.pipe(<writable stream>)   //all that in readable stream go on to the writable stream
// <socket stream>.map<request => protocol.getResponse(request)>.pipe(<socket stream>)
//pipeline(<readable stream>, <transform stream>, <writable stream>)

const fileInput = process.argv[2] || 'appl-streams.js';
const fileOutput = process.argv[3] || 'appl-streams-out.js';
const handlerInput = await fs.open (fileInput);   //fs all methods with promises
const handlerOutput = await fs.open (fileOutput, 'w')

//handlerInput.readFile('utf8').then(data => console.log(data));   //read file to console in utf-8 formatt
// const streamInput = handlerInput.createReadStream();
// streamInput.setEncoding('utf-8')
// streamInput.flatMap(chunk => chunk.split('\n')).filter(line => line.trim().startsWith('//')).map(line => line.substr(2))
// .forEach(line => console.log(line));   //stream works by chunks (pieces of file), not line

const streamOutput = handlerOutput.createWriteStream();
//method return stream 
getStreamWith(handlerInput, true).forEach(line => console.log(line))
//getStreamWith(handlerInput, true).pipe(streamOutput)

function getStreamWith(handler, isComments) {
let streamInput = handler.createReadStream();
streamInput.setEncoding('utf-8'); 
streamInput.flatMap(chunk => chunk.split('\n')).filter(line => {
    
    const res = line.trim.startsWith('//');
    return isComments ? res : !res;
}).map(line => isComments ? line.substr('//') : line);
return streamInput;
}