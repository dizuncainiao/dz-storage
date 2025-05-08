// Storage 适配器实现
import { AllowType, ArrayLikeType, BasicType, SimpleObject } from 'types'
import { getType } from 'utils/is'
import { TYPE_IS_VALUE, TYPE_IS_VALUE_KEY } from 'constants'
import { pack, unpack } from 'utils/pack'

export class StorageAdapter {
  private storage: Storage

  constructor(storage: Storage) {
    this.storage = storage
  }

  set(key: string, value: AllowType) {
    try {
      this.storage.setItem(key, pack(value))
    } catch (error) {
      console.error('存储失败：', error)
    }
  }

  get(key: string) {
    try {
      return unpack(<string>this.storage.getItem(key))
    } catch (error) {
      console.error('获取失败：', error)
    }
  }

  remove(key: string) {
    this.storage.removeItem(key)
  }

  // 删除所有键/值对（如果有的话）
  clear() {
    this.storage.clear()
  }

  // 返回第n个键的名称，如果n大于或等于键/值对的数量，则返回null。
  key(index: number) {
    return this.storage.key(index)
  }

  // 返回键/值对的数量
  get length() {
    return this.storage.length
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
}

export type StorageAdapterInstance = InstanceType<typeof StorageAdapter>
