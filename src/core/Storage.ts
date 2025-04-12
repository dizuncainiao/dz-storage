import { AllowType, getType } from '../utils/is.ts'
import { StoreType, TypeIsValue, StorageOptions, StorageEvent, StorageEventListener, SerializedData } from '../types/index.ts'
import { compress, decompress } from '../utils/compression.ts'
import { encrypt, decrypt } from '../utils/crypto.ts'

const STORES = {
  localStorage,
  sessionStorage
} as const

// undefined 不被保存，NaN 被转为 null
const TYPE_IS_VALUE = {
  undefined: undefined,
  NaN: NaN
} as const

const TYPE_IS_VALUE_KEY = Object.keys(TYPE_IS_VALUE)

class DzStorage {
  private store: Storage
  private listeners: Set<StorageEventListener> = new Set()
  private defaultOptions: StorageOptions = {
    compress: false,
    expires: 0,
    encryption: false
  }

  constructor(type: StoreType) {
    this.store = STORES[type]
  }

  private __pack__(originalData: AllowType, options?: StorageOptions): string {
    const finalOptions = { ...this.defaultOptions, ...options }
    let type = getType(originalData)
    let value = originalData

    if (type === 'Set' || type === 'Map') {
      value = Array.from(originalData as Iterable<any>)
    } else if (type === 'BigInt') {
      value = (originalData as bigint).toString()
    } else if (type === 'Symbol') {
      value = Symbol.keyFor(originalData as symbol) || ''
    }

    const data: SerializedData = {
      value,
      type,
      timestamp: finalOptions.expires ? Date.now() + finalOptions.expires : undefined
    }

    let serialized = JSON.stringify(data)

    if (finalOptions.compress) {
      serialized = compress(serialized)
      data.compressed = true
    }

    if (finalOptions.encryption) {
      serialized = encrypt(serialized)
      data.encrypted = true
    }

    return serialized
  }

  private __unpack__(serialized: string): unknown {
    try {
      let unpacked = serialized
      let data: SerializedData

      // 先尝试解密
      try {
        unpacked = decrypt(unpacked)
      } catch (error) {
        console.error('Decryption failed:', error)
      }

      // 再尝试解压缩
      try {
        unpacked = decompress(unpacked)
      } catch (error) {
        console.error('Decompression failed:', error)
      }

      // 最后解析 JSON
      data = JSON.parse(unpacked)

      if (data.timestamp && Date.now() > data.timestamp) {
        this.remove(data.value as string)
        return null
      }

      const { value, type } = data

      if (!type) return value

      if (TYPE_IS_VALUE_KEY.includes(type)) {
        return TYPE_IS_VALUE[type as TypeIsValue]
      } else if (type === 'Set') {
        return new Set(value)
      } else if (type === 'Map') {
        return new Map(value)
      } else if (type === 'BigInt') {
        return BigInt(value)
      } else if (type === 'Symbol') {
        return Symbol.for(value as string)
      }

      return value
    } catch (error) {
      console.error('Failed to unpack storage data:', (error as Error).message)
      return null
    }
  }

  set(key: string, value: AllowType, options?: StorageOptions): void {
    try {
      const oldValue = this.get(key)
      const packValue = this.__pack__(value, options)
      this.store.setItem(key, packValue)
      this.emit({ key, oldValue, newValue: value, type: 'set' })
    } catch (error) {
      if ((error as Error).name === 'QuotaExceededError') {
        console.error('Storage quota exceeded')
      }
      throw error
    }
  }

  get(key: string): unknown {
    const serialized = this.store.getItem(key)
    if (!serialized) return null
    return this.__unpack__(serialized)
  }

  remove(key: string): void {
    const oldValue = this.get(key)
    this.store.removeItem(key)
    this.emit({ key, oldValue, newValue: null, type: 'remove' })
  }

  key(index: number): string | null {
    return this.store.key(index)
  }

  get length(): number {
    return this.store.length
  }

  clear(): void {
    this.store.clear()
    this.emit({ key: '', oldValue: null, newValue: null, type: 'clear' })
  }

  // Event handling
  addEventListener(listener: StorageEventListener): void {
    this.listeners.add(listener)
  }

  removeEventListener(listener: StorageEventListener): void {
    this.listeners.delete(listener)
  }

  private emit(event: StorageEvent): void {
    this.listeners.forEach(listener => listener(event))
  }

  // Alias methods for compatibility
  get setItem() { return this.set }
  get getItem() { return this.get }
  get removeItem() { return this.remove }

  // Utility methods
  has(key: string): boolean {
    return this.get(key) !== null
  }

  keys(): string[] {
    return Object.keys(this.store)
  }

  values(): unknown[] {
    return this.keys().map(key => this.get(key))
  }

  entries(): [string, unknown][] {
    return this.keys().map(key => [key, this.get(key)])
  }

  forEach(callback: (value: unknown, key: string, store: DzStorage) => void): void {
    this.entries().forEach(([key, value]) => callback(value, key, this))
  }
}

export default DzStorage
