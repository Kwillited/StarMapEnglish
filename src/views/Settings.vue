<script setup>
// 设置页面
import { ref } from 'vue';

// 选项卡状态管理
const activeTab = ref('profile'); // profile, vocabulary, reading, listening, writing, general

// 切换选项卡
const switchTab = (tab) => {
  activeTab.value = tab;
};

// 词汇本数据
const vocabularyBooks = [
  { id: 1, name: '考研英语核心词汇', wordsCount: 5500 },
  { id: 2, name: '经济类专业词汇', wordsCount: 1200 },
  { id: 3, name: '科技类专业词汇', wordsCount: 1800 },
  { id: 4, name: '日常英语高频词汇', wordsCount: 3000 }
];

// 单词数调整相关状态
const adjustStep = ref(10); // 调整步长
const isCustomInput = ref(false); // 是否显示自定义输入框

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
  { name: '轻松模式', count: 30 },
  { name: '标准模式', count: 50 },
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
        const data = JSON.parse(e.target.result);
        // 这里可以添加导入逻辑
        console.log('导入的数据:', data);
        alert('词汇导入成功！');
      } catch (error) {
        console.error('导入失败:', error);
        alert('导入失败，请检查文件格式是否正确！');
      }
    };
    reader.readAsText(file);
  }
};

const handleExport = () => {
  // 这里可以添加导出逻辑
  const exportData = {
    vocabulary: settings.value.vocabulary,
    exportedAt: new Date().toISOString()
  };
  const dataStr = JSON.stringify(exportData, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'vocabulary-settings.json';
  link.click();
  URL.revokeObjectURL(url);
  console.log('导出的数据:', exportData);
};

// 学习设置数据
const settings = ref({
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
});
</script>

<template>
  <div class="glass-card p-6 rounded-xl">
    <h2 class="text-2xl font-bold text-white mb-4 flex items-center">
      <i class="fa-solid fa-gear text-white mr-2"></i>
      设置中心
    </h2>
    
    <!-- 选项卡导航 -->
    <div class="border-b border-slate-700 mb-6">
      <div class="flex flex-wrap gap-1">
        <button 
          @click="switchTab('profile')"
          :class="[
            'px-4 py-2 rounded-t-lg text-sm font-medium transition-all whitespace-nowrap',
            activeTab === 'profile' ? 'bg-slate-800/50 text-white border-b-2 border-vocab' : 'text-slate-400 hover:text-white hover:bg-slate-800/30'
          ]"
        >
          <i class="fa-solid fa-user mr-1"></i>
          个人信息
        </button>
        <button 
          @click="switchTab('vocabulary')"
          :class="[
            'px-4 py-2 rounded-t-lg text-sm font-medium transition-all whitespace-nowrap',
            activeTab === 'vocabulary' ? 'bg-slate-800/50 text-white border-b-2 border-vocab' : 'text-slate-400 hover:text-white hover:bg-slate-800/30'
          ]"
        >
          <i class="fa-solid fa-shapes mr-1"></i>
          词汇学习
        </button>
        <button 
          @click="switchTab('reading')"
          :class="[
            'px-4 py-2 rounded-t-lg text-sm font-medium transition-all whitespace-nowrap',
            activeTab === 'reading' ? 'bg-slate-800/50 text-white border-b-2 border-read' : 'text-slate-400 hover:text-white hover:bg-slate-800/30'
          ]"
        >
          <i class="fa-solid fa-book-open mr-1"></i>
          阅读学习
        </button>
        <button 
          @click="switchTab('listening')"
          :class="[
            'px-4 py-2 rounded-t-lg text-sm font-medium transition-all whitespace-nowrap',
            activeTab === 'listening' ? 'bg-slate-800/50 text-white border-b-2 border-listen' : 'text-slate-400 hover:text-white hover:bg-slate-800/30'
          ]"
        >
          <i class="fa-solid fa-headphones mr-1"></i>
          听力学习
        </button>
        <button 
          @click="switchTab('writing')"
          :class="[
            'px-4 py-2 rounded-t-lg text-sm font-medium transition-all whitespace-nowrap',
            activeTab === 'writing' ? 'bg-slate-800/50 text-white border-b-2 border-write' : 'text-slate-400 hover:text-white hover:bg-slate-800/30'
          ]"
        >
          <i class="fa-solid fa-pen-nib mr-1"></i>
          写作学习
        </button>
        <button 
          @click="switchTab('general')"
          :class="[
            'px-4 py-2 rounded-t-lg text-sm font-medium transition-all whitespace-nowrap',
            activeTab === 'general' ? 'bg-slate-800/50 text-white border-b-2 border-white' : 'text-slate-400 hover:text-white hover:bg-slate-800/30'
          ]"
        >
          <i class="fa-solid fa-sliders mr-1"></i>
          通用设置
        </button>
      </div>
    </div>
    
    <!-- 选项卡内容 -->
    <div class="space-y-4">
      <!-- 个人信息选项卡 -->
      <div v-if="activeTab === 'profile'" class="space-y-4">
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h3 class="text-lg font-semibold text-white mb-3">个人信息</h3>
          <div class="space-y-3">
            <div class="flex flex-col sm:flex-row sm:items-center gap-2">
              <label class="text-slate-400 w-24">用户名</label>
              <input type="text" class="bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white flex-1" value="Alex" />
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center gap-2">
              <label class="text-slate-400 w-24">考试类型</label>
              <select class="bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white flex-1">
                <option>2026考研英语一</option>
                <option>2026考研英语二</option>
                <option>大学英语四级</option>
                <option>大学英语六级</option>
                <option>托福</option>
                <option>雅思</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 词汇学习设置选项卡 -->
      <div v-if="activeTab === 'vocabulary'" class="space-y-4">
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h3 class="text-lg font-semibold text-white mb-3 flex items-center">
            <i class="fa-solid fa-shapes text-vocab mr-2"></i>
            词汇学习设置
          </h3>
          <div class="space-y-6">
            <!-- 词汇本选择 -->
            <div class="flex flex-col sm:flex-row sm:items-center gap-2">
              <label class="text-slate-400 w-40">选择词汇本</label>
              <select 
                v-model="settings.vocabulary.selectedBook" 
                class="w-full sm:w-64 bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-vocab transition-colors"
              >
                <option 
                  v-for="book in vocabularyBooks" 
                  :key="book.id" 
                  :value="book.id"
                >
                  {{ book.name }} ({{ book.wordsCount }} 个单词)
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
                  <div class="flex flex-col sm:flex-row gap-2 sm:overflow-x-auto sm:pb-2">
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
              <div class="flex flex-col sm:flex-row sm:items-center gap-2">
                <label class="text-slate-400 w-40">复习间隔（天）</label>
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
              <div class="flex flex-col sm:flex-row gap-3">
                <!-- 导入按钮 -->
                <div class="flex-1">
                  <label class="block text-slate-400 text-sm mb-2">导入词汇设置</label>
                  <div class="flex items-center gap-2">
                    <input 
                      type="file" 
                      id="importFile" 
                      accept=".json" 
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
                  <p class="text-xs text-slate-500 mt-1">支持JSON格式的词汇设置文件</p>
                </div>
                
                <!-- 导出按钮 -->
                <div class="flex-1">
                  <label class="block text-slate-400 text-sm mb-2">导出词汇设置</label>
                  <button 
                    @click="handleExport"
                    class="w-full bg-vocab hover:bg-vocab/90 text-white px-4 py-2 rounded-full transition-colors text-sm flex items-center justify-center"
                  >
                    <i class="fa-solid fa-file-export mr-1"></i>
                    导出设置
                  </button>
                  <p class="text-xs text-slate-500 mt-1">导出当前词汇设置为JSON文件</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 阅读学习设置选项卡 -->
      <div v-if="activeTab === 'reading'" class="space-y-4">
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h3 class="text-lg font-semibold text-white mb-3 flex items-center">
            <i class="fa-solid fa-book-open text-read mr-2"></i>
            阅读学习设置
          </h3>
          <div class="space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center gap-2">
              <label class="text-slate-400 w-40">每日阅读文章数</label>
              <input 
                type="number" 
                v-model.number="settings.reading.dailyArticles"
                min="1" 
                max="10"
                class="bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white w-24"
              />
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center gap-2">
              <label class="text-slate-400 w-40">文章难度</label>
              <select 
                v-model="settings.reading.difficulty"
                class="bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white w-32"
              >
                <option value="easy">简单</option>
                <option value="medium">中等</option>
                <option value="hard">困难</option>
              </select>
            </div>
            <div class="flex justify-between items-center">
              <label class="text-slate-400">显示翻译</label>
              <button 
                :class="[
                  'w-12 h-6 rounded-full flex items-center transition-all',
                  settings.reading.showTranslation ? 'bg-read justify-end' : 'bg-slate-700/50 justify-start border border-slate-600'
                ]"
                @click="settings.reading.showTranslation = !settings.reading.showTranslation"
              >
                <div class="w-4 h-4 bg-white rounded-full transition-transform"></div>
              </button>
            </div>
            <div class="flex justify-between items-center">
              <label class="text-slate-400">自动高亮生词</label>
              <button 
                :class="[
                  'w-12 h-6 rounded-full flex items-center transition-all',
                  settings.reading.autoHighlight ? 'bg-read justify-end' : 'bg-slate-700/50 justify-start border border-slate-600'
                ]"
                @click="settings.reading.autoHighlight = !settings.reading.autoHighlight"
              >
                <div class="w-4 h-4 bg-white rounded-full transition-transform"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 听力学习设置选项卡 -->
      <div v-if="activeTab === 'listening'" class="space-y-4">
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h3 class="text-lg font-semibold text-white mb-3 flex items-center">
            <i class="fa-solid fa-headphones text-listen mr-2"></i>
            听力学习设置
          </h3>
          <div class="space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center gap-2">
              <label class="text-slate-400 w-40">每日听力时长（分钟）</label>
              <input 
                type="number" 
                v-model.number="settings.listening.dailyMinutes"
                min="5" 
                max="120"
                class="bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white w-24"
              />
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center gap-2">
              <label class="text-slate-400 w-40">播放速度</label>
              <select 
                v-model="settings.listening.speed"
                class="bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white w-32"
              >
                <option :value="0.5">0.5x</option>
                <option :value="0.75">0.75x</option>
                <option :value="1">1.0x</option>
                <option :value="1.25">1.25x</option>
                <option :value="1.5">1.5x</option>
                <option :value="2">2.0x</option>
              </select>
            </div>
            <div class="flex justify-between items-center">
              <label class="text-slate-400">显示 transcript</label>
              <button 
                :class="[
                  'w-12 h-6 rounded-full flex items-center transition-all',
                  settings.listening.showTranscript ? 'bg-listen justify-end' : 'bg-slate-700/50 justify-start border border-slate-600'
                ]"
                @click="settings.listening.showTranscript = !settings.listening.showTranscript"
              >
                <div class="w-4 h-4 bg-white rounded-full transition-transform"></div>
              </button>
            </div>
            <div class="flex justify-between items-center">
              <label class="text-slate-400">自动播放下一个</label>
              <button 
                :class="[
                  'w-12 h-6 rounded-full flex items-center transition-all',
                  settings.listening.autoPlayNext ? 'bg-listen justify-end' : 'bg-slate-700/50 justify-start border border-slate-600'
                ]"
                @click="settings.listening.autoPlayNext = !settings.listening.autoPlayNext"
              >
                <div class="w-4 h-4 bg-white rounded-full transition-transform"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 写作学习设置选项卡 -->
      <div v-if="activeTab === 'writing'" class="space-y-4">
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h3 class="text-lg font-semibold text-white mb-3 flex items-center">
            <i class="fa-solid fa-pen-nib text-write mr-2"></i>
            写作学习设置
          </h3>
          <div class="space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center gap-2">
              <label class="text-slate-400 w-40">每日写作练习次数</label>
              <input 
                type="number" 
                v-model.number="settings.writing.dailyPractice"
                min="1" 
                max="5"
                class="bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white w-24"
              />
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center gap-2">
              <label class="text-slate-400 w-40">话题类型</label>
              <select 
                v-model="settings.writing.topicType"
                class="bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white w-32"
              >
                <option value="mixed">混合</option>
                <option value="academic">学术</option>
                <option value="daily">日常</option>
                <option value="business">商务</option>
              </select>
            </div>
            <div class="flex justify-between items-center">
              <label class="text-slate-400">自动检查语法</label>
              <button 
                :class="[
                  'w-12 h-6 rounded-full flex items-center transition-all',
                  settings.writing.autoCheckGrammar ? 'bg-write justify-end' : 'bg-slate-700/50 justify-start border border-slate-600'
                ]"
                @click="settings.writing.autoCheckGrammar = !settings.writing.autoCheckGrammar"
              >
                <div class="w-4 h-4 bg-white rounded-full transition-transform"></div>
              </button>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center gap-2">
              <label class="text-slate-400 w-40">单词限制</label>
              <input 
                type="number" 
                v-model.number="settings.writing.wordLimit"
                min="50" 
                max="1000"
                class="bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white w-32"
              />
            </div>
          </div>
        </div>
      </div>
      
      <!-- 通用设置选项卡 -->
      <div v-if="activeTab === 'general'" class="space-y-4">
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h3 class="text-lg font-semibold text-white mb-3 flex items-center">
            <i class="fa-solid fa-sliders text-white mr-2"></i>
            通用设置
          </h3>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <label class="text-slate-400">每日学习提醒</label>
              <button 
                :class="[
                  'w-12 h-6 rounded-full flex items-center transition-all',
                  settings.general.dailyReminder ? 'bg-accent justify-end' : 'bg-slate-700/50 justify-start border border-slate-600'
                ]"
                @click="settings.general.dailyReminder = !settings.general.dailyReminder"
              >
                <div class="w-4 h-4 bg-white rounded-full transition-transform"></div>
              </button>
            </div>
            <div class="flex justify-between items-center">
              <label class="text-slate-400">通知声音</label>
              <button 
                :class="[
                  'w-12 h-6 rounded-full flex items-center transition-all',
                  settings.general.notificationSound ? 'bg-accent justify-end' : 'bg-slate-700/50 justify-start border border-slate-600'
                ]"
                @click="settings.general.notificationSound = !settings.general.notificationSound"
              >
                <div class="w-4 h-4 bg-white rounded-full transition-transform"></div>
              </button>
            </div>
            <div class="flex justify-between items-center">
              <label class="text-slate-400">深色模式</label>
              <button 
                :class="[
                  'w-12 h-6 rounded-full flex items-center transition-all',
                  settings.general.darkMode ? 'bg-accent justify-end' : 'bg-slate-700/50 justify-start border border-slate-600'
                ]"
                @click="settings.general.darkMode = !settings.general.darkMode"
              >
                <div class="w-4 h-4 bg-white rounded-full transition-transform"></div>
              </button>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center gap-2">
              <label class="text-slate-400 w-40">应用语言</label>
              <select 
                v-model="settings.general.language"
                class="bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white w-32"
              >
                <option value="zh-CN">简体中文</option>
                <option value="en-US">English</option>
              </select>
            </div>
          </div>
        </div>
        
        <!-- 关于信息 -->
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h3 class="text-lg font-semibold text-white mb-3">关于</h3>
          <div class="space-y-2">
            <div class="flex justify-between items-center text-sm">
              <span class="text-slate-400">版本</span>
              <span class="text-white">0.0.1</span>
            </div>
            <div class="flex justify-between items-center text-sm">
              <span class="text-slate-400">更新日期</span>
              <span class="text-white">2026-01-07</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
