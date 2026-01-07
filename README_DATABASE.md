# 数据库配置说明

## 选项1：使用MySQL数据库

### 前提条件
1. 确保已安装MySQL服务器
2. 确保MySQL服务正在运行
3. 有可用的MySQL用户（如root）

### 配置步骤
1. 修改 `.env` 文件中的数据库配置：
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=starmapenglish
   PORT=3000
   ```

2. 初始化数据库：
   ```
   npm run init-db
   ```

3. 启动服务器：
   ```
   npm run server
   ```

## 选项2：使用SQLite数据库（简化配置）

### 配置步骤
1. 安装SQLite依赖：
   ```
   npm install sqlite3
   ```

2. 创建SQLite数据库初始化脚本：
   ```javascript
   // server/init-sqlite.js
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

3. 更新package.json脚本：
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

4. 运行SQLite初始化脚本：
   ```
   npm run init-sqlite
   ```

## 项目结构说明

```
server/
├── index.js          # 服务器主文件
└── init-db.js        # 数据库初始化脚本
.env                  # 环境变量配置
```

## 故障排除

### MySQL连接失败
- 确保MySQL服务正在运行
- 检查用户名和密码是否正确
- 确保用户有足够的权限
- 尝试重置root密码：
  ```
  mysqladmin -u root password 'new_password'
  ```

### 找不到mysql命令
- 确保MySQL已安装
- 确保MySQL的bin目录已添加到系统PATH
- 对于Windows：检查 `C:\Program Files\MySQL\MySQL Server X.X\bin` 是否在PATH中
- 对于Linux：运行 `sudo apt-get install mysql-client`（Ubuntu/Debian）或 `sudo yum install mysql`（CentOS/RHEL）

### 端口占用
- 确保端口3000未被其他程序占用
- 可以在.env文件中修改PORT值

## 数据库表结构

### 1. wordbooks 表
| 字段名 | 数据类型 | 描述 |
|--------|----------|------|
| id | INT | 主键，自增 |
| name | VARCHAR(100) | 词汇本名称，唯一 |
| description | TEXT | 词汇本描述 |
| word_count | INT | 词汇本中单词数量，自动更新 |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间，自动更新 |

### 2. vocabulary 表
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

### 3. users 表
| 字段名 | 数据类型 | 描述 |
|--------|----------|------|
| id | INT | 主键，自增 |
| username | VARCHAR(100) | 用户名，唯一 |
| phone | VARCHAR(20) | 手机号，唯一 |
| password | VARCHAR(255) | 密码 |
| exam_type | VARCHAR(100) | 考试类型，默认"大学英语四级" |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间，自动更新 |

### 4. user_settings 表
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
