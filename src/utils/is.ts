// 定义基础类型
type BasicType = string | boolean | undefined | null | number | bigint | symbol

// 定义 Set 类型，限制其中的元素为 BasicType 或简单对象
type SimpleObject = Record<string, BasicType>
type SetType = Set<BasicType | SimpleObject>

// 定义 Map 类型，限制其中的值为 BasicType 或简单对象
type MapType = Map<string, BasicType | SimpleObject>

// 定义普通对象类型，限制其属性为 BasicType 或简单对象
type DataType = Record<string, BasicType | SimpleObject>

// 定义数组类型，限制其中的元素为 BasicType 或简单对象
type ArrayType = Array<BasicType | SimpleObject>

// 定义允许的类型
export type AllowType = BasicType | DataType | ArrayType | SetType | MapType

// 定义类型映射表，避免键名与内置构造函数名称冲突
const TYPE_MAPPING = {
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
  Symbol: 'Symbol'
} as const

// 类型别名，用于约束 TYPE_MAPPING 的键
type TypeMapping = keyof typeof TYPE_MAPPING

// 类型清晰的类型
const CLEAR_TYPES = ['String', 'Boolean', 'Undefined', 'Null', 'Set', 'Map', 'BigInt', 'Symbol']

const LIKE_OBJECT_TYPES = ['Object', 'Array']

/* 获取类型 */
export const getTypeName = (val: unknown) => Object.prototype.toString.call(val).slice(8, -1)

export function isNumber(val: unknown) {
  return typeof val === 'number' && !Number.isNaN(val)
}

export function getType(val: AllowType) {
  const typeName = getTypeName(val)
  // 类型为 String、Boolean、Undefined、Null 直接输出
  if (CLEAR_TYPES.includes(typeName)) {
    return TYPE_MAPPING[typeName as TypeMapping]
  }

  // NaN or 数值
  if (typeName === 'Number') {
    if (isNumber(val)) {
      return TYPE_MAPPING[typeName]
    } else {
      return TYPE_MAPPING['NaN']
    }
  }

  // 对象 or 数组
  if (LIKE_OBJECT_TYPES.includes(typeName)) {
    return TYPE_MAPPING['Object']
  }
}
