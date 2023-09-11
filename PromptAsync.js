import readline from 'node:readline';
const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
export class PromptAsync {
  
     prompt(promptStr) {
       
        return new Promise(resolve => {
            readlineInterface.question(promptStr + '--->', answer => {
               resolve(answer)
            })
        })
    }

    close() {
        readlineInterface.close();
    }

    async readObject(promptStr, mapper) {   //base function: from string get the object
        let running;
        let res;
            do {
                running = false;
                try {
                    const answer = await this.prompt(promptStr);    //get string: Promise
                    res = mapper(answer);    //mapper convert str to obj
                } catch (error) {
                    console.log(error);    //exception and run is continuing while user input valid data
                    running=true;
                }
            } while(running);
            return res;

    }
    #mapperNumber(answer, min, max) {
        const num = +answer;
        if (isNaN(num)) {
            throw `${answer} is not a number`
        }
        if (num < min) {
            throw `${num} must not be less than ${min}`
        }
        if (num > max) {
            throw `${num} must not be greater than ${max}`
        }
        return num;
    }

    readNumber(promptStr, min = -Number.MAX_VALUE, max = Number.MAX_VALUE) {
       return this.readObject(promptStr, answer => this.#mapperNumber(answer, min, max));
    }

    readPredicate(promptStr, errorPrompt, predicate) {
        return this.readObject(promptStr, answer => {
            if (!predicate(answer)) {
                throw errorPrompt;
            }
            return answer;
        })
    }
}
