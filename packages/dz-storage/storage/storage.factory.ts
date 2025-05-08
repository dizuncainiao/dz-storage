// Storage 工厂方法
import { DzStorage, StorageType } from './storage'

export function createStorage(type: StorageType = 'local') {
  return new DzStorage(type)
}
