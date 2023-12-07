import DZStorage from './Storage'

class DZLocalStorage extends DZStorage {
    constructor() {
        super('localStorage');
    }
}

export const localStore = new DZLocalStorage()

