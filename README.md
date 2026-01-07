# StarMapEnglish

StarMapEnglish是一个基于Vue 3和Vite构建的现代化英语学习应用，采用科技感UI设计，提供词汇、阅读、听力、写作等全方位英语学习功能，帮助用户高效提升英语水平。

## 技术栈

- **前端框架**: Vue 3 (v3.5.24)
- **构建工具**: Vite (v7.2.4)
- **路由管理**: Vue Router (v4.6.4)
- **状态管理**: Pinia (v3.0.4)
- **样式框架**: Tailwind CSS (v4.1.18)
- **图标库**: Font Awesome (v7.1.0)
- **开发语言**: JavaScript (ES Module)

## 核心功能

### 🚀 控制台 (Dashboard)
应用核心页面，集成所有学习模块的入口，展示学习进度和数据概览。

### 📚 词汇学习 (Vocabulary)
- 单词反应堆：动态展示当日核心词汇
- 分类学习：支持经济类、哲学类等分类词汇
- 记忆留存率：可视化展示记忆效果

### 📖 阅读学习 (Reading)
- 档案解密：经济学人精读、真题阅读
- 长难句分析：详细解析复杂句子结构
- 逻辑链梳理：帮助理解文章逻辑

### 🔊 听力学习 (Listening)
- 信号截获：BBC News、真题听力练习
- 实时播放控制：支持继续播放功能
- 可视化音频波形

### ✍️ 写作学习 (Writing)
- 结构实验室：大作文模板、语法纠错
- 高分表达替换：提供地道英语表达
- 写作框架指导

### ⚙️ 设置 (Settings)
应用配置和个性化设置

## 功能组件

### DashboardCard
控制台卡片组件，用于展示各学习模块的入口和简要信息。

### ListeningCard
听力学习卡片组件，提供听力练习的快速入口和相关信息。

### MemoryRetention
记忆留存率组件，使用环形进度条可视化展示单词记忆效果和评级。

### MotivationalQuote
励志名言组件，展示激励学习的名言，并提供"开始今日特训"功能。

### NavBar
响应式导航栏，移动端底部导航，桌面端侧边导航，提供所有功能模块入口。

### PageHeader
页面头部组件，展示用户信息、考试倒计时、能量值和搜索功能。

### ReadingCard
阅读学习卡片组件，提供阅读练习的快速入口和相关信息。

### VocabularyCard
词汇学习卡片组件，展示当日核心词汇和学习进度。

### WordCard
单词卡片组件，用于展示单个单词的详细信息和学习内容。

### WritingCard
写作学习卡片组件，提供写作练习的快速入口和相关信息。

## 安装和运行

### 环境要求

- Node.js 18.x 或更高版本
- npm 或 yarn 包管理器

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

应用将在 `http://localhost:5173` 启动开发服务器。

### 构建生产版本

```bash
npm run build
```

构建产物将生成在 `dist` 目录。

### 预览生产版本

```bash
npm run preview
```

## 项目结构

```
starmapenglish/
├── .vscode/            # VS Code配置
├── public/             # 静态资源
├── src/                # 源代码
│   ├── assets/         # 资源文件
│   ├── components/     # Vue组件
│   ├── data/           # 数据文件
│   ├── router/         # 路由配置
│   ├── stores/         # Pinia状态管理
│   ├── views/          # 页面视图
│   ├── App.vue         # 根组件
│   ├── main.js         # 入口文件
│   └── style.css       # 全局样式
├── .gitignore          # Git忽略文件
├── index.html          # HTML模板
├── package.json        # 项目配置
├── README.md           # 项目说明
├── vite.config.js      # Vite配置
└── tailwind.config.js  # Tailwind CSS配置
```

## 设计特点

### 🎨 视觉设计
- **深色主题**：深蓝色渐变背景，减轻视觉疲劳
- **玻璃拟态效果**：半透明卡片设计，增强层次感
- **科技感UI**：火箭、信号塔等科技元素，营造学习氛围
- **动态交互**：悬停动画、脉冲效果等增强用户体验

### 📱 响应式设计
- 移动端：底部导航栏，紧凑布局
- 平板端：自适应网格布局
- 桌面端：侧边导航栏，多列布局

### 🔧 技术亮点
- **组件化开发**：功能模块清晰分离，便于维护和扩展
- **Composition API**：使用Vue 3组合式API，代码组织更灵活
- **懒加载路由**：优化初始加载性能
- **原子化CSS**：使用Tailwind CSS，样式编写高效

## 开发指南

### IDE支持

推荐使用VS Code配合以下扩展：
- Volar - Vue 3开发支持
- Tailwind CSS IntelliSense - Tailwind CSS智能提示
- ESLint - 代码质量检查

### 代码规范

- 使用Vue 3 `<script setup>` 语法编写组件
- 组件命名使用PascalCase
- 路由命名使用PascalCase
- 遵循ESLint和Prettier规范

### 状态管理

项目集成了Pinia状态管理库，用于管理全局状态和跨组件数据共享。

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 贡献

欢迎提交Issue和Pull Request，共同改进StarMapEnglish应用。

### 贡献流程

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开Pull Request

## 许可证

MIT License

## 联系方式

如有问题或建议，欢迎通过以下方式联系：

- 邮箱：kwillited@gmail.com
