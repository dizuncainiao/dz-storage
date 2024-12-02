# dz-storage

更好用的 `localStorage` 封装，支持几乎所有 Javascript 数据类型的存取，当然 `sessionStorage` 也是支持的。

😁 即取即用：存值、取值均不需要任何转换

😁 100% 基于 `localStorage` 纯原生封装

😁 1:1 实现 `localStorage` api，极致纯粹

😁 100% 同步写法，无需 `async` 、`await`

😁 **支持 `string`、`number`、`boolean`、`null`、`undefined`、`NaN`、`object`、`Set`、`Map`、`bigint`、`symbol`**

😁 稳定可靠，测试用例完善，100% 测试覆盖率

😁 超小代码体积，gzip 后不足 **1kb**

😁 支持 TypeScript

## 安装

```bash
# npm
npm i dz-storage

# pnpm
pnpm add dz-storage

# yarn
yarn add dz-storage
```

## 使用

```typescript
import { localStore, sessionStore } from 'dz-storage'

localStore.set('s', 'hello')
localStore.get('s') // 'hello'

localStore.set('n', 123)
localStore.get('n') // 123

localStore.set('b', true)
localStore.get('b') // true

localStore.set('n2', NaN)
localStore.get('n2') // NaN

localStore.set('o', { name: 'zhangsan' })
localStore.get('o') // {name: 'zhangsan'}

localStore.set('a', [{ name: 'zhangsan' }])
localStore.get('a') // [{name: 'zhangsan'}]

localStore.set('s', Symbol.for('Hello world'))
localStore.get('s') // Symbol(Hello world)
```

**注意：为保证 `symbol` 的唯一性，请使用 `Symbol.for` 来创建。**

更多代码示例请查阅 [https://blog.csdn.net/dizuncainiao/article/details/134958324](https://blog.csdn.net/dizuncainiao/article/details/134958324)

## api

| 属性名 | 说明                                                                                              | 别名       |
| :----- | ------------------------------------------------------------------------------------------------- | ---------- |
| set    | 同 [localStorage.setItem](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage/setItem)       | setItem    |
| get    | 同 [localStorage.getItem](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage/getItem)       | getItem    |
| remove | 同 [localStorage.removeItem](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage/removeItem) | removeItem |
| clear  | 同 [localStorage.clear](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage/clear)           |            |
| length | 同 [localStorage.length](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage/length)         |            |
| key    | 同 [localStorage.key](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage/key)               |            |
