import fs from 'node:fs/promises'

export default DocTextService {
    async getDocumentation(file) {
        return await this.#getStream(file, true)
    }

    async getText(file) {
        return await this.#getStream(file, false)
    }

    #getStream(file, isDoc) {
            const handler = await fs.open(file) 
            let streamInput = handler.createReadStream();
            streamInput.setEncoding('utf-8'); 
            streamInput.flatMap(chunk => chunk.split('\n')).filter(line => {
                
                const res = line.trim.startsWith('//');
                return isDoc ? res : !res;
            }).map(line => isDoc ? line.substr('//') : line);
            return streamInput;
            }
    }
