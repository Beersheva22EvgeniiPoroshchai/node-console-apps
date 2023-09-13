import DocTextService from '../service/DocTextService.js'
import { DocTextView } from '../view/DocTextView.js';
import fs from 'node:fs/promises'
const docTextView = new DocTextView();

function pipeResponse(stream, response) {
    stream.map(line => docTextView.renderLine(line)).pipe(response)
}


export default class RouterDocText {
    #docTextService
    constructor(emitter) {
        this.#docTextService = new DocTextService();
        emitter.addListener('/doc', (file, response) => this.documentation(file, response));   //or on   file:searchParams in url
        emitter.addListener('/text', (file, response) => this.text(file, response));           //or on
    }

    async documentation(searchParams, response) {
        const file = searchParams.get('file');
        if (!file) {
         docTextView.renderError(`argument "file" missing`, response);
         return;   
        }

        console.log(`documentation route, file: ${file}`);
        try {
        const handler = await fs.open(file);    //open the file
        const stream = (await this.#docTextService.getDocumentation(handler))   //response wrightable
        pipeResponse(stream, response); 
        } catch (error) {
            docTextView.renderError(`file ${file} cannot be opened`, response)
        }
        
    }
    getRoutes() {
        return ["/doc", "/text"];
    }



    async text(searchParams, response) {
        const file = searchParams.get('file')
        if (!file) {
            docTextView.renderError(`argument "file" missing`, response);
            return;   
           }
        console.log(`text route, file: ${file}`);
        try {
            const handler = await fs.open(file);    //open the file
            const stream = (await this.#docTextService.getText(handler))   //response wrightable
            pipeResponse(stream, response); 
            } catch (error) {
                docTextView.renderError(`file ${file} cannot be opened`, response)
            }
        
    }

}