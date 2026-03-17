# AI心理健康助手系统

一个基于 Vue 3 + Vite 构建的 AI 心理咨询服务平台，为用户提供温暖的心理健康支持和情感陪伴服务。

## 📋 项目概述

本项目是一个完整的心理健康咨询平台，包含：
- **用户端**：提供情感倾诉、情绪记录、知识学习等功能
- **管理后台**：数据分析、文章管理、咨询记录管理等
- **AI 对话引擎**：支持流式对话和情绪分析
- **情绪花园**：实时情绪状态监控和建议

## 🚀 技术栈

### 前端框架
- **Vue 3** - 渐进式 JavaScript 框架
- **Vite** - 下一代前端构建工具
- **TypeScript** - 类型安全的 JavaScript 超集

### UI 组件库
- **Element Plus** - 基于 Vue 3 的桌面端组件库
- **@element-plus/icons-vue** - Element Plus 图标库

### 状态管理
- **Pinia** - 新一代状态管理库

### 路由管理
- **Vue Router 4** - 官方路由管理器

### HTTP 请求
- **Axios** - Promise 基础的 HTTP 客户端
- **@microsoft/fetch-event-source** - SSE 流式请求支持

### 编辑器
- **WangEditor** - 功能强大的富文本编辑器
- **@wangeditor/editor-for-vue** - WangEditor Vue 封装

### 图表可视化
- **ECharts** - 商业级数据可视化图表库

### 样式处理
- **SCSS** - CSS 预处理器
- **Sass** - CSS 扩展语言

## 📁 项目结构

```
src/
├── apis/                    # API 接口定义
│   ├── admin.js            # 管理后台 API
│   └── frontend.js         # 用户端 API
├── assets/                 # 静态资源
│   └── images/             # 图片资源
├── components/             # 公共组件
│   ├── ArticleDialog.vue
│   ├── AuthLayout.vue
│   ├── BackendLayout.vue
│   ├── CustomRate.vue
│   ├── FrontendLayout.vue
│   ├── MarkdownRenderer.vue
│   └── NavBar.vue
├── router/                 # 路由配置
│   └── index.js
├── utils/                  # 工具函数
│   └── request.js          # Axios 封装及请求拦截器
├── views/                  # 页面视图
│   ├── articleDetail.vue
│   ├── consultation.vue    # AI 对话主界面
│   ├── consultations.vue   # 咨询记录管理
│   ├── dashboard.vue       # 数据统计分析
│   ├── emotionDiary.vue    # 情绪日记
│   ├── emotional.vue        # 情感记录管理
│   ├── frontendKnowledge.vue # 知识库
│   ├── home.vue           # 首页
│   ├── konwledge.vue       # 知识管理
│   ├── login.vue
│   └── register.vue
├── App.vue                # 根组件
├── main.js                # 应用入口
├── style.css            # 全局样式
└── config/                # 配置文件
    └── index.js
```

## 🎯 核心功能

### 用户端功能
1. **情感倾诉聊天**
   - 与 AI 助手进行实时对话
   - 支持流式响应显示
   - 历史会话管理
   - 会话删除功能

2. **情绪花园**
   - 实时情绪状态分析
   - 情绪评分显示（0-100）
   - 风险等级评估（正常/关注/预警/危机）
   - 个性化建议推送
   - 治愈行动推荐

3. **情绪日记**
   - 记录每日心情变化
   - 情绪趋势分析

4. **知识库**
   - 心理健康相关文章
   - 文章详情浏览
   - 分类管理

5. **个人信息管理**
   - 用户注册/登录
   - 个人资料设置

### 管理后台功能
1. **数据分析仪表板**
   - 用户数据统计
   - 咨询时长分析
   - 情绪趋势图表

2. **知识文章管理**
   - 文章创建、编辑、删除
   - 文章分类管理
   - 内容审核

3. **咨询记录管理**
   - 查看历史对话
   - 会话统计
   - 用户行为分析

4. **情感记录管理**
   - 情绪数据分析
   - 风险用户识别
   - 干预措施跟踪

## 🛠️ 开发环境搭建

### 前置要求
- Node.js >= 16.x
- npm >= 8.x

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览生产包
```bash
npm run preview
```

## 🌐 路由结构

### 用户端路由
- `/` - 首页
- `/consultation` - AI 对话界面
- `/emotion-diary` - 情绪日记
- `/knowledge` - 知识库
- `/knowledge/article/:id` - 文章详情

### 认证路由
- `/auth/login` - 用户登录
- `/auth/register` - 用户注册

### 管理后台路由
- `/back/dashboard` - 数据仪表板
- `/back/konwledge` - 知识管理
- `/back/consultations` - 咨询记录
- `/back/emotional` - 情感记录

## 🔧 关键配置

### 代理配置 (vite.config.js)
```javascript
server: {
    host: 'localhost',
    port: 5173,
    proxy: {
        '/api': {
            target: 'http://localhost:8080', // 后端API地址
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '')
        }
    }
}
```

### API 基础配置 (utils/request.js)
- Base URL: `/api`
- Timeout: 5000ms
- Token 自动注入
- 统一错误处理

## 🎨 设计特色

### 视觉风格
- **温暖配色**：橙色 (#fb923c) 为主色调，营造温馨氛围
- **渐变背景**：柔和的渐变色提升视觉舒适度
- **卡片式设计**：模块化布局，信息层次清晰

### 交互体验
- **呼吸动画**：AI 助手头像的动态效果
- **打字机效果**：模拟真实对话场景
- **情绪可视化**：直观的进度条和状态指示
- **响应式设计**：适配不同屏幕尺寸

### 无障碍设计
- 高对比度色彩
- 清晰的字体层级
- 合理的间距和对齐
- 语义化 HTML 结构

## 🔒 安全特性

### 身份验证
- JWT Token 认证
- 本地存储加密
- 自动登出机制

### 数据保护
- HTTPS 传输
- CSRF 防护
- XSS 防护
- SQL 注入防护

## 📊 性能优化

### 代码分割
- 路由懒加载
- 组件按需导入
- Tree Shaking 优化

### 缓存策略
- LocalStorage 缓存用户信息
- API 响应缓存
- 静态资源长期缓存

### 加载优化
- 图片懒加载
- 组件异步加载
- 预加载关键资源

## 🧪 测试策略

### 单元测试
- 使用 Vitest 进行组件测试
- API 接口 mock 测试
- 工具函数测试

### E2E 测试
- Cypress 端到端测试
- 用户流程验证
- 跨浏览器兼容性

## 🚢 部署说明

### 环境要求
- Nginx 或 Apache Web Server
- Node.js 运行环境
- SSL 证书（生产环境必需）

### 构建步骤
```bash
# 安装依赖
npm install

# 构建生产版本
npm run build

# 构建产物位于 dist/ 目录
```

### Nginx 配置示例
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/your/dist;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://backend-server:8080/api;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 🤝 贡献指南

### 开发规范
- 遵循 ESLint 代码规范
- 使用 Prettier 格式化代码
- 提交信息符合 Conventional Commits 规范

### 分支管理
- `main` - 生产环境代码
- `develop` - 开发环境代码
- `feature/*` - 新功能开发
- `bugfix/*` - Bug 修复

### Pull Request 流程
1. Fork 项目仓库
2. 创建功能分支
3. 提交代码变更
4. 创建 Pull Request
5. 代码审查通过后合并

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Element Plus](https://element-plus.org/) - 高质量 Vue 3 UI 组件库
- [WangEditor](https://www.wangeditor.com/) - 开源 Web 富文本编辑器
- [ECharts](https://echarts.apache.org/) - 百度开源的数据可视化图表库

---

**温馨提示**：本应用仅供心理健康教育和辅助咨询使用，不能替代专业医疗诊断和治疗。如有严重心理问题，请及时寻求专业心理咨询师帮助。