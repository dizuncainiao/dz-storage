import { AllowType, ArrayLikeType } from 'types'
import { getType } from 'utils/is'
import { TYPE_IS_VALUE, TYPE_IS_VALUE_KEY } from 'constants'

export function pack(value: AllowType) {
  const type = getType(value)

  if (type === 'Unknown') throw new Error('Unknown type')

  if (['Set', 'Map'].includes(type)) {
    value = Array.from(<ArrayLikeType>value)
  } else if (type === 'BigInt') {
    value = (<bigint>value).toString()
  } else if (type === 'Symbol') {
    value = Symbol.keyFor(<symbol>value)
  }

  return JSON.stringify({ value, type })
}

export function unpack(value: string) {
  const data = JSON.parse(value)

  if (data) {
    const { value, type } = data

    //  处理特殊值：undefined 不被保存，NaN 被转为 null，所以根据 type 直接返回对应值
    if (TYPE_IS_VALUE_KEY.includes(type)) {
      return TYPE_IS_VALUE[<TYPE_IS_VALUE_KEY>type]
    } else if (type === 'Set') {
      return new Set(value)
    } else if (type === 'Map') {
      return new Map(value)
    } else if (type === 'BigInt') {
      return BigInt(value)
    } else if (type === 'Symbol') {
      return Symbol.for(<string>value)
    }
    return value
  } else {
    // 当获取一个键值时，如果该键值不存在，则返回 null
    return null
  }
}
