// 常量配置
export const DEFAULT_PREFIX = 'dz_'

// 内部存储 key
export const STORAGE_KEY = {
  USER: 'user',
  TOKEN: 'token',
  SETTINGS: 'settings',
}

// 定义类型映射表，避免键名与内置构造函数名称冲突
export const TYPE_MAPPING = {
  String: 'string',
  Boolean: 'boolean',
  Undefined: 'undefined',
  Null: 'null',
  Number: 'number',
  NaN: 'NaN',
  Object: 'object',
  Set: 'Set',
  Map: 'Map',
  BigInt: 'BigInt',
  Symbol: 'Symbol',
} as const

// 受支持的类型
export const ALLOW_TYPES = [
  'String',
  'Boolean',
  'Undefined',
  'Null',
  'Number',
  'Object',
  'Array',
  'Set',
  'Map',
  'BigInt',
  'Symbol',
] as const

export type AllowTypeName = (typeof ALLOW_TYPES)[number]

// 类型别名，用于约束 TYPE_MAPPING 的键
export type TypeMappingKey = keyof typeof TYPE_MAPPING

// 类型清晰的类型
export const CLEAR_TYPES = [
  'String',
  'Boolean',
  'Undefined',
  'Null',
  'Set',
  'Map',
  'BigInt',
  'Symbol',
]

// 类型模糊的类型
export const LIKE_OBJECT_TYPES = ['Object', 'Array']

// undefined 不被保存，NaN 被转为 null
export const TYPE_IS_VALUE = {
  Undefined: undefined,
  NaN: NaN,
}

export type TYPE_IS_VALUE_KEY = keyof typeof TYPE_IS_VALUE

export const TYPE_IS_VALUE_KEY = Object.keys(TYPE_IS_VALUE)
