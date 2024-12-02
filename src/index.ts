import { localStore } from './core/Local.ts'
import { sessionStore } from './core/Session.ts'
import DzStorage from './core/Storage.ts'

export type DzStorageType = InstanceType<typeof DzStorage>
export { localStore, sessionStore }
