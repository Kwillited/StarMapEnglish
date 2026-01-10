<script setup>
// 移动端听力详情页面
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// 获取路由参数和路由实例
const route = useRoute();
const router = useRouter();
const topicId = ref(route.params.id);

// 模拟听力内容数据
const listeningTopics = [
  {
    id: 1,
    title: "BBC News: Global Crises",
    difficulty: "Medium",
    category: "News",
    duration: "2:30",
    source: "BBC News / 2023真题",
    description: "关于联合国警告全球面临多重危机的新闻报道，包括气候变化、冲突和贫困。",
    content: `联合国秘书长在最新的全球报告中警告，世界正面临多重相互交织的危机，包括气候变化、武装冲突、贫困加剧和疫情后经济复苏缓慢。报告指出，全球气温上升已经导致极端天气事件频发，给数百万人的生活带来威胁。同时，地区冲突持续不断，造成大量人员流离失所。\n\n秘书长呼吁国际社会加强合作，共同应对这些挑战，强调多边主义是解决全球问题的唯一途径。报告还提出了一系列建议，包括增加对可再生能源的投资、加强冲突预防机制、扩大社会保障网络等。\n\n专家表示，这份报告为各国政府提供了重要的行动指南，但关键在于能否将这些建议转化为实际行动。国际社会需要展现出更强的政治意愿和合作精神，才能有效应对当前的全球危机。`,
    audioUrl: "#" // 模拟音频链接
  },
  {
    id: 2,
    title: "Scientific Breakthrough in Renewable Energy",
    difficulty: "Hard",
    category: "Science",
    duration: "3:15",
    source: "CNN Science / 2024",
    description: "科学家在可再生能源领域取得重大突破，可能改变全球能源格局。",
    content: `一组国际科学家团队宣布在太阳能电池技术方面取得重大突破，研发出一种新型高效太阳能电池，转换效率达到了创纪录的47%。这一突破有望大幅降低太阳能发电的成本，加速全球能源转型。\n\n据介绍，这种新型太阳能电池采用了多层结构设计，能够捕获更广泛波长的 sunlight，包括可见光和红外光。研究人员表示，这项技术的商业化应用可能在未来3-5年内实现。\n\n能源专家指出，这一突破对于应对气候变化具有重要意义，有望推动可再生能源在全球能源结构中的占比显著提升。各国政府和企业纷纷表示对这项技术的浓厚兴趣，多个投资协议已经在洽谈中。`,
    audioUrl: "#" // 模拟音频链接
  },
  {
    id: 3,
    title: "Daily Life in Tokyo",
    difficulty: "Easy",
    category: "Culture",
    duration: "1:45",
    source: "VOA Learning English / 2023",
    description: "介绍东京日常生活的各个方面，包括交通、饮食和文化习惯。",
    content: `东京是世界上人口最多的城市之一，拥有独特的城市文化和生活方式。在东京，公共交通系统非常发达，地铁和火车网络覆盖整个城市，准点率高达99%以上。每天有数百万人使用公共交通通勤，形成了独特的通勤文化。\n\n东京的饮食文化也非常丰富，从传统的寿司、拉面到现代的融合料理，应有尽有。便利店在东京随处可见，提供各种便利服务，深受当地居民和游客喜爱。\n\n此外，东京还是一个融合了传统与现代的城市。在同一个城市里，你可以看到古老的寺庙和现代化的摩天大楼并存，传统的茶道和现代的动漫文化相互影响。这种独特的文化融合使东京成为一个充满魅力的城市。`,
    audioUrl: "#" // 模拟音频链接
  },
  {
    id: 4,
    title: "Interview with Climate Activist",
    difficulty: "Medium",
    category: "Interview",
    duration: "4:20",
    source: "TED Talks / 2023",
    description: "对著名气候活动家的采访，讨论气候变化的影响和解决方案。",
    content: `在最近的一次TED演讲中，著名气候活动家格蕾塔·通贝里分享了她对气候变化的看法和行动建议。她强调，气候变化已经成为一个紧急的全球问题，需要立即采取行动。\n\n通贝里指出，年轻人在推动气候变化行动方面发挥着重要作用，他们的声音正在被越来越多的人听到。她呼吁各国政府和企业履行承诺，采取切实措施减少温室气体排放。\n\n在采访中，通贝里还谈到了她的个人经历和成长过程，以及她如何从一个普通学生成长为全球知名的气候活动家。她鼓励更多的年轻人站出来，为气候正义发声。\n\n通贝里的演讲再次引发了全球对气候变化问题的关注，许多人表示受到了启发，将采取行动支持气候保护。`,
    audioUrl: "#" // 模拟音频链接
  },
  {
    id: 5,
    title: "The History of Internet",
    difficulty: "Hard",
    category: "Technology",
    duration: "5:10",
    source: "National Geographic / 2024",
    description: "探索互联网的发展历史，从早期的ARPANET到现代的全球网络。",
    content: `互联网的历史可以追溯到20世纪60年代，当时美国国防部高级研究计划局（ARPA）开发了一个名为ARPANET的网络，用于连接不同大学和研究机构的计算机。\n\n在随后的几十年里，互联网技术不断发展，TCP/IP协议的出现为互联网的全球扩展奠定了基础。1991年，万维网（World Wide Web）的诞生使互联网变得更加易用和普及，开启了互联网时代的新纪元。\n\n如今，互联网已经成为全球最重要的通信和信息交换平台，改变了人们的生活、工作和学习方式。随着5G、人工智能等新技术的发展，互联网的未来将更加令人期待。\n\n然而，互联网的发展也带来了一些挑战，如网络安全、隐私保护和信息过载等问题。如何应对这些挑战，确保互联网的可持续发展，是摆在我们面前的重要课题。`,
    audioUrl: "#" // 模拟音频链接
  },
  {
    id: 6,
    title: "Health Benefits of Exercise",
    difficulty: "Easy",
    category: "Health",
    duration: "2:05",
    source: "WHO Public Health / 2023",
    description: "世界卫生组织关于运动对身心健康益处的科普讲解。",
    content: `世界卫生组织（WHO）近日发布了一份关于运动与健康的报告，强调了定期运动对身心健康的重要益处。报告指出，每周至少进行150分钟的中等强度有氧运动，或75分钟的高强度有氧运动，可以显著降低患慢性疾病的风险。\n\n运动对身体健康的益处包括：增强心肺功能、提高免疫力、控制体重、降低血压和血糖水平等。此外，运动还对心理健康有积极影响，可以减轻压力、焦虑和抑郁症状，提高情绪和睡眠质量。\n\n报告还指出，任何形式的身体活动都比久坐不动要好，即使是短时间的散步也能带来健康益处。WHO呼吁各国政府和社会各界采取措施，鼓励人们积极参与体育锻炼，创造支持性的环境。\n\n专家建议，选择适合自己兴趣和能力的运动方式，并逐渐增加运动强度和时长，是保持长期运动习惯的关键。`,
    audioUrl: "#" // 模拟音频链接
  }
];

// 获取当前听力题目详情
const currentTopic = ref(null);

// 模拟听力进度
const listeningProgress = ref(0);

// 初始化函数
onMounted(() => {
  // 查找当前听力题目
  currentTopic.value = listeningTopics.find(topic => topic.id === parseInt(topicId.value));
  
  // 如果题目不存在，返回上一页
  if (!currentTopic.value) {
    router.back();
  }
});

// 返回上一页
const goBack = () => {
  router.back();
};

// 模拟播放功能
const isPlaying = ref(false);

const togglePlay = () => {
  isPlaying.value = !isPlaying.value;
};

// 标签页切换状态
const activeTab = ref('answer');

const switchTab = (tab) => {
  activeTab.value = tab;
};

// 选择题数据
const questions = [
  {
    id: 1,
    text: "According to the report, what are the main crises facing the world?",
    options: [
      { id: 'A', text: "Climate change, conflict, and poverty" },
      { id: 'B', text: "Economic recession and unemployment" },
      { id: 'C', text: "Global pandemic and healthcare crisis" },
      { id: 'D', text: "Energy shortage and food crisis" }
    ],
    correctAnswer: 'A'
  },
  {
    id: 2,
    text: "What solution does the Secretary-General propose to address these crises?",
    options: [
      { id: 'A', text: "Increased military spending" },
      { id: 'B', text: "Strengthened multilateral cooperation" },
      { id: 'C', text: "National isolationism" },
      { id: 'D', text: "Technological innovation alone" }
    ],
    correctAnswer: 'B'
  },
  {
    id: 3,
    text: "What is one of the recommendations mentioned in the report?",
    options: [
      { id: 'A', text: "Reduce investment in renewable energy" },
      { id: 'B', text: "Cut social security programs" },
      { id: 'C', text: "Increase investment in renewable energy" },
      { id: 'D', text: "Ignore climate change warnings" }
    ],
    correctAnswer: 'C'
  }
];

// 答题相关状态
const userAnswers = ref({});
const isSubmitted = ref(false);
const score = ref(0);
const correctCount = ref(0);

// 初始化用户答案
onMounted(() => {
  // 查找当前听力题目
  currentTopic.value = listeningTopics.find(topic => topic.id === parseInt(topicId.value));
  
  // 如果题目不存在，返回上一页
  if (!currentTopic.value) {
    router.back();
  }
  
  // 初始化用户答案
  questions.forEach(question => {
    userAnswers.value[question.id] = null;
  });
});

// 选择答案
const selectAnswer = (questionId, optionId) => {
  if (!isSubmitted.value) {
    userAnswers.value[questionId] = optionId;
  }
};

// 计算得分
const calculateScore = () => {
  let correct = 0;
  questions.forEach(question => {
    if (userAnswers.value[question.id] === question.correctAnswer) {
      correct++;
    }
  });
  correctCount.value = correct;
  return Math.round((correct / questions.length) * 100);
};

// 提交答案
const submitAnswer = () => {
  isSubmitted.value = true;
  score.value = calculateScore();
  alert(`答案已提交！得分：${score.value}分 (${correctCount.value}/${questions.length} 正确)`);
};

// 重置答题
const resetAnswer = () => {
  isSubmitted.value = false;
  score.value = 0;
  correctCount.value = 0;
  questions.forEach(question => {
    userAnswers.value[question.id] = null;
  });
};

// 判断选项是否正确
const isCorrect = (questionId, optionId) => {
  if (!isSubmitted.value) return false;
  return questions.find(q => q.id === questionId).correctAnswer === optionId;
};

// 判断选项是否被选中
const isSelected = (questionId, optionId) => {
  return userAnswers.value[questionId] === optionId;
};

// 判断是否选择了错误答案
const isWrong = (questionId, optionId) => {
  if (!isSubmitted.value) return false;
  return userAnswers.value[questionId] === optionId && 
         questions.find(q => q.id === questionId).correctAnswer !== optionId;
};
</script>

<template>
  <!-- 移动端听力详情页面 -->
  <div class="min-h-screen">
    <!-- 顶部导航栏 -->
    <div class="fixed top-0 left-0 right-0 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/30 px-4 py-2 sm:py-3 z-50">
      <div class="flex items-center justify-between">
        <button @click="goBack" class="text-white hover:text-slate-300 transition-colors">
          <i class="fa-solid fa-arrow-left text-lg"></i>
        </button>
        <h2 class="text-lg font-bold text-white">听力详情</h2>
        <div class="w-6"></div> <!-- 占位元素，保持标题居中 -->
      </div>
    </div>
    
    <!-- 听力内容容器 -->
    <div class="pt-20 pb-10 px-4 sm:px-6">
      <!-- 题目标题 -->
      <h1 class="text-2xl font-bold text-white mb-4">{{ currentTopic?.title }}</h1>
      
      <!-- 题目元信息 -->
      <div class="flex flex-wrap gap-3 mb-6 text-sm">
        <span 
          class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
          :class="{
            'bg-green-500/20 text-green-400': currentTopic?.difficulty === 'Easy',
            'bg-yellow-500/20 text-yellow-400': currentTopic?.difficulty === 'Medium',
            'bg-red-500/20 text-red-400': currentTopic?.difficulty === 'Hard'
          }"
        >
          {{ currentTopic?.difficulty }}
        </span>
        <span class="text-slate-400">{{ currentTopic?.duration }}</span>
        <span class="text-slate-400">{{ currentTopic?.category }}</span>
        <span class="text-slate-400">{{ currentTopic?.source }}</span>
      </div>
      
      <!-- 音频播放器 -->
      <div class="glass-card p-6 rounded-xl mb-6">
        <div class="flex flex-col items-center justify-center gap-4">
          <!-- 播放按钮 -->
          <button 
            class="w-16 h-16 rounded-full bg-listen flex items-center justify-center text-white hover:bg-listen/80 transition-colors"
            @click="togglePlay"
          >
            <i :class="isPlaying ? 'fa-solid fa-pause text-2xl' : 'fa-solid fa-play text-2xl ml-1'"></i>
          </button>
          
          <!-- 播放时间 -->
          <div class="flex justify-between w-full text-sm text-slate-400">
            <span>0:00</span>
            <span>{{ currentTopic?.duration }}</span>
          </div>
          
          <!-- 进度条 -->
          <div class="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
            <div class="h-full rounded-full bg-listen transition-all duration-300" 
                 :style="{ width: `${listeningProgress}%` }">
            </div>
          </div>
        </div>
      </div>
      
      <!-- 题目描述 -->
      <div class="glass-card p-4 rounded-xl mb-6">
        <h3 class="text-lg font-semibold text-white mb-3">题目描述</h3>
        <p class="text-slate-300 leading-relaxed">{{ currentTopic?.description }}</p>
      </div>
      
      <!-- 标签页切换 -->
      <div class="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
        <button 
          @click="switchTab('answer')"
          class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap"
          :class="activeTab === 'answer' ? 'bg-listen text-white' : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'"
        >
          答题
        </button>
        <button 
          @click="switchTab('original')"
          class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap"
          :class="activeTab === 'original' ? 'bg-listen text-white' : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'"
        >
          原文
        </button>
        <button 
          @click="switchTab('translation')"
          class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap"
          :class="activeTab === 'translation' ? 'bg-listen text-white' : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'"
        >
          原文翻译
        </button>
      </div>
      
      <!-- 内容区域 -->
      <div class="glass-card p-4 rounded-xl mb-6">
        <!-- 答题区域 -->
        <div v-if="activeTab === 'answer'">
          <h3 class="text-lg font-semibold text-white mb-4">听力选择题</h3>
          
          <!-- 选择题列表 -->
          <div class="space-y-6 mb-6">
            <!-- 单个选择题 -->
            <div v-for="(question, index) in questions" :key="question.id" class="space-y-3">
              <!-- 题目 -->
              <div class="flex items-start gap-2">
                <span class="text-white font-medium mt-0.5">{{ index + 1 }}.</span>
                <p class="text-slate-300">{{ question.text }}</p>
              </div>
              
              <!-- 选项列表 -->
              <div class="grid grid-cols-1 gap-2">
                <button 
                  v-for="option in question.options" 
                  :key="option.id"
                  @click="selectAnswer(question.id, option.id)"
                  class="flex items-center gap-3 p-3 rounded-lg transition-all duration-200"
                  :class="{
                    'bg-slate-800/50 hover:bg-slate-700/50 text-white': !isSubmitted.value && !isSelected(question.id, option.id),
                    'bg-listen/20 border-2 border-listen text-white': !isSubmitted.value && isSelected(question.id, option.id),
                    'bg-green-500/20 border-2 border-green-500 text-green-300': isSubmitted.value && isCorrect(question.id, option.id),
                    'bg-red-500/20 border-2 border-red-500 text-red-300': isSubmitted.value && isWrong(question.id, option.id),
                    'bg-slate-800/30 text-slate-500': isSubmitted.value && !isSelected(question.id, option.id) && !isCorrect(question.id, option.id)
                  }"
                >
                  <!-- 选项字母 -->
                  <div 
                    class="w-6 h-6 flex items-center justify-center rounded-full font-medium"
                    :class="{
                      'bg-listen/30': !isSubmitted.value && isSelected(question.id, option.id),
                      'bg-green-500/30 text-green-300': isSubmitted.value && isCorrect(question.id, option.id),
                      'bg-red-500/30 text-red-300': isSubmitted.value && isWrong(question.id, option.id),
                      'bg-slate-700/50': !isSubmitted.value && !isSelected(question.id, option.id) || (isSubmitted.value && !isSelected(question.id, option.id))
                    }"
                  >
                    {{ option.id }}
                  </div>
                  
                  <!-- 选项文本 -->
                  <span>{{ option.text }}</span>
                  
                  <!-- 正确答案标记 -->
                  <div v-if="isSubmitted.value && isCorrect(question.id, option.id)" class="ml-auto">
                    <i class="fa-solid fa-check text-green-400"></i>
                  </div>
                  
                  <!-- 错误答案标记 -->
                  <div v-else-if="isSubmitted.value && isWrong(question.id, option.id)" class="ml-auto">
                    <i class="fa-solid fa-xmark text-red-400"></i>
                  </div>
                </button>
              </div>
            </div>
          </div>
          
          <!-- 提交和重置按钮 -->
          <div class="flex gap-3 justify-center">
            <button 
              @click="submitAnswer"
              :disabled="isSubmitted"
              class="px-6 py-2 rounded-lg bg-listen hover:bg-listen/80 text-white font-medium transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {{ isSubmitted ? '已提交' : '提交答案' }}
            </button>
            <button 
              @click="resetAnswer"
              class="px-6 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-white font-medium transition-all duration-300"
            >
              重置答案
            </button>
          </div>
          
          <!-- 得分显示 -->
          <div v-if="isSubmitted" class="mt-4 text-center">
            <div class="text-lg font-medium text-white">
              得分: <span class="text-listen font-bold">{{ score }}</span> 分
            </div>
            <div class="text-sm text-slate-400 mt-1">
              正确: {{ correctCount }}/{{ questions.length }} 题
            </div>
          </div>
        </div>
        
        <!-- 原文区域 -->
        <div v-else-if="activeTab === 'original'">
          <h3 class="text-lg font-semibold text-white mb-3">听力原文</h3>
          <div class="space-y-4 text-slate-300 leading-relaxed">
            <p v-for="(paragraph, index) in currentTopic?.content.split('\n\n')" :key="index">
              {{ paragraph }}
            </p>
          </div>
        </div>
        
        <!-- 原文翻译区域 -->
        <div v-else-if="activeTab === 'translation'">
          <h3 class="text-lg font-semibold text-white mb-3">原文翻译</h3>
          <div class="space-y-4 text-slate-300 leading-relaxed">
            <p v-for="(paragraph, index) in currentTopic?.content.split('\n\n')" :key="index">
              {{ paragraph }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
