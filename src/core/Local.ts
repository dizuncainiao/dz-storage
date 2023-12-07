import DzStorage from './Storage.ts'

class DzLocalStorage extends DzStorage {
    constructor() {
        super('localStorage');
    }
}

export const localStore = new DzLocalStorage()

