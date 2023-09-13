import DocTextService from '../service/DocTextService.js' 
import fs from 'node:fs/promises' 

export default class RouterDocText {
        #docTextService
        constructor(emitter) {
            this.#docTextService = new DocTextService();
            emitter.addListener('/doc', (file, response) => this.documentation(file, response));   //or on
            emitter.addListener('/text', (file, response) => this.text(file, response));           //or on
        }

    async documentation(file, response) {
        console.log(`documentation route, file: ${file}`);
        const handler = await fs.open(file);    //open the file
        console.log(`response headers: ${response.getHeaderNames()}`);
        (await this.#docTextService.getDocumentation(handler)).pipe(response)  //response wrightable
        response.on('finished', ()=> response.end());
    }

    async text (file, response) {
        console.log(`text route, file: ${file}`);
        const handler = await fs.open(file);
        console.log(`response headers: ${response.getHeaderNames()}`);
        (await this.#docTextService.getText(handler)).pipe(response);
        response.on('finished', ()=>response.end());
        
    }

}