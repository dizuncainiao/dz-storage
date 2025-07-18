import { AllowType, getType } from '../utils/is.ts'
import { StoreType, TypeIsValue } from '../types'

const STORES = {
  localStorage,
  sessionStorage
}

// undefined 不被保存，NaN 被转为 null
const TYPE_IS_VALUE = {
  undefined: undefined,
  NaN: NaN
}

const TYPE_IS_VALUE_KEY = Object.keys(TYPE_IS_VALUE)

class DzStorage {
  store: Storage

  constructor(type: StoreType) {
    this.store = STORES[type]
  }

  __pack__(originalData: AllowType) {
    const type = getType(originalData)
    if (type === 'Set' || type === 'Map') {
      originalData = Array.from(originalData as Iterable<any>)
    } else if (type === 'BigInt') {
      originalData = (originalData as bigint).toString()
    } else if (type === 'Symbol') {
      originalData = Symbol.keyFor(originalData as symbol)
    }

    return JSON.stringify({ value: originalData, type })
  }

  set(key: string, value: AllowType) {
    const packValue = this.__pack__(value)
    this.store.setItem(key, packValue)
  }

  get<T>(key: string): T | null {
    const wrapper = JSON.parse(this.store.getItem(key) as string)

    if (wrapper) {
      const { value, type } = wrapper

      // 类型既值
      if (TYPE_IS_VALUE_KEY.includes(type)) {
        return TYPE_IS_VALUE[type as TypeIsValue] as T
      } else if (type === 'Set') {
        return new Set(value) as T
      } else if (type === 'Map') {
        return new Map(value) as T
      } else if (type === 'BigInt') {
        return BigInt(value) as T
      } else if (type === 'Symbol') {
        return Symbol.for(value) as T
      } else {
        return value as T
      }
    } else {
      // 该 key 无对应的值，为 null
      return null
    }
  }

  remove(key: string) {
    this.store.removeItem(key)
  }

  key(index: number) {
    return this.store.key(index)
  }

  get length() {
    return this.store.length
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

  clear() {
    this.store.clear()
  }
}

export default DzStorage
