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

  get(key: string): unknown {
    const wrapper = JSON.parse(this.store.getItem(key) as string)

    if (wrapper) {
      const { value, type } = wrapper

      // 类型既值
      if (TYPE_IS_VALUE_KEY.includes(type)) {
        return TYPE_IS_VALUE[type as TypeIsValue]
      } else if (type === 'Set') {
        return new Set(value)
      } else if (type === 'Map') {
        return new Map(value)
      } else if (type === 'BigInt') {
        return BigInt(value)
      } else if (type === 'Symbol') {
        return Symbol.for(value)
      } else {
        return value
      }
    } else {
      // 该 key 无对应的值，为 null
      return wrapper
    }
  }

  remove(key: string) {
    this.store.removeItem(key)
  }

  // 返回第n个键的名称，如果n大于或等于键/值对的数量，则返回null。
  key(index: number) {
    return this.store.key(index)
  }

  // 返回键/值对的数量
  get length() {
    return this.store.length
  }

  // 将键标识的对的值设置为值，如果以前不存在键，则创建一个新的键/值对。
  get setItem() {
    return this.set
  }

  // 返回与给定键关联的当前值，如果给定键不存在，则返回null。
  get getItem() {
    return this.get
  }

  // 如果存在具有给定键的键/值对，则删除具有该键的键-值对。
  get removeItem() {
    return this.remove
  }

  // 删除所有键/值对（如果有的话）
  clear() {
    this.store.clear()
  }
}

export default DzStorage
