# optimize-dz-storage

基于pnpm的monorepo项目，用于优化dz-storage库。

## 项目结构

```
.
├── packages/      # 包含所有的包
├── example/       # 示例应用
├── .eslintrc.js   # ESLint配置
├── .prettierrc    # Prettier配置
└── pnpm-workspace.yaml # 工作空间配置
```

## 开发指南

### 安装依赖

```bash
pnpm install
```

### 代码格式化

```bash
pnpm run format
```

### 代码检查

```bash
pnpm run lint
```

### 修复代码问题

```bash
pnpm run lint:fix
```

## 工作空间

本项目使用pnpm工作空间管理多个包：

- `packages/*`: 包含所有的库包
- `example`: 包含示例应用

## 添加新包

在packages目录下创建新包：

```bash
mkdir -p packages/my-package
cd packages/my-package
pnpm init
```

## 安装依赖

### 为根目录安装依赖

```bash
pnpm add -w <package-name>
```

### 为特定包安装依赖

```bash
pnpm add <package-name> --filter <workspace-name>
```

### 工作空间之间的依赖

```bash
pnpm add @your-scope/package-a --filter @your-scope/package-b
```
