<script setup>
// 移动端写作详情页面
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// 获取路由参数和路由实例
const route = useRoute();
const router = useRouter();
const topicId = ref(route.params.id);

// 模拟写作内容数据
const writingTopics = [
  {
    id: 1,
    title: "The Impact of Artificial Intelligence on Modern Society",
    type: "议论文",
    difficulty: "Medium",
    wordLimit: "400-450",
    timeLimit: 60,
    source: "2023年考研写作B",
    description: "探讨人工智能对现代社会的多方面影响，包括经济、就业、教育和生活方式等。",
    requirements: `Write an essay of 400-450 words on the topic "The Impact of Artificial Intelligence on Modern Society". In your essay, you should:
1. Introduce the development of AI and its increasing presence in our lives
2. Discuss both the positive and negative impacts of AI on society
3. Express your own views on how we should embrace AI while mitigating its risks
4. Conclude with a forward-looking statement about AI's future role in society`,
    sampleAnswer: `Artificial Intelligence (AI) has emerged as one of the most transformative technologies of the 21st century, reshaping virtually every aspect of modern society. From virtual assistants in our smartphones to advanced algorithms powering autonomous vehicles, AI has become an integral part of our daily lives.

On the positive side, AI has brought significant benefits to various sectors. In healthcare, AI-powered diagnostic tools can analyze medical images with unprecedented accuracy, helping doctors detect diseases at earlier stages. In education, adaptive learning platforms tailor educational content to individual students' needs, enhancing learning outcomes. In business, AI-driven analytics optimize operations, improve customer service, and drive innovation.

However, the rapid advancement of AI also raises legitimate concerns. One of the most pressing issues is job displacement, as AI systems increasingly automate routine tasks across industries. This could lead to significant workforce disruptions and economic inequality if not properly managed. Additionally, there are ethical concerns surrounding AI, such as algorithmic bias, privacy violations, and the potential misuse of autonomous systems.

In my view, the key to harnessing AI's potential while mitigating its risks lies in responsible development and thoughtful regulation. We should invest in education and retraining programs to help workers adapt to the changing job market. Governments and tech companies must collaborate to establish clear ethical guidelines and regulatory frameworks that ensure AI is developed and deployed in ways that align with human values.

Looking ahead, AI will undoubtedly continue to evolve and shape our society in profound ways. By embracing AI with caution and foresight, we can create a future where this powerful technology serves as a force for good, improving lives and solving some of humanity's most pressing challenges.`
  },
  {
    id: 2,
    title: "Climate Change: Challenges and Solutions",
    type: "议论文",
    difficulty: "Hard",
    wordLimit: "500-600",
    timeLimit: 70,
    source: "2024年雅思写作Task 2",
    description: "分析气候变化带来的全球性挑战，并提出可行的解决方案，强调国际合作的重要性。",
    requirements: `Write an essay of 500-600 words on the topic "Climate Change: Challenges and Solutions". Your essay should include:
1. An overview of the current state of climate change and its main causes
2. A discussion of the major challenges posed by climate change
3. Practical solutions at the individual, national, and international levels
4. An emphasis on the importance of global cooperation in addressing this issue`,
    sampleAnswer: `Climate change has emerged as the defining challenge of our time, threatening ecosystems, economies, and human well-being across the globe. Driven primarily by human activities such as the burning of fossil fuels and deforestation, global temperatures have risen by approximately 1.1°C since the pre-industrial era, with far-reaching consequences.

The challenges posed by climate change are multifaceted and interconnected. Rising sea levels threaten coastal communities and low-lying countries, while extreme weather events such as hurricanes, droughts, and heatwaves are becoming more frequent and intense. Biodiversity loss is accelerating, with millions of species at risk of extinction. Additionally, climate change exacerbates social and economic inequalities, disproportionately affecting vulnerable populations in developing countries.

Addressing climate change requires a comprehensive approach involving action at all levels. At the individual level, we can reduce our carbon footprint by adopting sustainable lifestyle choices such as using public transportation, reducing energy consumption, and adopting plant-rich diets. At the national level, governments must implement policies that promote renewable energy, improve energy efficiency, and phase out fossil fuel subsidies.

However, the most critical aspect of addressing climate change is international cooperation. Climate change is a global problem that requires a global solution. Countries must work together to set ambitious emission reduction targets and provide financial and technological support to developing nations, which are often the most affected by climate change despite contributing the least to it.

The Paris Agreement, which aims to limit global warming to well below 2°C above pre-industrial levels, represents an important step forward. However, much more needs to be done to ensure its goals are met. This includes accelerating the transition to renewable energy, investing in climate adaptation measures, and fostering innovation in green technologies.

In conclusion, climate change presents formidable challenges, but they are not insurmountable. By working together at the individual, national, and international levels, we can mitigate the worst effects of climate change and build a more sustainable future for generations to come. The time for action is now.`
  },
  {
    id: 3,
    title: "The Importance of Lifelong Learning in the Digital Age",
    type: "议论文",
    difficulty: "Easy",
    wordLimit: "300-400",
    timeLimit: 50,
    source: "2023年托福写作",
    description: "阐述在数字化时代，终身学习的重要性以及如何培养终身学习的习惯。",
    requirements: `Write an essay of 300-400 words on the topic "The Importance of Lifelong Learning in the Digital Age". In your essay, you should:
1. Explain why lifelong learning is particularly important in the digital age
2. Discuss the benefits of lifelong learning for individuals and society
3. Suggest practical ways to develop and maintain lifelong learning habits
4. Conclude with a reflection on the future of learning`,
    sampleAnswer: `In the rapidly evolving digital age, the concept of lifelong learning has taken on new significance. With technology advancing at an unprecedented pace and job markets constantly changing, the ability to learn continuously throughout one's life has become essential for personal and professional success.

The digital age has brought about profound transformations in how we live, work, and communicate. New technologies and industries emerge regularly, while existing ones become obsolete. This dynamic environment means that the knowledge and skills acquired during formal education are often insufficient for long-term career success. Lifelong learning allows individuals to adapt to these changes, stay relevant in their fields, and seize new opportunities.

The benefits of lifelong learning extend beyond individual success. A society of lifelong learners is more innovative, adaptable, and resilient. It fosters economic growth by ensuring a skilled workforce that can meet the demands of a rapidly changing economy. Additionally, lifelong learning promotes personal fulfillment, cognitive health, and social engagement.

Developing lifelong learning habits requires intentional effort. One effective approach is to cultivate curiosity and a growth mindset, viewing challenges as opportunities for learning rather than obstacles. Leveraging digital resources such as online courses, educational podcasts, and e-books can make learning more accessible and flexible. Joining professional networks and communities of practice also provides opportunities for continuous learning through collaboration and knowledge sharing.

Looking ahead, lifelong learning will become even more critical as artificial intelligence and automation reshape the workplace. The ability to learn, unlearn, and relearn will be among the most valuable skills in the future economy. By embracing lifelong learning today, we can prepare ourselves for the challenges and opportunities of tomorrow.

In conclusion, lifelong learning is not just a personal choice but a necessity in the digital age. It empowers individuals, strengthens societies, and paves the way for a more prosperous and fulfilling future.`
  },
  {
    id: 4,
    title: "The Role of Social Media in Modern Communication",
    type: "议论文",
    difficulty: "Medium",
    wordLimit: "400-500",
    timeLimit: 60,
    source: "2023年大学英语六级写作",
    description: "讨论社交媒体在现代沟通中的作用，包括其积极影响和潜在问题。",
    requirements: `Write an essay of 400-500 words on the topic "The Role of Social Media in Modern Communication". Your essay should:
1. Discuss the growing influence of social media in our daily lives
2. Analyze both the positive and negative impacts of social media on communication
3. Examine how social media has changed the way we interact with others
4. Provide your own perspective on the future of social media in communication`,
    sampleAnswer: `Social media has revolutionized modern communication, becoming an integral part of daily life for billions of people worldwide. Platforms such as Facebook, Twitter, Instagram, and WeChat have transformed how we connect, share information, and interact with others.

One of the most significant positive impacts of social media is its ability to connect people across geographical boundaries. It allows individuals to stay in touch with friends and family members who live far away, fostering relationships that might otherwise fade. Social media also enables the rapid dissemination of information, making it easier for people to stay informed about current events and global issues.

Additionally, social media has given a voice to marginalized groups and facilitated social movements. It has become a powerful tool for activism, allowing people to organize protests, raise awareness about important causes, and hold institutions accountable.

However, social media also has its drawbacks. The constant exposure to curated online personas can lead to feelings of inadequacy and low self-esteem, particularly among young people. Social media can also contribute to the spread of misinformation and fake news, which can have serious consequences for society.

Furthermore, the nature of social media communication, with its emphasis on brevity and instant gratification, has been criticized for diminishing the quality of our interactions. Many argue that face-to-face communication skills are eroding as people become more accustomed to interacting through screens.

Looking ahead, social media will likely continue to evolve and shape our communication patterns. While it presents challenges, its potential for positive impact remains significant. The key is to use social media mindfully, balancing its benefits with an awareness of its limitations.

In conclusion, social media has transformed modern communication in both positive and negative ways. It has connected us like never before, but it has also introduced new challenges. By understanding and addressing these challenges, we can harness the power of social media to enhance our communication and relationships rather than letting it diminish them.`
  },
  {
    id: 5,
    title: "The Benefits of Exercise for Physical and Mental Health",
    type: "说明文",
    difficulty: "Easy",
    wordLimit: "300-400",
    timeLimit: 50,
    source: "2024年考研写作A",
    description: "说明运动对身心健康的益处，包括增强体质、改善心情和提高认知能力等。",
    requirements: `Write an essay of 300-400 words explaining "The Benefits of Exercise for Physical and Mental Health". Your essay should:
1. Introduce the importance of exercise for overall health
2. Explain the physical benefits of regular exercise
3. Discuss the mental health benefits of exercise
4. Provide practical tips for incorporating exercise into daily life`,
    sampleAnswer: `Regular exercise is widely recognized as one of the most important factors for maintaining good health. It offers numerous benefits for both physical and mental well-being, making it an essential part of a healthy lifestyle.

On the physical level, exercise provides a range of benefits. It strengthens the cardiovascular system, reducing the risk of heart disease, stroke, and high blood pressure. Regular physical activity also helps to build and maintain strong muscles and bones, which is particularly important as we age. Exercise boosts the immune system, making us more resistant to infections and diseases. Additionally, it helps to control weight by burning calories and increasing metabolism.

Beyond its physical benefits, exercise has a profound impact on mental health. Engaging in physical activity releases endorphins, the body's natural "feel-good" chemicals, which can improve mood and reduce feelings of stress, anxiety, and depression. Regular exercise has been shown to enhance cognitive function, including memory, attention, and problem-solving skills. It also promotes better sleep, which is crucial for overall mental well-being.

Incorporating exercise into daily life doesn't have to be complicated or time-consuming. Even moderate activities like brisk walking, cycling, or swimming for 30 minutes a day, five days a week, can provide significant health benefits. For those with busy schedules, short bursts of activity throughout the day can be just as effective. Finding an activity that is enjoyable and fits into one's lifestyle is key to maintaining a regular exercise routine.

It's important to start slowly and gradually increase the intensity and duration of exercise to avoid injury. Consulting with a healthcare professional before beginning a new exercise program is also advisable, especially for individuals with pre-existing health conditions.

In conclusion, exercise is a powerful tool for improving both physical and mental health. By making it a regular part of our lives, we can enhance our overall well-being, increase our longevity, and enjoy a better quality of life. The benefits of exercise are too significant to ignore, making it one of the best investments we can make in our health.

So, let's lace up our shoes, get moving, and experience the transformative power of exercise for ourselves!`
  },
  {
    id: 6,
    title: "The Future of Work: Remote Work and Hybrid Models",
    type: "议论文",
    difficulty: "Hard",
    wordLimit: "500-600",
    timeLimit: 70,
    source: "2023年GRE写作",
    description: "分析远程工作和混合工作模式的未来发展趋势，以及它们对职场文化的影响。",
    requirements: `Write an essay of 500-600 words on "The Future of Work: Remote Work and Hybrid Models". Your essay should:
1. Discuss how the COVID-19 pandemic accelerated the adoption of remote work
2. Analyze the advantages and disadvantages of remote work for both employees and employers
3. Explore the rise of hybrid work models and their potential benefits
4. Examine the long-term implications of these changes for workplace culture and productivity`,
    sampleAnswer: `The COVID-19 pandemic has reshaped the world of work in unprecedented ways, accelerating the adoption of remote work and challenging traditional notions of the workplace. As the pandemic recedes, many organizations are reevaluating their approach to work, with remote and hybrid models emerging as viable long-term options.

Remote work, once considered a perk for a privileged few, became a necessity for millions during the pandemic. This massive experiment demonstrated that many jobs can be performed effectively outside of a traditional office setting. For employees, remote work offers greater flexibility, reduced commuting time, and improved work-life balance. It allows people to work from anywhere, opening up employment opportunities to individuals who might otherwise face barriers such as geographic location or disabilities.

For employers, remote work can lead to cost savings on office space and utilities. It also enables access to a broader talent pool, as companies are no longer limited to hiring candidates within commuting distance. Additionally, studies have shown that remote workers often exhibit higher levels of productivity and job satisfaction.

However, remote work also presents challenges. It can lead to feelings of isolation and disconnection from colleagues, which can impact mental health and team cohesion. Communication and collaboration may become more difficult without face-to-face interaction. Employers may struggle with managing remote workers and ensuring accountability.

In response to these challenges, many organizations are adopting hybrid work models, which combine in-office and remote work. Hybrid models offer the best of both worlds, allowing employees to enjoy the flexibility of remote work while maintaining the benefits of in-person collaboration. For example, a company might require employees to be in the office for team meetings and collaborative projects but allow them to work remotely for focused, individual tasks.

The shift to remote and hybrid work has profound implications for workplace culture. Traditional office hierarchies may become less rigid as employees gain more autonomy over their work. Organizations will need to invest in digital tools and communication strategies to maintain strong team bonds and company culture. Leadership styles may also need to evolve, with a greater emphasis on trust, results-based management, and employee well-being.

Looking ahead, the future of work is likely to be characterized by flexibility and choice. Remote and hybrid models will continue to coexist with traditional in-office work, with organizations tailoring their approach to their specific needs and industry. The pandemic has fundamentally changed our relationship with work, and these changes are likely to endure long into the future.

In conclusion, the rise of remote and hybrid work represents a significant shift in how we work and interact with our colleagues. While it presents challenges, it also offers exciting opportunities for greater flexibility, productivity, and inclusivity. By embracing these changes and adapting to the new reality of work, organizations can position themselves for success in the post-pandemic world.`
  }
];

// 获取当前写作题目详情
const currentTopic = ref(null);

// 初始化函数
onMounted(() => {
  // 查找当前写作题目
  currentTopic.value = writingTopics.find(topic => topic.id === parseInt(topicId.value));
  
  // 如果题目不存在，返回上一页
  if (!currentTopic.value) {
    router.back();
  }
});

// 返回上一页
const goBack = () => {
  router.back();
};

// 切换显示内容
const activeTab = ref('requirements');

const switchTab = (tab) => {
  activeTab.value = tab;
};

// 答题相关状态
const userAnswer = ref('');
const wordCount = ref(0);
const timer = ref(0);
const isTimerRunning = ref(false);
let timerInterval = null;

// 计算单词数
const calculateWordCount = (text) => {
  // 简单的单词计数逻辑：按空格分割，过滤空字符串
  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  return words.length;
};

// 监听用户输入，更新单词数
const handleInput = (event) => {
  userAnswer.value = event.target.value;
  wordCount.value = calculateWordCount(userAnswer.value);
};

// 开始/暂停计时器
const toggleTimer = () => {
  if (isTimerRunning.value) {
    clearInterval(timerInterval);
  } else {
    timerInterval = setInterval(() => {
      timer.value++;
    }, 1000);
  }
  isTimerRunning.value = !isTimerRunning.value;
};

// 重置计时器
const resetTimer = () => {
  clearInterval(timerInterval);
  timer.value = 0;
  isTimerRunning.value = false;
};

// 格式化时间显示
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// 提交答案
const submitAnswer = () => {
  console.log('提交答案:', userAnswer.value);
  console.log('单词数:', wordCount.value);
  console.log('用时:', formatTime(timer.value));
  // 这里可以添加提交答案的逻辑
  alert('答案已提交！');
};
</script>

<template>
  <!-- 移动端写作详情页面 -->
  <div class="min-h-screen">
    <!-- 顶部导航栏 -->
    <div class="fixed top-0 left-0 right-0 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/30 px-4 py-2 sm:py-3 z-50">
      <div class="flex items-center justify-between">
        <button @click="goBack" class="text-white hover:text-slate-300 transition-colors">
          <i class="fa-solid fa-arrow-left text-lg"></i>
        </button>
        <h2 class="text-lg font-bold text-white">写作详情</h2>
        <div class="w-6"></div> <!-- 占位元素，保持标题居中 -->
      </div>
    </div>
    
    <!-- 写作内容容器 -->
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
        <span class="text-slate-400">{{ currentTopic?.type }}</span>
        <span class="text-slate-400">{{ currentTopic?.wordLimit }} words</span>
        <span class="text-slate-400">{{ currentTopic?.timeLimit }}分钟</span>
        <span class="text-slate-400">{{ currentTopic?.source }}</span>
      </div>
      
      <!-- 题目描述 -->
      <div class="glass-card p-4 rounded-xl mb-6">
        <h3 class="text-lg font-semibold text-white mb-3">题目描述</h3>
        <p class="text-slate-300 leading-relaxed">{{ currentTopic?.description }}</p>
      </div>
      
      <!-- 标签页切换 -->
      <div class="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
        <button 
          @click="switchTab('requirements')"
          class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap"
          :class="activeTab === 'requirements' ? 'bg-write text-white' : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'"
        >
          写作要求
        </button>
        <button 
          @click="switchTab('answer')"
          class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap"
          :class="activeTab === 'answer' ? 'bg-write text-white' : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'"
        >
          开始答题
        </button>
        <button 
          @click="switchTab('sample')"
          class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap"
          :class="activeTab === 'sample' ? 'bg-write text-white' : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'"
        >
          参考范文
        </button>
      </div>
      
      <!-- 内容区域 -->
      <div class="glass-card p-4 rounded-xl">
        <!-- 写作要求 -->
        <div v-if="activeTab === 'requirements'">
          <h3 class="text-lg font-semibold text-white mb-3">写作要求</h3>
          <div class="space-y-3 text-slate-300 leading-relaxed whitespace-pre-line">
            {{ currentTopic?.requirements }}
          </div>
        </div>
        
        <!-- 答题区域 -->
        <div v-else-if="activeTab === 'answer'">
          <!-- 计时器和控制按钮 -->
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-4">
              <div class="text-lg font-mono text-white">
                {{ formatTime(timer) }}
              </div>
              <div class="flex gap-2">
                <button 
                  @click="toggleTimer"
                  class="px-3 py-1 rounded bg-write/80 hover:bg-write text-white text-sm transition-colors"
                >
                  <i :class="isTimerRunning ? 'fa-solid fa-pause' : 'fa-solid fa-play'"></i>
                  {{ isTimerRunning ? ' 暂停' : ' 开始' }}
                </button>
                <button 
                  @click="resetTimer"
                  class="px-3 py-1 rounded bg-slate-700/50 hover:bg-slate-700 text-white text-sm transition-colors"
                >
                  <i class="fa-solid fa-refresh"></i> 重置
                </button>
              </div>
            </div>
            <div class="text-sm text-slate-400">
              单词数: <span class="text-white font-medium">{{ wordCount }}</span>
              <span class="text-slate-500 ml-2">(要求: {{ currentTopic?.wordLimit }})</span>
            </div>
          </div>
          
          <!-- 文本输入区域 -->
          <div class="mb-4">
            <textarea 
              v-model="userAnswer"
              @input="handleInput"
              class="w-full h-64 p-4 rounded-lg bg-slate-800/50 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-write/50 text-white resize-none"
              placeholder="请在此输入你的作文..."
              spellcheck="false"
            ></textarea>
          </div>
          
          <!-- 提交按钮 -->
          <div class="flex justify-center">
            <button 
              @click="submitAnswer"
              class="px-6 py-3 rounded-lg bg-write hover:bg-write/80 text-white font-medium transition-all duration-300"
            >
              提交答案
            </button>
          </div>
        </div>
        
        <!-- 参考范文 -->
        <div v-else-if="activeTab === 'sample'">
          <h3 class="text-lg font-semibold text-white mb-3">参考范文</h3>
          <div class="space-y-4 text-slate-300 leading-relaxed">
            <p v-for="(paragraph, index) in currentTopic?.sampleAnswer.split('\n\n')" :key="index">
              {{ paragraph }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
