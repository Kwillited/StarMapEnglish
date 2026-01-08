# StarMapEnglish

StarMapEnglish是一个基于Vue 3和Vite构建的现代化英语学习应用，采用科技感UI设计，提供词汇、阅读、听力、写作等全方位英语学习功能，帮助用户高效提升英语水平。

## 技术栈

### 前端
- **框架**: Vue 3 (v3.5.24)
- **构建工具**: Vite (v7.2.4)
- **路由管理**: Vue Router (v4.6.4)
- **状态管理**: Pinia (v3.0.4)
- **API服务层**: 统一API请求处理，封装fetch请求
- **样式框架**: Tailwind CSS (v4.1.18)
- **图标库**: Font Awesome (v7.1.0)
- **图表库**: Chart.js (v4.5.1)
- **文件处理**: XLSX (v0.18.5)

### 后端
- **运行环境**: Node.js
- **Web框架**: Express (v5.2.1)
- **数据库驱动**: mysql2 (v3.16.0)
- **环境配置**: dotenv (v17.2.3)
- **跨域支持**: cors (v2.8.5)

### 移动端支持
- **跨平台框架**: Capacitor (v8.0.0)
- **支持平台**: iOS、Android
- **PWA支持**: 渐进式Web应用

### 数据库
- **主要支持**: MySQL
- **备选支持**: SQLite (通过配置切换)

### 开发语言
- JavaScript (ES Module)

## 核心功能

### 🚀 控制台 (Dashboard)
应用核心页面，集成所有学习模块的入口，展示学习进度和数据概览。

### 📚 词汇学习 (Vocabulary)
- 单词反应堆：动态展示当日核心词汇
- 分类学习：支持经济类、哲学类等分类词汇
- 记忆留存率：可视化展示记忆效果
- 智能复习机制：基于记忆曲线的复习计划
- 多种学习模式：浏览、复习、学习、测试
- 进度跟踪：学习和复习进度可视化
- 单词管理：搜索、筛选、掌握情况反馈

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

### 🔐 用户认证
- 手机号注册：使用手机号进行账号注册
- 手机号登录：安全便捷的登录方式
- 个性化设置：根据用户需求调整学习计划

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
- MySQL 服务器（推荐用于生产环境）或 SQLite（简化配置）

### 安装依赖

```bash
npm install
```

### 数据库配置

#### 选项1：使用MySQL数据库（推荐）

1. **配置环境变量**：修改 `.env` 文件中的数据库配置
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=starmapenglish
   PORT=3000
   ```

2. **初始化数据库**：
   ```bash
   npm run init-db
   ```

3. **启动后端服务器**：
   ```bash
   npm run server
   ```

#### 选项2：使用SQLite数据库（简化配置）

1. **安装SQLite依赖**：
   ```bash
   npm install sqlite3
   ```

2. **创建SQLite初始化脚本**：创建 `server/init-sqlite.js` 文件，内容如下：
   ```javascript
   import sqlite3 from 'sqlite3';
   import fs from 'fs';
   import path from 'path';
   import { fileURLToPath } from 'url';
   
   const __filename = fileURLToPath(import.meta.url);
   const __dirname = path.dirname(__filename);
   
   // 创建数据库连接
   const db = new sqlite3.Database('./starmapenglish.db', (err) => {
     if (err) {
       console.error('创建数据库失败:', err.message);
       process.exit(1);
     }
     console.log('SQLite数据库连接成功');
   });
   
   // 创建词汇表
   db.run(`
     CREATE TABLE IF NOT EXISTS vocabulary (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       word TEXT NOT NULL UNIQUE,
       phonetic_symbol TEXT,
       mean TEXT NOT NULL,
       initial TEXT NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     )
   `, (err) => {
     if (err) {
       console.error('创建词汇表失败:', err.message);
       process.exit(1);
     }
     console.log('词汇表创建成功');
     
     // 导入CET4词汇数据
     importCET4Data();
   });
   
   // 导入CET4词汇数据
   function importCET4Data() {
     const cet4Dir = path.join(__dirname, '../public/CET4');
     const jsonFiles = fs.readdirSync(cet4Dir).filter(file => file.endsWith('.json'));
     
     let totalWords = 0;
     let importedWords = 0;
     
     jsonFiles.forEach((file, index) => {
       const filePath = path.join(cet4Dir, file);
       const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
       
       totalWords += data.length;
       
       data.forEach(word => {
         db.run(
           `INSERT OR REPLACE INTO vocabulary (word, phonetic_symbol, mean, initial) VALUES (?, ?, ?, ?)`,
           [word.word, word.phonetic_symbol, word.mean, word.initial],
           (err) => {
             if (err) {
               console.error(`导入单词 ${word.word} 失败:`, err.message);
             } else {
               importedWords++;
             }
           }
         );
       });
       
       console.log(`已导入 ${file} 文件，包含 ${data.length} 个单词`);
       
       // 当处理完所有文件后，关闭数据库连接
       if (index === jsonFiles.length - 1) {
         setTimeout(() => {
           console.log(`\n数据导入完成！`);
           console.log(`总单词数: ${totalWords}`);
           console.log(`成功导入: ${importedWords}`);
           db.close();
         }, 1000);
       }
     });
   }
   ```

3. **更新package.json脚本**：
   ```json
   "scripts": {
     "dev": "vite",
     "build": "vite build",
     "preview": "vite preview",
     "server": "node --experimental-modules server/index.js",
     "init-db": "node --experimental-modules server/init-db.js",
     "init-sqlite": "node --experimental-modules server/init-sqlite.js"
   }
   ```

4. **运行SQLite初始化**：
   ```bash
   npm run init-sqlite
   ```

### 数据库表结构

#### 1. wordbooks 表
| 字段名 | 数据类型 | 描述 |
|--------|----------|------|
| id | INT | 主键，自增 |
| name | VARCHAR(100) | 词汇本名称，唯一 |
| description | TEXT | 词汇本描述 |
| word_count | INT | 词汇本中单词数量，自动更新 |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间，自动更新 |

#### 2. vocabulary 表
| 字段名 | 数据类型 | 描述 |
|--------|----------|------|
| id | INT | 主键，自增 |
| word | VARCHAR(100) | 单词，唯一 |
| phonetic_symbol | VARCHAR(100) | 音标 |
| mean | TEXT | 释义 |
| initial | CHAR(1) | 首字母 |
| wordbook_id | INT | 外键，关联到 wordbooks 表 |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间，自动更新 |

#### 3. users 表
| 字段名 | 数据类型 | 描述 |
|--------|----------|------|
| id | INT | 主键，自增 |
| username | VARCHAR(100) | 用户名，唯一 |
| phone | VARCHAR(20) | 手机号，唯一 |
| password | VARCHAR(255) | 密码 |
| exam_type | VARCHAR(100) | 考试类型，默认"大学英语四级" |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间，自动更新 |

#### 4. user_settings 表
| 字段名 | 数据类型 | 描述 |
|--------|----------|------|
| id | INT | 主键，自增 |
| user_id | INT | 用户ID，唯一 |
| vocabulary_settings | JSON | 词汇学习设置 |
| reading_settings | JSON | 阅读训练设置 |
| listening_settings | JSON | 听力训练设置 |
| writing_settings | JSON | 写作训练设置 |
| general_settings | JSON | 通用设置 |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间，自动更新 |

### 故障排除

#### MySQL连接失败
- 确保MySQL服务正在运行
- 检查用户名和密码是否正确
- 确保用户有足够的权限
- 尝试重置root密码：
  ```bash
  mysqladmin -u root password 'new_password'
  ```

#### 找不到mysql命令
- 确保MySQL已安装
- 确保MySQL的bin目录已添加到系统PATH
- 对于Windows：检查 `C:\Program Files\MySQL\MySQL Server X.X\bin` 是否在PATH中
- 对于Linux：运行 `sudo apt-get install mysql-client`（Ubuntu/Debian）或 `sudo yum install mysql`（CentOS/RHEL）

#### 端口占用
- 确保端口3000未被其他程序占用
- 可以在.env文件中修改PORT值

### 前端开发模式

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

## 移动端运行说明

StarMapEnglish支持通过Capacitor构建为原生iOS和Android应用，同时支持作为PWA（渐进式Web应用）运行。

### 1. Capacitor配置

项目已集成Capacitor，用于将Web应用转换为原生移动应用。

**主要配置文件**：
- `capacitor.config.json`: Capacitor核心配置
- `android/`: Android平台项目目录
- `ios/`: iOS平台项目目录

### 2. 构建原生应用

#### 前提条件
- **Android**: Android Studio 安装并配置
- **iOS**: macOS 系统 + Xcode 安装并配置

#### 构建步骤

1. **构建Web应用**（每次修改代码后需要执行）：
   ```bash
   npm run build
   npx cap sync
   ```

2. **Android构建**：
   ```bash
   npx cap open android
   ```
   在Android Studio中点击"Run"按钮构建并运行应用。

3. **iOS构建**：
   ```bash
   npx cap open ios
   ```
   在Xcode中点击"Run"按钮构建并运行应用。

### 3. PWA（渐进式Web应用）

#### 特性
- 支持安装到主屏幕
- 支持离线访问
- 支持推送通知
- 响应式设计

#### 部署
将`dist/`目录部署到支持HTTPS的Web服务器上，用户可以通过浏览器访问并将应用安装到主屏幕。

#### 主要PWA文件
- `dist/manifest.webmanifest`: PWA配置文件
- `dist/service-worker.js`: 服务工作线程

## 项目结构

```
starmapenglish/
├── .vscode/            # VS Code配置
├── android/            # Android平台项目（Capacitor生成）
├── ios/                # iOS平台项目（Capacitor生成）
├── public/             # 静态资源
│   └── CET4/           # CET4词汇数据（JSON格式）
├── server/             # 后端服务器代码
│   ├── index.js        # 服务器主文件
│   ├── init-db.js      # MySQL数据库初始化脚本
│   ├── check-settings-format.js  # 设置格式检查
│   ├── check-wordbooks.js        # 词汇本检查
│   ├── migrate-settings.js       # 设置迁移脚本
│   ├── migrate-wordbooks.js      # 词汇本迁移脚本
│   └── migrate-wordcount.js      # 词数迁移脚本
├── src/                # 前端源代码
│   ├── assets/         # 静态资源
│   ├── components/     # 共享组件
│   ├── desktop/        # 桌面端组件和视图
│   ├── mobile/         # 移动端组件和视图
│   ├── router/         # 路由配置
│   ├── shared/         # 共享资源和状态
│   │   ├── api/         # API服务层
│   │   │   └── apiservice.js # 统一API请求处理
│   │   ├── composables/ # 可复用逻辑
│   │   ├── data/        # 数据文件
│   │   ├── layout/      # 布局组件
│   │   ├── modals/      # 模态框组件
│   │   ├── stores/      # 状态管理
│   │   └── views/       # 共享视图
│   ├── views/          # 旧视图目录（已清理，只保留设置相关子路由）
│   ├── App.vue         # 根组件
│   ├── main.js         # 入口文件
│   └── style.css       # 全局样式
├── .env                # 环境变量配置
├── .gitignore          # Git忽略文件
├── capacitor.config.json # Capacitor配置文件
├── index.html          # HTML模板
├── package.json        # 项目配置
├── package-lock.json   # 依赖锁文件
├── README.md           # 项目说明
├── README_DATABASE.md  # 数据库配置说明
├── vite.config.js      # Vite配置
└── prototype.html      # 原型设计
```

## API 文档

### 1. 用户认证 API

#### 注册新用户
```
POST /api/register
```
- **功能**：创建新用户
- **请求体**：
  ```json
  {
    "username": "用户名",
    "phone": "13800138000",
    "password": "密码",
    "exam_type": "大学英语四级"
  }
  ```
- **响应**：成功或失败信息

#### 用户登录
```
POST /api/login
```
- **功能**：用户登录验证
- **请求体**：
  ```json
  {
    "phone": "13800138000",
    "password": "密码"
  }
  ```
- **响应**：用户信息或失败信息

#### 获取当前用户信息
```
GET /api/current-user
```
- **功能**：获取当前登录用户信息
- **响应**：用户详细信息

#### 获取指定用户信息
```
GET /api/users/:userId
```
- **功能**：根据用户ID获取用户信息
- **响应**：用户详细信息

#### 更新用户信息
```
PUT /api/users/:userId
```
- **功能**：更新用户信息
- **请求体**：
  ```json
  {
    "username": "新用户名",
    "phone": "新手机号",
    "exam_type": "新考试类型"
  }
  ```
- **响应**：成功或失败信息

### 2. 词汇学习 API

#### 获取所有词汇本
```
GET /api/wordbooks
```
- **功能**：获取所有可用的词汇本
- **响应**：词汇本列表

#### 获取词汇本中的词汇
```
GET /api/wordbooks/:wordbookId/vocabulary
```
- **功能**：获取指定词汇本中的所有词汇
- **响应**：词汇列表

#### 按首字母获取词汇
```
GET /api/wordbooks/:wordbookId/vocabulary/:initial
```
- **功能**：获取词汇本中指定首字母的词汇
- **响应**：词汇列表

#### 搜索词汇
```
GET /api/wordbooks/:wordbookId/vocabulary/search/:keyword
```
- **功能**：搜索词汇本中的词汇
- **响应**：匹配的词汇列表

### 3. 设置 API

#### 获取用户设置
```
GET /api/settings/:userId
```
- **功能**：获取指定用户的设置
- **响应**：用户设置

#### 更新用户设置
```
PUT /api/settings/:userId
```
- **功能**：更新用户设置
- **请求体**：设置数据
- **响应**：成功或失败信息

#### 获取默认设置
```
GET /api/settings
```
- **功能**：获取默认设置
- **响应**：默认设置数据

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
- 智能设备检测：自动识别设备类型并切换视图
- 路由守卫：根据设备类型自动重定向到相应视图
- 统一状态管理：共享核心业务逻辑，减少代码冗余

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

- Chrome (最新版) - 桌面端和移动端
- Firefox (最新版) - 桌面端和移动端
- Safari (最新版) - 桌面端和移动端
- Edge (最新版) - 桌面端和移动端

### PWA支持

- Chrome for Android - 支持安装到主屏幕
- Safari for iOS - 支持添加到主屏幕
- Chrome for Desktop - 支持安装为应用

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
