<script setup>
// 词汇学习设置页面
import { ref, onMounted, watch } from 'vue';
import { useWordManagementStore } from '../../../stores/wordManagement.js';
import { useUserStore } from '../../../stores/userStore.js';
import * as XLSX from 'xlsx';

// 使用单词管理 Pinia store
const wordStore = useWordManagementStore();

// 使用用户状态 Pinia store
const userStore = useUserStore();

// 词汇本数据
const vocabularyBooks = ref([]);

// 单词数调整相关状态
const adjustStep = ref(10); // 调整步长
const isCustomInput = ref(false); // 是否显示自定义输入框

// 加载状态
const isLoading = ref(true);
const saveMessage = ref('');

// 学习设置数据
const settings = ref({
  vocabulary: {
    selectedBook: 1,
    dailyWords: 50,
    reviewInterval: 1,
    showPronunciation: true,
    autoPlayAudio: false
  }
});

// 导出格式选择
const exportFormat = ref('json'); // json, xlsx

// 调整每日学习单词数量
const adjustWordCount = (amount) => {
  settings.value.vocabulary.dailyWords = Math.max(10, Math.min(200, settings.value.vocabulary.dailyWords + amount));
};

// 直接设置每日学习单词数量
const setWordCount = (value) => {
  const num = parseInt(value);
  if (!isNaN(num)) {
    settings.value.vocabulary.dailyWords = Math.max(10, Math.min(200, num));
  }
};

// 切换自定义输入模式
const toggleCustomInput = () => {
  isCustomInput.value = !isCustomInput.value;
};

// 预设学习计划
const presetPlans = [
  { id: 1, name: '轻松模式', count: 30 },
  { id: 2, name: '标准模式', count: 50 },
  { id: 3, name: '高效模式', count: 80 },
  { id: 4, name: '冲刺模式', count: 120 }
];

// 应用预设计划
const applyPresetPlan = (count) => {
  settings.value.vocabulary.dailyWords = count;
};

// 导入导出功能
const handleImport = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        let data;
        const fileExt = file.name.split('.').pop().toLowerCase();
        
        if (fileExt === 'json') {
          // 处理JSON文件
          data = JSON.parse(e.target.result);
        } else if (['xlsx', 'xls'].includes(fileExt)) {
          // 处理Excel文件
          const workbook = XLSX.read(e.target.result, { type: 'array' });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          
          // 将Excel数据转换为应用所需格式
          data = {
            vocabulary: {
              ...settings.value.vocabulary,
              // 假设Excel中包含单词列表等数据
              words: jsonData
            }
          };
        } else {
          throw new Error('不支持的文件格式');
        }
        
        // 这里可以添加导入逻辑
        console.log('导入的数据:', data);
        alert('词汇导入成功！');
      } catch (error) {
        console.error('导入失败:', error);
        alert('导入失败，请检查文件格式是否正确！');
      }
    };
    
    if (file.name.split('.').pop().toLowerCase() === 'json') {
      reader.readAsText(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  }
};

const handleExport = () => {
  // 这里可以添加导出逻辑
  const exportData = {
    vocabulary: settings.value.vocabulary,
    exportedAt: new Date().toISOString()
  };
  
  if (exportFormat.value === 'json') {
    // 导出为JSON
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'vocabulary-settings.json';
    link.click();
    URL.revokeObjectURL(url);
  } else if (exportFormat.value === 'xlsx') {
    // 导出为Excel
    // 准备Excel数据 - 这里根据需要调整数据结构
    const excelData = [
      // 设置信息
      [{ v: '词汇学习设置', s: { bold: true, colspan: 2 } }],
      [{ v: '选择词汇本', s: { bold: true } }, { v: exportData.vocabulary.selectedBook }],
      [{ v: '每日学习单词数', s: { bold: true } }, { v: exportData.vocabulary.dailyWords }],
      [{ v: '复习间隔（天）', s: { bold: true } }, { v: exportData.vocabulary.reviewInterval }],
      [{ v: '显示发音', s: { bold: true } }, { v: exportData.vocabulary.showPronunciation ? '是' : '否' }],
      [{ v: '自动播放音频', s: { bold: true } }, { v: exportData.vocabulary.autoPlayAudio ? '是' : '否' }],
      [{ v: '导出时间', s: { bold: true } }, { v: new Date().toLocaleString() }],
    ];
    
    // 创建工作簿和工作表
    const worksheet = XLSX.utils.aoa_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, '词汇设置');
    
    // 导出文件
    XLSX.writeFile(workbook, 'vocabulary-settings.xlsx');
  }
  
  console.log('导出的数据:', exportData);
};

// 从后端获取词汇本数据
const fetchVocabularyBooks = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/wordbooks');
    if (response.ok) {
      const data = await response.json();
      vocabularyBooks.value = data;
    } else {
      console.error('Failed to fetch vocabulary books');
    }
  } catch (error) {
    console.error('Error fetching vocabulary books:', error);
  }
};

// 从后端获取设置
const fetchSettings = async () => {
  try {
    isLoading.value = true;
    const response = await fetch(`http://localhost:3000/api/settings/${userStore.userInfo.id}`);
    if (response.ok) {
      const data = await response.json();
      settings.value = data;
      // 更新Pinia store中的每日学习单词数
      wordStore.updateDailyWords(settings.value.vocabulary.dailyWords);
    } else {
      console.error('Failed to fetch settings');
    }
  } catch (error) {
    console.error('Error fetching settings:', error);
  } finally {
    isLoading.value = false;
  }
};

// 保存设置到后端
const saveSettings = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/settings/${userStore.userInfo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(settings.value)
    });
    
    if (response.ok) {
      saveMessage.value = '设置保存成功！';
      // 更新Pinia store中的每日学习单词数
      wordStore.updateDailyWords(settings.value.vocabulary.dailyWords);
      setTimeout(() => {
        saveMessage.value = '';
      }, 3000);
    } else {
      saveMessage.value = '保存失败，请重试';
    }
  } catch (error) {
    console.error('Error saving settings:', error);
    saveMessage.value = '保存失败，请检查网络连接';
  }
};

// 监听设置变化，自动保存
watch(settings, () => {
  saveSettings();
}, { deep: true });

// 组件挂载时获取数据
onMounted(async () => {
  await fetchVocabularyBooks();
  await fetchSettings();
});
</script>

<template>
  <div class="space-y-4">
    <!-- 页面顶部 -->
    <div class="p-4 mb-4">
      <!-- 返回按钮和标题 -->
      <div class="flex items-center justify-between mb-3">
        <router-link to="/settings" class="text-white hover:text-vocab transition-colors">
          <i class="fa-solid fa-arrow-left text-xl"></i>
        </router-link>
        
        <h3 class="text-lg font-semibold text-white">词汇学习设置</h3>
        
        <!-- 占位元素，保持标题居中 -->
        <div class="w-6"></div>
      </div>
      
      <!-- 保存消息 -->
      <div v-if="saveMessage" class="text-sm text-green-400 flex items-center justify-center">
        <i class="fa-solid fa-check-circle mr-1"></i>
        {{ saveMessage }}
      </div>
    </div>
    
    <!-- 词汇学习设置卡片 -->
    <div class="glass-card bg-slate-800/50 p-4 rounded-lg mx-4">
      <h3 class="text-lg font-semibold text-white mb-3 flex items-center">
        <i class="fa-solid fa-shapes text-vocab mr-2"></i>
        词汇学习设置
      </h3>
      <div class="space-y-6">
        <!-- 词汇本选择 -->
        <div class="flex flex-col gap-2">
          <label class="text-slate-400">选择词汇本</label>
          <select 
            v-model="settings.vocabulary.selectedBook" 
            class="w-full bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-vocab transition-colors"
          >
            <option 
              v-for="book in vocabularyBooks" 
              :key="book.id" 
              :value="book.id"
            >
              {{ book.name }} ({{ book.word_count }} 个单词)
            </option>
          </select>
        </div>
        
        <!-- 每日学习单词数量调整 -->
        <div>
          <label class="text-slate-400 block mb-2">每日学习单词数</label>
          
          <!-- 主调整控件 -->
          <div class="bg-slate-800/30 p-4 rounded-lg">
            <!-- 调整控件 -->
            <div class="flex items-center gap-3 mb-4">
              <!-- 小幅度减少按钮 -->
              <button 
                @click="adjustWordCount(-adjustStep)"
                class="bg-slate-700/50 hover:bg-slate-600/50 text-white px-3 py-1 rounded-full transition-colors"
                title="减少{{ adjustStep }}个"
              >
                <i class="fa-solid fa-minus"></i>
              </button>
              
              <!-- 数量显示/自定义输入 -->
              <div class="flex-1 flex items-center justify-center">
                <div v-if="!isCustomInput" class="flex items-center gap-2">
                  <span class="text-xl font-bold text-white">{{ settings.vocabulary.dailyWords }}</span>
                  <button 
                    @click="toggleCustomInput"
                    class="text-slate-400 hover:text-white text-sm"
                    title="自定义输入"
                  >
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                </div>
                <div v-else class="w-full max-w-24">
                  <input 
                    type="number" 
                    v-model.number="settings.vocabulary.dailyWords"
                    @blur="isCustomInput = false"
                    @keyup.enter="isCustomInput = false"
                    :min="10" 
                    :max="200"
                    class="w-full bg-slate-700/50 border border-vocab rounded px-3 py-1 text-white text-center focus:outline-none"
                  />
                </div>
              </div>
              
              <!-- 小幅度增加按钮 -->
              <button 
                @click="adjustWordCount(adjustStep)"
                class="bg-slate-700/50 hover:bg-slate-600/50 text-white px-3 py-1 rounded-full transition-colors"
                title="增加{{ adjustStep }}个"
              >
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
            
            <!-- 调整步长选择 -->
            <div class="flex items-center gap-2 mb-4">
              <span class="text-xs text-slate-400 whitespace-nowrap">调整步长:</span>
              <div class="flex gap-1 flex-1">
                <button 
                  v-for="step in [1, 5, 10, 20]" 
                  :key="step"
                  @click="adjustStep = step"
                  :class="[
                    'text-xs px-3 py-1 rounded-full transition-colors flex-1 text-center',
                    adjustStep === step ? 'bg-vocab text-white' : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
                  ]"
                >
                  {{ step }}个
                </button>
              </div>
            </div>
            
            <!-- 预设计划 -->
            <div>
              <span class="text-xs text-slate-400 block mb-2">预设计划:</span>
              <div class="flex flex-wrap gap-2">
                <button 
                  v-for="plan in presetPlans" 
                  :key="plan.name"
                  @click="applyPresetPlan(plan.count)"
                  :class="[
                    'text-xs px-4 py-1 rounded-full transition-colors whitespace-nowrap',
                    settings.vocabulary.dailyWords === plan.count ? 'bg-vocab text-white' : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
                  ]"
                >
                  {{ plan.name }} ({{ plan.count }}个)
                </button>
              </div>
            </div>
          </div>
          
          <!-- 范围提示 -->
          <div class="flex justify-between text-xs text-slate-500 mt-2">
            <span>最少: 10</span>
            <span>最多: 200</span>
          </div>
        </div>
        
        <!-- 其他词汇学习设置 -->
        <div class="space-y-4">
          <div class="flex flex-col gap-2">
            <label class="text-slate-400">复习间隔（天）</label>
            <input 
              type="number" 
              v-model.number="settings.vocabulary.reviewInterval"
              min="1" 
              max="30"
              class="w-24 bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white"
            />
          </div>
          <div class="flex justify-between items-center">
            <label class="text-slate-400">显示发音</label>
            <button 
              :class="[
                'w-12 h-6 rounded-full flex items-center transition-all',
                settings.vocabulary.showPronunciation ? 'bg-vocab justify-end' : 'bg-slate-700/50 justify-start border border-slate-600'
              ]"
              @click="settings.vocabulary.showPronunciation = !settings.vocabulary.showPronunciation"
            >
              <div class="w-4 h-4 bg-white rounded-full transition-transform"></div>
            </button>
          </div>
          <div class="flex justify-between items-center">
            <label class="text-slate-400">自动播放音频</label>
            <button 
              :class="[
                'w-12 h-6 rounded-full flex items-center transition-all',
                settings.vocabulary.autoPlayAudio ? 'bg-vocab justify-end' : 'bg-slate-700/50 justify-start border border-slate-600'
              ]"
              @click="settings.vocabulary.autoPlayAudio = !settings.vocabulary.autoPlayAudio"
            >
              <div class="w-4 h-4 bg-white rounded-full transition-transform"></div>
            </button>
          </div>
        </div>
        
        <!-- 导入导出功能 -->
        <div class="border-t border-slate-700 pt-4 mt-4">
          <h3 class="text-sm font-semibold text-white mb-3">词汇库管理</h3>
          <div class="space-y-4">
            <!-- 导入按钮 -->
            <div>
              <label class="block text-slate-400 text-sm mb-2">导入词汇设置</label>
              <div class="flex items-center gap-2">
                <input 
                  type="file" 
                  id="importFile" 
                  accept=".json, .xlsx, .xls" 
                  class="hidden"
                  @change="handleImport"
                />
                <label 
                  for="importFile"
                  class="flex-1 bg-slate-700/50 hover:bg-slate-600/50 text-white px-4 py-2 rounded-full transition-colors text-sm cursor-pointer flex items-center justify-center"
                >
                  <i class="fa-solid fa-file-import mr-1"></i>
                  选择文件
                </label>
              </div>
              <p class="text-xs text-slate-500 mt-1">支持JSON、Excel(.xlsx)和Excel 97-2003(.xls)格式的词汇设置文件</p>
            </div>
            
            <!-- 导出按钮 -->
            <div>
              <label class="block text-slate-400 text-sm mb-2">导出词汇设置</label>
              
              <!-- 导出格式选择 -->
              <div class="mb-2">
                <select 
                  v-model="exportFormat"
                  class="bg-slate-700/50 border border-slate-600 rounded px-3 py-1 text-white text-sm w-full"
                >
                  <option value="json">JSON格式</option>
                  <option value="xlsx">Excel格式</option>
                </select>
              </div>
              
              <button 
                @click="handleExport"
                class="w-full bg-vocab hover:bg-vocab/90 text-white px-4 py-2 rounded-full transition-colors text-sm flex items-center justify-center"
              >
                <i class="fa-solid fa-file-export mr-1"></i>
                导出设置
              </button>
              <p class="text-xs text-slate-500 mt-1">导出当前词汇设置</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>