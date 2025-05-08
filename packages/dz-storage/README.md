# dz-storage

本目录为重构后的 dz-storage 源码，结构与功能均遵循 STRUCTURE.md 规范。

## 目录结构

- adapters/：存储适配器（Local、Session、Memory）
- storage/：核心存储逻辑与工厂
- utils/：工具函数
- types/：类型定义
- constants/：常量配置
- index.ts：统一导出入口

请配合 STRUCTURE.md 文档理解各模块职责。
