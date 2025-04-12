export type StoreType = 'localStorage' | 'sessionStorage'

export type TypeIsValue = 'undefined' | 'NaN'

export interface StorageOptions {
  compress?: boolean
  expires?: number // 过期时间，单位毫秒
  encryption?: boolean // 是否加密
}

export interface StorageEvent {
  key: string
  oldValue: any
  newValue: any
  type: 'set' | 'remove' | 'clear'
}

export type StorageEventListener = (event: StorageEvent) => void

export interface SerializedData<T = any> {
  value: T
  type: string | undefined
  timestamp?: number
  compressed?: boolean
  encrypted?: boolean
}
