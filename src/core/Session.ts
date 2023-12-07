import DzStorage from './Storage'

class DzSessionStorage extends DzStorage {
    constructor() {
        super('sessionStorage');
    }
}

export const sessionStore = new DzSessionStorage()

