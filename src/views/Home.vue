<!-- src/views/Home.vue -->
<template>
  <div class="home">
    <div class="header">
      <h1 class="title">🎀 산리오 MBTI 테스트 🎀</h1>
      <p class="subtitle">당신의 성격 유형을 알아보고 산리오 캐릭터를 찾아보세요!</p>
    </div>
    
    <div class="progress-container" v-if="currentQuestion">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
      </div>
      <p class="progress-text">{{ currentIndex + 1 }} / {{ questions.length }}</p>
    </div>

    <QuestionCard
      v-if="currentQuestion"
      :question="currentQuestion"
      @answered="handleAnswer"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import QuestionCard from '../components/QuestionCard.vue'
import { questions } from '../data/questions.js'

const router = useRouter()
const currentIndex = ref(0)
const answers = ref([])

const currentQuestion = computed(() => questions[currentIndex.value] || null)
const progressPercentage = computed(() => ((currentIndex.value + 1) / questions.length) * 100)

function handleAnswer(value) {
  answers.value.push(value)
  currentIndex.value++

  if (currentIndex.value >= questions.length) {
    // 모든 질문이 끝났으면 결과 계산
    const mbtiResult = calculateMBTI(answers.value)
    // 결과 페이지로 이동
    router.push({ name: 'Result', query: { mbti: mbtiResult } })
  }
}

function calculateMBTI(answers) {
  const counts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }

  answers.forEach(letter => {
    if (counts[letter] !== undefined) {
      counts[letter]++
    }
  })

  const result = [
    counts.E >= counts.I ? 'E' : 'I',
    counts.S >= counts.N ? 'S' : 'N',
    counts.T >= counts.F ? 'T' : 'F',
    counts.J >= counts.P ? 'J' : 'P'
  ]

  return result.join('')
}
</script>

<style scoped>
.header {
  text-align: center;
  margin-bottom: 2rem;
}

.title {
  font-size: 2.5rem;
  color: #ff69b4;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(255, 105, 180, 0.3);
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}

.subtitle {
  font-size: 1.1rem;
  color: #666;
  margin: 0;
  font-weight: 500;
}

.progress-container {
  margin-bottom: 2rem;
  text-align: center;
}

.progress-bar {
  width: 100%;
  max-width: 400px;
  height: 12px;
  background: rgba(255, 182, 193, 0.3);
  border-radius: 6px;
  margin: 0 auto 0.5rem;
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #ff69b4, #ffb6c1);
  border-radius: 6px;
  transition: width 0.5s ease;
  box-shadow: 0 2px 4px rgba(255, 105, 180, 0.3);
}

.progress-text {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
  font-weight: 500;
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
}
</style>