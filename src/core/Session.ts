import DzStorage from './Storage.ts'

class DzSessionStorage extends DzStorage {
  constructor() {
    super('sessionStorage')
  }
}

export const sessionStore = new DzSessionStorage()
