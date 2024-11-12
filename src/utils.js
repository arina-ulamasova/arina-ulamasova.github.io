export default class IdGenerator {
    #lastId;
    
    constructor(lastId) {
        this.#lastId = lastId;
    }

    generate() {
        return this.#lastId++;
    }
}