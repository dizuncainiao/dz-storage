import { AllowType, TypeMappingKey } from 'types'
import { ALLOW_TYPES, AllowTypeName, CLEAR_TYPES, LIKE_OBJECT_TYPES, TYPE_MAPPING } from 'constants'

/**
 * 获取类型名称
 * e.g. [object Array] => Array
 * @param val
 */
export const getTypeName = (val: unknown) => Object.prototype.toString.call(val).slice(8, -1)

/**
 * 判断是否为数字
 * @param val
 */
export function isNumber(val: unknown) {
  return typeof val === 'number' && !Number.isNaN(val)
}

export function getType(val: AllowType) {
  const typeName = getTypeName(val)

  if (ALLOW_TYPES.includes(typeName as AllowTypeName)) {
    if (typeName === 'Number') {
      return isNumber(val) ? 'Number' : 'NaN'
    }

    return typeName
  } else {
    return 'Unknown'
  }
}
