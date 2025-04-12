# DzStorage API 文档

## 简介

DzStorage 是一个增强版的 Web Storage API，提供了对 localStorage 和 sessionStorage 的封装，支持更多数据类型、数据压缩、加密和过期时间等功能。

## 安装

```bash
npm install dz-storage
# 或
yarn add dz-storage
# 或
pnpm add dz-storage
```

## 基本用法

```typescript
import { DzStorage } from 'dz-storage'

// 创建 localStorage 实例
const storage = new DzStorage('localStorage')

// 创建 sessionStorage 实例
const session = new DzStorage('sessionStorage')
```

## API 参考

### 构造函数

```typescript
constructor(type: 'localStorage' | 'sessionStorage')
```

### 核心方法

#### set(key: string, value: any, options?: StorageOptions): void

存储数据。

```typescript
// 基本使用
storage.set('key', 'value')

// 带选项使用
storage.set('key', 'value', {
  compress: true,    // 是否压缩数据
  expires: 3600000, // 过期时间（毫秒）
  encryption: true  // 是否加密
})
```

#### get(key: string): any

获取数据。

```typescript
const value = storage.get('key')
```

#### remove(key: string): void

删除数据。

```typescript
storage.remove('key')
```

#### clear(): void

清空所有数据。

```typescript
storage.clear()
```

### 辅助方法

#### has(key: string): boolean

检查键是否存在。

```typescript
if (storage.has('key')) {
  // 键存在
}
```

#### keys(): string[]

获取所有键名。

```typescript
const allKeys = storage.keys()
```

#### values(): any[]

获取所有值。

```typescript
const allValues = storage.values()
```

#### entries(): [string, any][]

获取所有键值对。

```typescript
const allEntries = storage.entries()
```

#### forEach(callback: (value: any, key: string, store: DzStorage) => void): void

遍历所有数据。

```typescript
storage.forEach((value, key) => {
  console.log(key, value)
})
```

### 事件监听

#### addEventListener(listener: StorageEventListener): void

添加存储事件监听器。

```typescript
storage.addEventListener((event) => {
  console.log('Storage changed:', event)
})
```

#### removeEventListener(listener: StorageEventListener): void

移除存储事件监听器。

```typescript
const listener = (event) => console.log(event)
storage.addEventListener(listener)
storage.removeEventListener(listener)
```

### 兼容性方法

为了保持与原生 Storage API 的兼容性，提供了以下别名方法：

- `setItem`: `set` 的别名
- `getItem`: `get` 的别名
- `removeItem`: `remove` 的别名

## 数据类型支持

DzStorage 支持以下数据类型：

- 基本类型：string、number、boolean、null、undefined
- 特殊值：NaN
- 复杂类型：Object、Array
- 集合类型：Set、Map
- 其他类型：BigInt、Symbol

## 选项说明

### StorageOptions

```typescript
interface StorageOptions {
  compress?: boolean    // 是否压缩数据
  expires?: number      // 过期时间（毫秒）
  encryption?: boolean  // 是否加密
}
```

## 注意事项

1. 数据压缩和加密会增加存储和读取的时间开销
2. 加密功能需要确保数据安全性
3. 过期时间是基于存储时的时间戳计算的
4. 存储大量数据时注意浏览器存储限制

## 示例

### 基本使用

```typescript
const storage = new DzStorage('localStorage')

// 存储数据
storage.set('user', {
  name: 'John',
  age: 30
})

// 获取数据
const user = storage.get('user')
console.log(user) // { name: 'John', age: 30 }
```

### 带过期时间的数据

```typescript
// 存储一小时过期的数据
storage.set('token', 'abc123', {
  expires: 3600000 // 1小时
})
```

### 加密数据

```typescript
// 存储加密数据
storage.set('secret', 'sensitive data', {
  encryption: true
})
```

### 压缩数据

```typescript
// 存储压缩数据
storage.set('largeData', largeObject, {
  compress: true
})
```

## 浏览器兼容性

- Chrome 4+
- Firefox 3.5+
- Safari 4+
- Opera 10.5+
- IE 8+ 