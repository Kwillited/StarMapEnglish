// API服务层
// 统一封装fetch请求，提供统一的错误处理和请求配置

// API基础URL
const API_BASE_URL = 'http://localhost:3000/api';

/**
 * 基础请求函数
 * @param {string} endpoint - API端点路径
 * @param {Object} options - fetch选项
 * @returns {Promise<any>} - 响应数据
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // 默认请求配置
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  // 合并请求配置
  const fetchOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };
  
  try {
    const response = await fetch(url, fetchOptions);
    
    // 解析响应数据
    const data = await response.json();
    
    // 检查响应状态
    if (!response.ok) {
      throw new Error(data.error || '请求失败');
    }
    
    return data;
  } catch (error) {
    console.error(`API请求错误 (${endpoint}):`, error);
    throw error;
  }
}

/**
 * GET请求
 * @param {string} endpoint - API端点路径
 * @param {Object} params - 查询参数
 * @returns {Promise<any>} - 响应数据
 */
export function get(endpoint, params = {}) {
  // 构建查询字符串
  const queryString = params && Object.keys(params).length
    ? `?${new URLSearchParams(params).toString()}`
    : '';
  
  return request(`${endpoint}${queryString}`, { method: 'GET' });
}

/**
 * POST请求
 * @param {string} endpoint - API端点路径
 * @param {Object} data - 请求体数据
 * @returns {Promise<any>} - 响应数据
 */
export function post(endpoint, data = {}) {
  return request(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * PUT请求
 * @param {string} endpoint - API端点路径
 * @param {Object} data - 请求体数据
 * @returns {Promise<any>} - 响应数据
 */
export function put(endpoint, data = {}) {
  return request(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * DELETE请求
 * @param {string} endpoint - API端点路径
 * @returns {Promise<any>} - 响应数据
 */
export function del(endpoint) {
  return request(endpoint, { method: 'DELETE' });
}

// API端点封装
const api = {
  // 认证相关API
  auth: {
    /**
     * 用户登录
     * @param {Object} credentials - 登录凭证
     * @param {string} credentials.phone - 手机号
     * @param {string} credentials.password - 密码
     * @returns {Promise<any>} - 登录结果
     */
    login(credentials) {
      return post('/login', credentials);
    },
    
    /**
     * 用户注册
     * @param {Object} userData - 用户注册数据
     * @param {string} userData.username - 用户名
     * @param {string} userData.phone - 手机号
     * @param {string} userData.password - 密码
     * @param {string} [userData.exam_type] - 考试类型
     * @returns {Promise<any>} - 注册结果
     */
    register(userData) {
      return post('/register', userData);
    },
  },
  
  // 用户相关API
  users: {
    /**
     * 获取用户信息
     * @param {number} userId - 用户ID
     * @returns {Promise<any>} - 用户信息
     */
    getUser(userId) {
      return get(`/users/${userId}`);
    },
    
    /**
     * 更新用户信息
     * @param {number} userId - 用户ID
     * @param {Object} userData - 用户数据
     * @returns {Promise<any>} - 更新结果
     */
    updateUser(userId, userData) {
      return put(`/users/${userId}`, userData);
    },
    
    /**
     * 获取当前用户信息
     * @returns {Promise<any>} - 当前用户信息
     */
    getCurrentUser() {
      return get('/current-user');
    },
  },
  
  // 设置相关API
  settings: {
    /**
     * 获取用户设置
     * @param {number} userId - 用户ID
     * @returns {Promise<any>} - 用户设置
     */
    getSettings(userId) {
      return get(`/settings/${userId}`);
    },
    
    /**
     * 更新用户设置
     * @param {number} userId - 用户ID
     * @param {Object} settings - 设置数据
     * @returns {Promise<any>} - 更新结果
     */
    updateSettings(userId, settings) {
      return put(`/settings/${userId}`, settings);
    },
    
    /**
     * 获取默认设置
     * @returns {Promise<any>} - 默认设置
     */
    getDefaultSettings() {
      return get('/settings');
    },
  },
  
  // 词汇本相关API
  wordbooks: {
    /**
     * 获取所有词汇本
     * @returns {Promise<any>} - 词汇本列表
     */
    getAll() {
      return get('/wordbooks');
    },
    
    /**
     * 获取词汇本的所有词汇
     * @param {number} wordbookId - 词汇本ID
     * @returns {Promise<any>} - 词汇列表
     */
    getVocabulary(wordbookId) {
      return get(`/wordbooks/${wordbookId}/vocabulary`);
    },
    
    /**
     * 按词汇本和首字母获取词汇
     * @param {number} wordbookId - 词汇本ID
     * @param {string} initial - 首字母
     * @returns {Promise<any>} - 词汇列表
     */
    getVocabularyByInitial(wordbookId, initial) {
      return get(`/wordbooks/${wordbookId}/vocabulary/${initial}`);
    },
    
    /**
     * 在特定词汇本中搜索词汇
     * @param {number} wordbookId - 词汇本ID
     * @param {string} keyword - 搜索关键词
     * @returns {Promise<any>} - 搜索结果
     */
    searchVocabulary(wordbookId, keyword) {
      return get(`/wordbooks/${wordbookId}/vocabulary/search/${keyword}`);
    },
  },
  
  // 词汇相关API
  vocabulary: {
    /**
     * 获取所有词汇
     * @returns {Promise<any>} - 词汇列表
     */
    getAll() {
      return get('/vocabulary');
    },
    
    /**
     * 按首字母获取词汇
     * @param {string} initial - 首字母
     * @returns {Promise<any>} - 词汇列表
     */
    getByInitial(initial) {
      return get(`/vocabulary/${initial}`);
    },
    
    /**
     * 搜索词汇
     * @param {string} keyword - 搜索关键词
     * @returns {Promise<any>} - 搜索结果
     */
    search(keyword) {
      return get(`/vocabulary/search/${keyword}`);
    },
  },
};

export default api;