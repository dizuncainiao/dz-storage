type TypeMaping = keyof typeof TYPE_MAPING

type BasicType = string | boolean | undefined | null | number | bigint | symbol

type SetType = Set<BasicType | object>

type MapType = Map<string, BasicType | object>

type DataType = Record<string, BasicType | object>

type ArrayType = Array<BasicType | object>

export type AllowType = BasicType | DataType | ArrayType | SetType | MapType

const _REGEX = /^\[object |\]$/g

const TYPE_MAPING = {
  String: 'string',
  Boolean: 'boolean',
  Undefined: 'undefined',
  Null: 'null',
  Number: 'number',
  NaN: 'NaN',
  object: 'object',
  Set: 'Set',
  Map: 'Map',
  BigInt: 'BigInt',
  Symbol: 'Symbol'
}

// 类型清晰的类型
const CLEAR_TYPES = ['String', 'Boolean', 'Undefined', 'Null', 'Set', 'Map', 'BigInt', 'Symbol']

const LIKE_OBJECT_TYPES = ['Object', 'Array']

export const judgeType = (val: unknown) => Object.prototype.toString.call(val)

export function isNumber(val: unknown) {
  return !Number.isNaN(val) && judgeType(val) === '[object Number]'
}

export function getType(val: AllowType) {
  const typeText = judgeType(val)
  const replaced = typeText.replace(_REGEX, '')
  // 类型为 String、Boolean、Undefined、Null 直接输出
  if (CLEAR_TYPES.includes(replaced)) {
    return TYPE_MAPING[replaced as TypeMaping]
  }

  // NaN or 数值
  if (replaced === 'Number') {
    if (isNumber(val)) {
      return TYPE_MAPING[replaced]
    } else {
      return TYPE_MAPING['NaN']
    }
  }

  // 对象 or 数组
  if (LIKE_OBJECT_TYPES.includes(replaced)) {
    return TYPE_MAPING['object']
  }
}
