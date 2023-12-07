import DzStorage from './Storage'

class DzLocalStorage extends DzStorage {
    constructor() {
        super('localStorage');
    }
}

export const localStore = new DzLocalStorage()

