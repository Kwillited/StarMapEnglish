import { createPool } from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

// 获取当前文件路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 创建数据库连接池（不指定database，先连接到MySQL服务器）
const pool = createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 创建所有必要的数据库表
async function createTables() {
  try {
    const connection = await pool.getConnection();
    
    // 创建数据库（如果不存在）
    await connection.query('CREATE DATABASE IF NOT EXISTS starmapenglish');
    await connection.query('USE starmapenglish');
    
    // 创建词汇本表
    const createWordbooksTable = `
      CREATE TABLE IF NOT EXISTS wordbooks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        description TEXT,
        word_count INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    await connection.query(createWordbooksTable);
    console.log('词汇本表创建成功');
    
    // 创建词汇表
    const createVocabularyTable = `
      CREATE TABLE IF NOT EXISTS vocabulary (
        id INT AUTO_INCREMENT PRIMARY KEY,
        word VARCHAR(100) NOT NULL UNIQUE,
        phonetic_symbol VARCHAR(100),
        mean TEXT NOT NULL,
        initial CHAR(1) NOT NULL,
        wordbook_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (wordbook_id) REFERENCES wordbooks(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    await connection.query(createVocabularyTable);
    console.log('词汇表创建成功');
    
    // 创建词汇本单词计数触发器
    // 创建插入触发器
    await connection.query(`
      CREATE TRIGGER IF NOT EXISTS update_word_count_after_insert
      AFTER INSERT ON vocabulary
      FOR EACH ROW
      BEGIN
        UPDATE wordbooks 
        SET word_count = (SELECT COUNT(*) FROM vocabulary WHERE wordbook_id = NEW.wordbook_id)
        WHERE id = NEW.wordbook_id;
      END;
    `);
    console.log('插入触发器创建成功');
    
    // 创建删除触发器
    await connection.query(`
      CREATE TRIGGER IF NOT EXISTS update_word_count_after_delete
      AFTER DELETE ON vocabulary
      FOR EACH ROW
      BEGIN
        UPDATE wordbooks 
        SET word_count = (SELECT COUNT(*) FROM vocabulary WHERE wordbook_id = OLD.wordbook_id)
        WHERE id = OLD.wordbook_id;
      END;
    `);
    console.log('删除触发器创建成功');
    
    // 创建更新触发器（当wordbook_id变化时）
    await connection.query(`
      CREATE TRIGGER IF NOT EXISTS update_word_count_after_update
      AFTER UPDATE ON vocabulary
      FOR EACH ROW
      BEGIN
        -- 更新旧的词汇本
        UPDATE wordbooks 
        SET word_count = (SELECT COUNT(*) FROM vocabulary WHERE wordbook_id = OLD.wordbook_id)
        WHERE id = OLD.wordbook_id;
        
        -- 更新新的词汇本
        UPDATE wordbooks 
        SET word_count = (SELECT COUNT(*) FROM vocabulary WHERE wordbook_id = NEW.wordbook_id)
        WHERE id = NEW.wordbook_id;
      END;
    `);
    console.log('更新触发器创建成功');
    
    // 创建用户设置表
    const createUserSettingsTable = `
      CREATE TABLE IF NOT EXISTS user_settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL UNIQUE,
        vocabulary_settings JSON,
        reading_settings JSON,
        listening_settings JSON,
        writing_settings JSON,
        general_settings JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    await connection.query(createUserSettingsTable);
    console.log('用户设置表创建成功');
    
    connection.release();
  } catch (error) {
    console.error('创建表失败:', error.message);
    throw error;
  }
}

// 导入CET4词汇数据
async function importCET4Data() {
  try {
    const connection = await pool.getConnection();
    await connection.query('USE starmapenglish');
    
    // CET4词汇文件目录
    const cet4Dir = path.join(__dirname, '../public/CET4');
    
    // 获取所有JSON文件
    const jsonFiles = fs.readdirSync(cet4Dir).filter(file => file.endsWith('.json'));
    
    let totalWords = 0;
    let importedWords = 0;
    
    // 遍历所有JSON文件
    for (const file of jsonFiles) {
      const filePath = path.join(cet4Dir, file);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      totalWords += data.length;
      
      // 获取或创建词汇本
    let wordbookId;
    try {
      const [wordbookResult] = await connection.query('SELECT id FROM wordbooks WHERE name = ?', ['CET4']);
      if (wordbookResult.length > 0) {
        wordbookId = wordbookResult[0].id;
      } else {
        await connection.execute(
          `INSERT INTO wordbooks (name, description) VALUES (?, ?)`,
          ['CET4', '大学英语四级词汇']
        );
        const [newWordbook] = await connection.query('SELECT id FROM wordbooks WHERE name = ?', ['CET4']);
        wordbookId = newWordbook[0].id;
      }
    } catch (error) {
      console.error('获取词汇本失败:', error.message);
      continue;
    }
    
    // 批量插入数据
    for (const word of data) {
      try {
        await connection.execute(
          `INSERT INTO vocabulary (word, phonetic_symbol, mean, initial, wordbook_id) 
           VALUES (?, ?, ?, ?, ?) 
           ON DUPLICATE KEY UPDATE 
             phonetic_symbol = VALUES(phonetic_symbol),
             mean = VALUES(mean),
             initial = VALUES(initial),
             wordbook_id = VALUES(wordbook_id)`,
          [word.word, word.phonetic_symbol, word.mean, word.initial, wordbookId]
        );
        importedWords++;
      } catch (error) {
        console.error(`导入单词 ${word.word} 失败:`, error.message);
      }
    }
      
      console.log(`已导入 ${file} 文件，包含 ${data.length} 个单词`);
    }
    
    console.log(`\n数据导入完成！`);
    console.log(`总单词数: ${totalWords}`);
    console.log(`成功导入: ${importedWords}`);
    
    connection.release();
  } catch (error) {
    console.error('导入数据失败:', error.message);
    throw error;
  }
}

// 主函数
async function main() {
  try {
    await createTables();
    await importCET4Data();
    await pool.end();
    console.log('数据库初始化完成！');
  } catch (error) {
    console.error('初始化失败:', error.message);
    process.exit(1);
  }
}

// 执行主函数
main();
