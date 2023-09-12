import DocTextService from '../service/DocTextService.js' 

export default class RouterDocText {
        #docTextService
        constructor(emitter) {
            this.#docTextService = new DocTextService();
            emitter.addListener('doc', (file, response) => this.documentation(file, response));
            emitter.addListener('text', (file, response) => this.text(file, response));
        }
    async documentation(file, response) {
        (await this.#docTextService.getDocumentation(file)).pipe(response)
        response.end();
    }
    async text (file, response) {
        (await this.#docTextService.getText(file)).pipe(response)
        response.end();
    }

}