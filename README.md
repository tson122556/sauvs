# 极紫星智慧科技有限公司官网

极紫星智慧科技有限公司官网 - 专注于人工智能应用、智能机器人研发和物联网技术创新。

## 项目概述

极紫星智慧科技有限公司官网是一个现代化的企业展示平台，展示了公司在以下领域的专业能力：

- **人工智能应用** - 先进的 AI 技术和应用解决方案
- **智能机器人** - 高端智能机器人研发和部署
- **物联网技术** - 完整的 IoT 解决方案和服务
- **时空同步飞行器** - 创新的航空航天技术

## 技术栈

- **前端**: React 19 + Tailwind CSS 4 + TypeScript
- **后端**: Express 4 + tRPC 11 + Node.js
- **数据库**: MySQL/TiDB + Drizzle ORM
- **认证**: Manus OAuth
- **部署**: Manus 云平台

## 功能特性

### 核心功能
- 多语言支持（中文、英文）
- 响应式设计
- SEO 优化
- 社交媒体集成
- 用户认证系统

### AI 功能
- UVS AI Chat - 多模态 AI 对话系统
- 智能模型切换
- 流式响应
- 对话持久化

### 业务功能
- 产品展示中心
- 解决方案介绍
- 合作伙伴展示
- 关于我们页面
- 联系我们表单

## 快速开始

### 安装依赖
```bash
pnpm install
```

### 开发模式
```bash
pnpm dev
```

### 构建生产版本
```bash
pnpm build
```

### 运行生产版本
```bash
pnpm start
```

### 运行测试
```bash
pnpm test
```

## 项目结构

```
jizixing-website/
├── client/                 # 前端应用
│   ├── src/
│   │   ├── pages/         # 页面组件
│   │   ├── components/    # 可复用组件
│   │   ├── hooks/         # 自定义 Hooks
│   │   └── lib/           # 工具库
│   └── public/            # 静态资源
├── server/                # 后端应用
│   ├── _core/            # 核心功能
│   ├── routers/          # tRPC 路由
│   └── db.ts             # 数据库操作
├── drizzle/              # 数据库迁移
├── shared/               # 共享代码
└── storage/              # 存储配置
```

## 环境变量

项目使用以下环境变量（由 Manus 平台自动注入）：

- `DATABASE_URL` - 数据库连接字符串
- `JWT_SECRET` - JWT 签名密钥
- `VITE_APP_ID` - OAuth 应用 ID
- `OAUTH_SERVER_URL` - OAuth 服务器地址
- `VITE_OAUTH_PORTAL_URL` - OAuth 门户 URL

## 贡献指南

欢迎提交 Pull Request 和 Issue。

## 许可证

MIT License - 详见 LICENSE 文件

## 联系方式

- 官网: https://jizixing.com
- 邮箱: contact@jizixing.com
- 电话: +86-29-XXXX-XXXX

---

© 2024 极紫星智慧科技有限公司。保留所有权利。
