import DZStorage from './Storage'

class DZSessionStorage extends DZStorage {
    constructor() {
        super('sessionStorage');
    }
}

export const sessionStore = new DZSessionStorage()

