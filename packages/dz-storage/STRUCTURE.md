# dz-storage 目录结构优化建议

本结构参考原有源码与社区最佳实践，旨在提升可维护性、可扩展性与清晰度。

```text
src/
├── adapters/           # 存放不同存储适配器（如 Local、Session、Memory 等）
│   ├── local.adapter.ts
│   ├── session.adapter.ts
│   └── memory.adapter.ts
├── storage/            # 存储核心逻辑（如 Storage 抽象、工厂等）
│   ├── storage.ts
│   └── storage.factory.ts
├── utils/              # 工具函数（如类型判断、加密、压缩等）
│   ├── is.ts
│   ├── crypto.ts
│   └── compression.ts
├── types/              # 类型定义
│   └── index.ts
├── constants/          # 常量（如默认配置、key 前缀等）
│   └── index.ts
├── index.ts            # 入口文件，统一导出
└── README.md           # 包说明文档
```

## 结构说明

- **adapters/**：各类存储适配器，便于扩展和解耦。
- **storage/**：核心存储逻辑与工厂，聚合和管理各适配器。
- **utils/**：通用工具函数，保持独立和复用。
- **types/**：类型定义，便于 TypeScript 类型推导和维护。
- **constants/**：常量配置，集中管理易变参数。
- **index.ts**：包主入口，统一对外暴露 API。

## 推荐命名规范

- 文件名统一使用小写+中划线或小写+点分隔（如 local.adapter.ts）。
- 目录名统一小写复数（如 adapters、utils、types、constants）。

## 示例导出（index.ts）

```ts
export * from './adapters/local.adapter'
export * from './adapters/session.adapter'
export * from './adapters/memory.adapter'
export * from './storage/storage'
export * from './utils/is'
export * from './utils/crypto'
export * from './utils/compression'
export * from './types'
export * from './constants'
```

---

如需进一步细化，可根据实际业务拆分 adapters、storage、utils 等子模块。
