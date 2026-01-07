import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createPool } from 'mysql2/promise';

// 加载环境变量
dotenv.config();

// 创建Express应用
const app = express();

// 配置中间件
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// 创建数据库连接池
const pool = createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'starmapenglish',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 测试数据库连接
async function testDbConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('数据库连接成功');
    connection.release();
  } catch (error) {
    console.error('数据库连接失败:', error.message);
    process.exit(1);
  }
}

testDbConnection();

// API端点：获取所有词汇本
app.get('/api/wordbooks', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM wordbooks ORDER BY name');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API端点：获取特定词汇本的所有词汇
app.get('/api/wordbooks/:wordbookId/vocabulary', async (req, res) => {
  try {
    const { wordbookId } = req.params;
    const [rows] = await pool.query('SELECT * FROM vocabulary WHERE wordbook_id = ? ORDER BY word', [wordbookId]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API端点：按词汇本和首字母获取词汇
app.get('/api/wordbooks/:wordbookId/vocabulary/:initial', async (req, res) => {
  try {
    const { wordbookId, initial } = req.params;
    const [rows] = await pool.query(
      'SELECT * FROM vocabulary WHERE wordbook_id = ? AND initial = ? ORDER BY word',
      [wordbookId, initial.toUpperCase()]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API端点：在特定词汇本中搜索词汇
app.get('/api/wordbooks/:wordbookId/vocabulary/search/:keyword', async (req, res) => {
  try {
    const { wordbookId, keyword } = req.params;
    const [rows] = await pool.query(
      'SELECT * FROM vocabulary WHERE wordbook_id = ? AND word LIKE ? ORDER BY word',
      [wordbookId, `%${keyword}%`]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API端点：获取所有词汇（保留原有功能）
app.get('/api/vocabulary', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM vocabulary ORDER BY word');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API端点：按首字母获取词汇（保留原有功能）
app.get('/api/vocabulary/:initial', async (req, res) => {
  try {
    const { initial } = req.params;
    const [rows] = await pool.query('SELECT * FROM vocabulary WHERE initial = ? ORDER BY word', [initial.toUpperCase()]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API端点：搜索词汇（保留原有功能）
app.get('/api/vocabulary/search/:keyword', async (req, res) => {
  try {
    const { keyword } = req.params;
    const [rows] = await pool.query('SELECT * FROM vocabulary WHERE word LIKE ? ORDER BY word', [`%${keyword}%`]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API端点：获取用户设置
app.get('/api/settings/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const [rows] = await pool.query(
      `SELECT * FROM user_settings WHERE user_id = ?`,
      [userId]
    );
    
    if (rows.length > 0) {
      const settings = {
        vocabulary: rows[0].vocabulary_settings,
        reading: rows[0].reading_settings,
        listening: rows[0].listening_settings,
        writing: rows[0].writing_settings,
        general: rows[0].general_settings
      };
      res.json(settings);
    } else {
      res.status(404).json({ error: '设置未找到' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API端点：更新用户设置
app.put('/api/settings/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { vocabulary, reading, listening, writing, general } = req.body;
    
    await pool.execute(
      `INSERT INTO user_settings (user_id, vocabulary_settings, reading_settings, listening_settings, writing_settings, general_settings) 
       VALUES (?, ?, ?, ?, ?, ?) 
       ON DUPLICATE KEY UPDATE 
         vocabulary_settings = VALUES(vocabulary_settings),
         reading_settings = VALUES(reading_settings),
         listening_settings = VALUES(listening_settings),
         writing_settings = VALUES(writing_settings),
         general_settings = VALUES(general_settings)`,
      [userId, JSON.stringify(vocabulary), JSON.stringify(reading), 
       JSON.stringify(listening), JSON.stringify(writing), 
       JSON.stringify(general)]
    );
    
    res.json({ message: '设置更新成功' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API端点：获取默认设置
app.get('/api/settings', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM user_settings WHERE user_id = ?`,
      [1]
    );
    
    if (rows.length > 0) {
      const settings = {
        vocabulary: rows[0].vocabulary_settings,
        reading: rows[0].reading_settings,
        listening: rows[0].listening_settings,
        writing: rows[0].writing_settings,
        general: rows[0].general_settings
      };
      res.json(settings);
    } else {
      res.status(404).json({ error: '默认设置未找到' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API端点：获取用户信息
app.get('/api/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const [rows] = await pool.query(
      `SELECT id, username, phone, exam_type FROM users WHERE id = ?`,
      [userId]
    );
    
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: '用户未找到' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API端点：更新用户信息
app.put('/api/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, phone, exam_type } = req.body;
    
    await pool.execute(
      `UPDATE users SET username = ?, phone = ?, exam_type = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [username, phone, exam_type, userId]
    );
    
    res.json({ message: '用户信息更新成功' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API端点：获取当前登录用户信息（示例）
app.get('/api/current-user', async (req, res) => {
  try {
    // 实际应用中，这里应该从JWT令牌或会话中获取用户ID
    const [rows] = await pool.query(
      `SELECT id, username, phone, exam_type FROM users WHERE id = ?`,
      [1] // 默认返回ID为1的用户，实际应用中应该是动态获取
    );
    
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: '用户未找到' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API端点：用户注册
app.post('/api/register', async (req, res) => {
  try {
    const { username, phone, password, exam_type } = req.body;
    
    // 检查手机号是否已存在
    const [existingUsers] = await pool.query(
      `SELECT id FROM users WHERE phone = ?`,
      [phone]
    );
    
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: '该手机号已被注册' });
    }
    
    // 插入新用户
    const [result] = await pool.execute(
      `INSERT INTO users (username, phone, password, exam_type) VALUES (?, ?, ?, ?)`,
      [username, phone, password, exam_type || '大学英语四级']
    );
    
    // 获取新插入用户的ID
    const userId = result.insertId;
    
    // 为新用户创建默认设置
    const defaultSettings = {
      vocabulary: {
        selectedBook: 1,
        dailyWords: 50,
        reviewInterval: 1,
        showPronunciation: true,
        autoPlayAudio: false
      },
      reading: {
        dailyArticles: 2,
        difficulty: 'medium',
        showTranslation: true,
        autoHighlight: true
      },
      listening: {
        dailyMinutes: 30,
        speed: 1,
        showTranscript: true,
        autoPlayNext: false
      },
      writing: {
        dailyPractice: 1,
        topicType: 'mixed',
        autoCheckGrammar: true,
        wordLimit: 200
      },
      general: {
        dailyReminder: true,
        notificationSound: true,
        darkMode: true,
        language: 'zh-CN'
      }
    };
    
    // 插入默认设置到user_settings表
    await pool.execute(
      `INSERT INTO user_settings (user_id, vocabulary_settings, reading_settings, listening_settings, writing_settings, general_settings) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, JSON.stringify(defaultSettings.vocabulary), JSON.stringify(defaultSettings.reading), 
       JSON.stringify(defaultSettings.listening), JSON.stringify(defaultSettings.writing), 
       JSON.stringify(defaultSettings.general)]
    );
    
    res.json({ message: '注册成功' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API端点：用户登录
app.post('/api/login', async (req, res) => {
  try {
    const { phone, password } = req.body;
    
    // 检查用户是否存在
    const [users] = await pool.query(
      `SELECT id, username, phone, exam_type FROM users WHERE phone = ? AND password = ?`,
      [phone, password]
    );
    
    if (users.length > 0) {
      const user = users[0];
      
      // 检查是否存在对应的设置记录
      const [settings] = await pool.query(
        `SELECT id FROM user_settings WHERE user_id = ?`,
        [user.id]
      );
      
      if (settings.length === 0) {
        // 如果没有设置记录，创建默认设置
        const defaultSettings = {
          vocabulary: {
            selectedBook: 1,
            dailyWords: 50,
            reviewInterval: 1,
            showPronunciation: true,
            autoPlayAudio: false
          },
          reading: {
            dailyArticles: 2,
            difficulty: 'medium',
            showTranslation: true,
            autoHighlight: true
          },
          listening: {
            dailyMinutes: 30,
            speed: 1,
            showTranscript: true,
            autoPlayNext: false
          },
          writing: {
            dailyPractice: 1,
            topicType: 'mixed',
            autoCheckGrammar: true,
            wordLimit: 200
          },
          general: {
            dailyReminder: true,
            notificationSound: true,
            darkMode: true,
            language: 'zh-CN'
          }
        };
        
        // 插入默认设置到user_settings表
        await pool.execute(
          `INSERT INTO user_settings (user_id, vocabulary_settings, reading_settings, listening_settings, writing_settings, general_settings) 
           VALUES (?, ?, ?, ?, ?, ?)`,
          [user.id, JSON.stringify(defaultSettings.vocabulary), JSON.stringify(defaultSettings.reading), 
           JSON.stringify(defaultSettings.listening), JSON.stringify(defaultSettings.writing), 
           JSON.stringify(defaultSettings.general)]
        );
      }
      
      res.json(user);
    } else {
      res.status(401).json({ error: '手机号或密码错误' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});

export { pool };
