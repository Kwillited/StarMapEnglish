<script setup>
// 移动端文章详情页面
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// 获取路由参数和路由实例
const route = useRoute();
const router = useRouter();
const articleId = ref(route.params.id);

// 模拟文章内容数据
const articles = [
  {
    id: 1,
    title: "The Internet Revolution",
    description: "Exploring how the internet has transformed communication, commerce, and education globally.",
    difficulty: "Easy",
    category: "Technology",
    wordCount: 520,
    source: "2024考研英语阅读A",
    content: `The Internet Revolution has transformed nearly every aspect of modern life. From communication to commerce, education to entertainment, the internet has become an indispensable part of our daily routines.\n\nIn the early days of the internet, few could have predicted the profound impact it would have on society. What began as a small network of computers has grown into a global infrastructure connecting billions of people worldwide.\n\nOne of the most significant changes brought about by the internet is in the realm of communication. Email, instant messaging, and social media platforms have revolutionized how we interact with others, breaking down geographical barriers and enabling real-time communication across the globe.\n\nCommerce has also been transformed by the internet. E-commerce platforms have made it possible for businesses to reach customers anywhere in the world, while digital payment systems have simplified transactions and made online shopping more convenient than ever before.\n\nEducation has also benefited greatly from the internet. Online courses, digital libraries, and educational resources have made learning more accessible to people of all ages and backgrounds. Students can now access high-quality educational content from anywhere in the world, at any time.\n\nDespite its many benefits, the internet also presents challenges. Issues such as privacy concerns, cyber security threats, and the digital divide remain important considerations as we continue to rely more heavily on digital technologies.\n\nAs we look to the future, it is clear that the internet will continue to evolve and shape our world in ways we cannot yet imagine. The internet revolution is far from over, and its full impact has yet to be realized.`
  },
  {
    id: 2,
    title: "Climate Change and Global Warming",
    description: "An analysis of the scientific consensus on climate change and its potential impacts.",
    difficulty: "Medium",
    category: "Environment",
    wordCount: 780,
    source: "2023雅思阅读Test 3",
    content: `Climate change, driven primarily by human activities, is one of the most pressing challenges facing our planet today. The scientific consensus is clear: the Earth's climate is warming at an unprecedented rate, with potentially catastrophic consequences.\n\nThe primary cause of climate change is the increase in greenhouse gases, such as carbon dioxide and methane, in the Earth's atmosphere. These gases trap heat from the sun, causing the planet's temperature to rise.\n\nThe effects of climate change are already being felt around the world. Rising sea levels, more frequent and severe weather events, and changes in ecosystems are just some of the impacts we are experiencing today.\n\nScientists predict that if we do not take immediate action to reduce greenhouse gas emissions, the effects of climate change will only worsen in the coming decades. This could include more extreme heatwaves, droughts, floods, and storms, as well as the loss of biodiversity and the displacement of millions of people.\n\nAddressing climate change requires a global effort. Governments, businesses, and individuals all have a role to play in reducing greenhouse gas emissions and transitioning to a more sustainable future.\n\nRenewable energy sources, such as solar and wind power, offer a promising solution to our energy needs while reducing our reliance on fossil fuels. Additionally, changes in land use, agriculture, and transportation can all contribute to reducing greenhouse gas emissions.\n\nThe time to act is now. By working together, we can mitigate the worst effects of climate change and create a more sustainable future for generations to come.`
  },
  {
    id: 3,
    title: "The Future of Artificial Intelligence",
    description: "Examining the ethical implications and potential benefits of advanced AI systems.",
    difficulty: "Hard",
    category: "Technology",
    wordCount: 950,
    source: "2023托福阅读Passage 2",
    content: `Artificial Intelligence (AI) has made significant advances in recent years, with applications ranging from self-driving cars to virtual assistants. As AI continues to evolve, it raises important questions about the future of work, privacy, and ethics.\n\nOne of the most significant impacts of AI is expected to be on the job market. While some jobs may be automated, new opportunities are also likely to emerge as AI creates new industries and changes the nature of work.\n\nAI also has the potential to revolutionize healthcare, with applications in medical diagnosis, drug discovery, and personalized medicine. Machine learning algorithms can analyze large amounts of medical data to identify patterns and make predictions that can help doctors make more accurate diagnoses and treatment decisions.\n\nHowever, the rise of AI also raises important ethical concerns. Issues such as bias in AI systems, the potential for misuse, and the impact on privacy are all areas that require careful consideration.\n\nAs AI becomes more integrated into our daily lives, it is important to ensure that these systems are designed and deployed in a way that is fair, transparent, and accountable. This requires collaboration between technologists, policymakers, and ethicists to develop guidelines and regulations that promote the responsible development and use of AI.\n\nThe future of AI holds great promise, but it also presents significant challenges. By addressing these challenges proactively, we can harness the power of AI to improve our lives and solve some of the world's most pressing problems.`
  },
  {
    id: 4,
    title: "Cultural Diversity in Modern Societies",
    description: "How globalization has shaped cultural exchange and diversity in contemporary communities.",
    difficulty: "Medium",
    category: "Culture",
    wordCount: 630,
    source: "2024考研英语阅读B",
    content: `Globalization has had a profound impact on cultural diversity, shaping how we interact with different cultures and influencing the development of new cultural expressions.\n\nIn today's interconnected world, cultural exchange occurs at an unprecedented rate. People from different cultures interact through travel, trade, and digital communication, leading to the sharing of ideas, values, and practices.\n\nThis cultural exchange has both positive and negative effects. On the one hand, it promotes understanding and appreciation of different cultures, fostering greater tolerance and diversity. On the other hand, there are concerns about cultural homogenization, as dominant cultures influence and sometimes overshadow smaller, less powerful cultures.\n\nDespite these challenges, cultural diversity remains a vital aspect of modern societies. It enriches our lives through exposure to different perspectives, traditions, and ways of thinking.\n\nPreserving and promoting cultural diversity requires a balance between embracing globalization and protecting cultural heritage. This includes supporting cultural institutions, promoting education about different cultures, and respecting the rights of minority groups to maintain their cultural identities.\n\nIn an increasingly globalized world, cultural diversity is not just a matter of preserving the past, but also of shaping the future. By valuing and celebrating our differences, we can create more inclusive and vibrant societies that benefit from the contributions of all their members.`
  },
  {
    id: 5,
    title: "The Science of Happiness",
    description: "Research findings on the psychological and social factors that contribute to happiness.",
    difficulty: "Easy",
    category: "Psychology",
    wordCount: 480,
    source: "2023剑桥雅思18",
    content: `Happiness is a universal human pursuit, but what exactly makes us happy? Recent research in psychology and neuroscience has shed light on the factors that contribute to our well-being.\n\nContrary to popular belief, material wealth is not the primary determinant of happiness. Studies have shown that once basic needs are met, additional income has diminishing returns on happiness.\n\nInstead, social connections and relationships are among the strongest predictors of happiness. People with strong social networks tend to be happier, healthier, and live longer than those who are socially isolated.\n\nOther factors that contribute to happiness include gratitude, mindfulness, and a sense of purpose. Practicing gratitude, for example, has been shown to increase positive emotions and improve overall well-being.\n\nHappiness is also influenced by our genes and personality traits, but research suggests that approximately 40% of our happiness is within our control through intentional activities and lifestyle choices.\n\nUnderstanding the science of happiness can help us make more informed choices about how to live our lives. By focusing on the factors that truly contribute to well-being, we can cultivate greater happiness and fulfillment.`
  },
  {
    id: 6,
    title: "Renewable Energy Transition",
    description: "The challenges and opportunities in transitioning to a sustainable energy future.",
    difficulty: "Hard",
    category: "Environment",
    wordCount: 890,
    source: "2023GRE阅读Section 1",
    content: `The transition to renewable energy is one of the most important challenges facing the world today. As concerns about climate change grow, there is increasing pressure to reduce our reliance on fossil fuels and transition to cleaner, more sustainable energy sources.\n\nRenewable energy sources, such as solar, wind, and hydropower, offer a promising alternative to fossil fuels. They produce little or no greenhouse gas emissions and are replenished naturally, making them a more sustainable option for meeting our energy needs.\n\nHowever, the transition to renewable energy is not without its challenges. One of the main obstacles is the intermittency of some renewable energy sources, such as solar and wind power, which depend on weather conditions. This requires the development of effective energy storage solutions to ensure a reliable supply of electricity.\n\nAnother challenge is the infrastructure required to support renewable energy. This includes building new power plants, upgrading the electrical grid, and developing charging infrastructure for electric vehicles.\n\nDespite these challenges, the transition to renewable energy presents significant opportunities. It can create new jobs, stimulate economic growth, and improve air quality and public health.\n\nGovernments around the world are implementing policies to promote renewable energy, such as subsidies, tax incentives, and renewable energy targets. These policies are helping to drive investment in renewable energy and accelerate the transition to a more sustainable energy future.\n\nThe transition to renewable energy will require collaboration between governments, businesses, and individuals. By working together, we can overcome the challenges and create a more sustainable energy system that benefits both people and the planet.`
  }
];

// 获取当前文章详情
const currentArticle = ref(null);

// 模拟文章阅读进度
const readingProgress = ref(0);



// 返回上一页
const goBack = () => {
  router.back();
};

// 处理滚动事件，更新阅读进度
const handleScroll = () => {
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;
  const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
  readingProgress.value = Math.min(Math.max(scrollPercentage, 0), 100);
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
    text: "What are the main ways the internet has transformed modern life according to the article?",
    options: [
      { id: 'A', text: "Communication, commerce, education, and entertainment" },
      { id: 'B', text: "Transportation, healthcare, and agriculture" },
      { id: 'C', text: "Politics, culture, and social interactions" },
      { id: 'D', text: "Science, technology, and innovation" }
    ],
    correctAnswer: 'A'
  },
  {
    id: 2,
    text: "What challenges does the internet present despite its many benefits?",
    options: [
      { id: 'A', text: "Privacy concerns, cyber security threats, and digital divide" },
      { id: 'B', text: "Information overload and addiction" },
      { id: 'C', text: "Misinformation and fake news" },
      { id: 'D', text: "All of the above" }
    ],
    correctAnswer: 'D'
  },
  {
    id: 3,
    text: "What is expected of the internet in the future according to the article?",
    options: [
      { id: 'A', text: "It will become less important in daily life" },
      { id: 'B', text: "It will continue to evolve and shape the world" },
      { id: 'C', text: "It will be replaced by a new technology" },
      { id: 'D', text: "It will become more centralized and controlled" }
    ],
    correctAnswer: 'B'
  }
];

// 答题相关状态
const userAnswers = ref({});
const isSubmitted = ref(false);
const score = ref(0);
const correctCount = ref(0);

// 初始化用户答案
onMounted(() => {
  // 查找当前文章
  currentArticle.value = articles.find(article => article.id === parseInt(articleId.value));
  
  // 如果文章不存在，返回上一页
  if (!currentArticle.value) {
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
  <!-- 移动端文章详情页面 -->
  <div class="min-h-screen" @scroll="handleScroll">
    <!-- 顶部导航栏 -->
    <div class="fixed top-0 left-0 right-0 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/30 px-4 py-2 sm:py-3 z-50">
      <div class="flex items-center justify-between">
        <button @click="goBack" class="text-white hover:text-slate-300 transition-colors">
          <i class="fa-solid fa-arrow-left text-lg"></i>
        </button>
        <h2 class="text-lg font-bold text-white">文章详情</h2>
        <div class="w-6"></div> <!-- 占位元素，保持标题居中 -->
      </div>
    </div>
    
    <!-- 阅读进度条 -->
    <div class="fixed top-0 left-0 h-1 bg-read z-50" :style="{ width: `${readingProgress}%` }"></div>
    
    <!-- 文章内容容器 -->
    <div class="pt-20 pb-10 px-4 sm:px-6">
      <!-- 文章标题 -->
      <h1 class="text-2xl font-bold text-white mb-4">{{ currentArticle?.title }}</h1>
      
      <!-- 文章元信息 -->
      <div class="flex flex-wrap gap-3 mb-6 text-sm">
        <span 
          class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
          :class="{
            'bg-green-500/20 text-green-400': currentArticle?.difficulty === 'Easy',
            'bg-yellow-500/20 text-yellow-400': currentArticle?.difficulty === 'Medium',
            'bg-red-500/20 text-red-400': currentArticle?.difficulty === 'Hard'
          }"
        >
          {{ currentArticle?.difficulty }}
        </span>
        <span class="text-slate-400">{{ currentArticle?.wordCount }} words</span>
        <span class="text-slate-400">{{ currentArticle?.category }}</span>
        <span class="text-slate-400">{{ currentArticle?.source }}</span>
      </div>
      
      <!-- 标签页切换 -->
      <div class="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
        <button 
          @click="switchTab('answer')"
          class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap"
          :class="activeTab === 'answer' ? 'bg-read text-white' : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'"
        >
          答题
        </button>
        <button 
          @click="switchTab('original')"
          class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap"
          :class="activeTab === 'original' ? 'bg-read text-white' : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'"
        >
          原文
        </button>
        <button 
          @click="switchTab('translation')"
          class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap"
          :class="activeTab === 'translation' ? 'bg-read text-white' : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'"
        >
          原文翻译
        </button>
      </div>
      
      <!-- 内容区域 -->
      <div v-if="activeTab === 'answer'" class="space-y-4">
        <h3 class="text-lg font-semibold text-white">阅读选择题</h3>
        
        <!-- 文章预览卡片 -->
        <div class="glass-card p-4 rounded-xl">
          <div class="flex items-center justify-between mb-3">
            <h4 class="text-md font-medium text-white">文章预览</h4>
            <button class="text-sm text-read hover:text-read/80 transition-colors">
              <i class="fa-solid fa-expand"></i> 展开
            </button>
          </div>
          <!-- 可滚动的原文预览 -->
          <div class="max-h-48 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800">
            <p v-for="(paragraph, index) in currentArticle?.content.split('\n\n')" :key="index" class="text-slate-300 text-sm leading-relaxed">
              {{ paragraph }}
            </p>
          </div>
        </div>
        
        <!-- 选择题卡片 -->
        <div class="glass-card p-4 rounded-xl">
          <!-- 选择题列表 -->
          <div class="space-y-6">
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
                    'bg-read/20 border-2 border-read text-white': !isSubmitted.value && isSelected(question.id, option.id),
                    'bg-green-500/20 border-2 border-green-500 text-green-300': isSubmitted.value && isCorrect(question.id, option.id),
                    'bg-red-500/20 border-2 border-red-500 text-red-300': isSubmitted.value && isWrong(question.id, option.id),
                    'bg-slate-800/30 text-slate-500': isSubmitted.value && !isSelected(question.id, option.id) && !isCorrect(question.id, option.id)
                  }"
                >
                  <!-- 选项字母 -->
                  <div 
                    class="w-6 h-6 flex items-center justify-center rounded-full font-medium"
                    :class="{
                      'bg-read/30': !isSubmitted.value && isSelected(question.id, option.id),
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
          <div class="flex gap-3 justify-center mt-6">
            <button 
              @click="submitAnswer"
              :disabled="isSubmitted"
              class="px-6 py-2 rounded-lg bg-read hover:bg-read/80 text-white font-medium transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
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
              得分: <span class="text-read font-bold">{{ score }}</span> 分
            </div>
            <div class="text-sm text-slate-400 mt-1">
              正确: {{ correctCount }}/{{ questions.length }} 题
            </div>
          </div>
        </div>
      </div>
      
      <!-- 原文区域 -->
      <div v-else-if="activeTab === 'original'" class="glass-card p-4 rounded-xl">
        <h3 class="text-lg font-semibold text-white mb-3">文章原文</h3>
        <div class="space-y-4 text-slate-300 leading-relaxed">
          <p v-for="(paragraph, index) in currentArticle?.content.split('\n\n')" :key="index">
            {{ paragraph }}
          </p>
        </div>
      </div>
      
      <!-- 原文翻译区域 -->
      <div v-else-if="activeTab === 'translation'" class="glass-card p-4 rounded-xl">
        <h3 class="text-lg font-semibold text-white mb-3">文章翻译</h3>
        <div class="space-y-4 text-slate-300 leading-relaxed">
          <p v-for="(paragraph, index) in currentArticle?.content.split('\n\n')" :key="index">
            {{ paragraph }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
