// Storage 抽象与统一接口
import { LocalAdapter } from 'adapters/local.adapter'
import { SessionAdapter } from 'adapters/session.adapter'
import { MemoryAdapter } from 'adapters/memory.adapter'

import { AllowType } from 'types'
import { StorageAdapterInstance } from 'adapters/storage.adapter'
export type StorageType = 'local' | 'session' | 'memory'

export interface IStorage extends Storage {
  set(key: string, value: AllowType): void
  get(key: string): any
  remove(key: string): void
  clear(): void
  key(index: number): string | null
  length: number
  setItem: (key: string, value: AllowType) => void
  getItem: (key: string) => any
  removeItem: (key: string) => void
}

export class DzStorage implements IStorage {
  private adapter: StorageAdapterInstance
  constructor(type: StorageType = 'local') {
    switch (type) {
      case 'session':
        this.adapter = new SessionAdapter()
        break
      // case 'memory':
      //   this.adapter = new MemoryAdapter()
      //   break
      case 'local':
      default:
        this.adapter = new LocalAdapter()
    }
  }
  set(key: string, value: AllowType) {
    this.adapter.set(key, value)
  }
  get(key: string) {
    return this.adapter.get(key)
  }
  remove(key: string) {
    this.adapter.remove(key)
  }
  clear() {
    this.adapter.clear()
  }

  key(index: number) {
    return this.adapter.key(index)
  }

  get length() {
    return this.adapter.length
  }

  get setItem() {
    return this.set
  }

  get getItem() {
    return this.get
  }

  get removeItem() {
    return this.remove
  }
}
