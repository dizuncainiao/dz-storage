// 定义基础类型
export type BasicType = string | boolean | undefined | null | number | bigint | symbol

// 定义 Set 类型，限制其中的元素为 BasicType 或简单对象
export type SimpleObject = Record<string, BasicType>

export type SetType = Set<BasicType | SimpleObject>

// 定义 Map 类型，限制其中的值为 BasicType 或简单对象
export type MapType = Map<string, BasicType | SimpleObject>

// 定义普通对象类型，限制其属性为 BasicType 或简单对象
export type DataType = Record<string, BasicType | SimpleObject>

// 定义数组类型，限制其中的元素为 BasicType 或简单对象
export type ArrayType = Array<BasicType | SimpleObject>

// 定义允许的类型
export type AllowType = BasicType | DataType | ArrayType | SetType | MapType

// 用于约束 TYPE_MAPPING 的键
export { TypeMappingKey } from '../constants'

export type ArrayLikeType = ArrayLike<BasicType | SimpleObject>
