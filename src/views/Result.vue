<!-- src/views/Result.vue -->
<template>
  <div class="result-page">
    <div class="result-container">
      <div class="header">
        <h1 class="title">🎀 당신의 산리오 캐릭터는? 🎀</h1>
      </div>

      <div class="result-card" v-if="mbti && character">
        <div class="mbti-section">
          <h2 class="mbti-title">{{ mbti }}</h2>
          <p class="mbti-description">{{ getMBTIDescription(mbti) }}</p>
        </div>

        <div class="character-section">
          <div class="character-image">
            <img 
              v-if="character.imageName"
              :src="`/images/characters/${character.imageName}.png`" 
              :alt="character.name"
              class="character-img"
              @error="handleImageError"
            />
            <div v-else class="character-placeholder">
              {{ character.emoji }}
            </div>
          </div>
          <h3 class="character-name">{{ character.name }}</h3>
          <p class="character-description">{{ character.description }}</p>
        </div>

        <div class="personality-traits">
          <h4>당신의 성격 특징</h4>
          <ul class="traits-list">
            <li v-for="trait in character.traits" :key="trait">{{ trait }}</li>
          </ul>
        </div>

        <div class="compatibility-section">
          <h4>나와 잘 맞는 유형과 산리오 캐릭터</h4>
          <div class="compatibility-grid">
            <div 
              v-for="compatible in getCompatibleTypes(mbti)" 
              :key="compatible.mbti"
              class="compatible-card"
            >
              <div class="compatible-image">
                <img 
                  v-if="compatible.imageName"
                  :src="`/images/characters/${compatible.imageName}.png`" 
                  :alt="compatible.name"
                  class="compatible-img"
                  @error="handleCompatibleImageError"
                />
                <div v-else class="compatible-emoji">{{ compatible.emoji }}</div>
              </div>
              <h5>{{ compatible.mbti }}</h5>
              <p>{{ compatible.name }}</p>
              <span class="compatibility-type">{{ compatible.type }}</span>
            </div>
          </div>
        </div>

        <div class="actions">
          <button @click="restartTest" class="restart-btn">
            🎀 다시 테스트하기
          </button>
          <button @click="shareResult" class="share-btn">
            📱 결과 공유하기
          </button>
        </div>
      </div>

      <div class="error-message" v-else>
        <p>결과를 찾을 수 없습니다.</p>
        <button @click="goHome" class="home-btn">🏠 홈으로 돌아가기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { mbtiToSanrio } from '../data/resultMap.js'

const props = defineProps({
  mbti: String
})

const router = useRouter()

const character = computed(() => {
  if (!props.mbti) return null
  return mbtiToSanrio[props.mbti] || null
})

function getMBTIDescription(mbti) {
  const descriptions = {
    'INFP': '이상주의적이고 창의적인 성격',
    'ENFP': '열정적이고 창의적인 성격',
    'ISFP': '예술적이고 평화로운 성격',
    'ESFP': '활발하고 친근한 성격',
    'INFJ': '통찰력 있고 이상주의적인 성격',
    'ENFJ': '따뜻하고 리더십 있는 성격',
    'INTJ': '전략적이고 독립적인 성격',
    'ENTP': '창의적이고 논리적인 성격',
    'ISTP': '실용적이고 분석적인 성격',
    'ISFJ': '책임감 있고 따뜻한 성격',
    'ESTP': '활동적이고 실용적인 성격'
  }
  return descriptions[mbti] || '특별한 성격을 가진 당신!'
}

function restartTest() {
  router.push('/')
}

function shareResult() {
  const text = `🎀 산리오 MBTI 테스트 결과 🎀\n당신의 MBTI: ${props.mbti}\n당신의 산리오 캐릭터: ${character.value?.name} ${character.value?.emoji}`
  
  if (navigator.share) {
    navigator.share({
      title: '산리오 MBTI 테스트 결과',
      text: text
    })
  } else {
    navigator.clipboard.writeText(text).then(() => {
      alert('결과가 클립보드에 복사되었습니다!')
    })
  }
}

function goHome() {
  router.push('/')
}

function handleImageError(event) {
  // 이미지 로드 실패 시 이모지로 대체
  event.target.style.display = 'none'
  const placeholder = event.target.nextElementSibling
  if (placeholder) {
    placeholder.style.display = 'block'
  }
}

function handleCompatibleImageError(event) {
  // 이미지 로드 실패 시 이모지로 대체
  event.target.style.display = 'none'
  const placeholder = event.target.nextElementSibling
  if (placeholder) {
    placeholder.style.display = 'block'
  }
}

function getCompatibleTypes(mbti) {
  const compatibilityMap = {
    'ENFJ': [
      { mbti: 'INFP', name: '시나모롤', emoji: '🐰', imageName: 'cinnamoroll', type: '이상적인 관계' },
      { mbti: 'ISFP', name: '쿠로미', emoji: '🐻', imageName: 'kuromi', type: '보완적 관계' }
    ],
    'ENFP': [
      { mbti: 'INFJ', name: '턱시도샘', emoji: '🐧', imageName: 'tuxedosam', type: '이상적인 관계' },
      { mbti: 'ISTJ', name: '라라', emoji: '⭐', imageName: 'lala', type: '보완적 관계' }
    ],
    'ENTJ': [
      { mbti: 'INFP', name: '시나모롤', emoji: '🐰', imageName: 'cinnamoroll', type: '이상적인 관계' },
      { mbti: 'ISFP', name: '쿠로미', emoji: '🐻', imageName: 'kuromi', type: '보완적 관계' }
    ],
    'ENTP': [
      { mbti: 'INFJ', name: '턱시도샘', emoji: '🐧', imageName: 'tuxedosam', type: '이상적인 관계' },
      { mbti: 'ISFJ', name: '마이 멜로디', emoji: '🐰', imageName: 'mymelody', type: '보완적 관계' }
    ],
    'ESFJ': [
      { mbti: 'INTP', name: '키키', emoji: '⭐', imageName: 'kiki', type: '이상적인 관계' },
      { mbti: 'ISTP', name: '참미 키티', emoji: '🐱', imageName: 'charmmykitty', type: '보완적 관계' }
    ],
    'ESFP': [
      { mbti: 'INTJ', name: '창고미', emoji: '🐱', imageName: 'chococat', type: '이상적인 관계' },
      { mbti: 'INTP', name: '키키', emoji: '⭐', imageName: 'kiki', type: '보완적 관계' }
    ],
    'ESTJ': [
      { mbti: 'INFP', name: '시나모롤', emoji: '🐰', imageName: 'cinnamoroll', type: '이상적인 관계' },
      { mbti: 'ISFP', name: '쿠로미', emoji: '🐻', imageName: 'kuromi', type: '보완적 관계' }
    ],
    'ESTP': [
      { mbti: 'INFJ', name: '턱시도샘', emoji: '🐧', imageName: 'tuxedosam', type: '이상적인 관계' },
      { mbti: 'ISFJ', name: '마이 멜로디', emoji: '🐰', imageName: 'mymelody', type: '보완적 관계' }
    ],
    'INFJ': [
      { mbti: 'ENFP', name: '폼폼푸린', emoji: '🐻', imageName: 'pompompurin', type: '이상적인 관계' },
      { mbti: 'ESTP', name: '포차코', emoji: '🐶', imageName: 'pochacco', type: '보완적 관계' }
    ],
    'INFP': [
      { mbti: 'ENFJ', name: '디어 다니엘', emoji: '🐰', imageName: 'deardaniel', type: '이상적인 관계' },
      { mbti: 'ENTJ', name: '배드 바츠마루', emoji: '🦇', imageName: 'badtzmaru', type: '보완적 관계' }
    ],
    'INTJ': [
      { mbti: 'ESFP', name: '포차코', emoji: '🐶', imageName: 'pochacco', type: '이상적인 관계' },
      { mbti: 'ENFP', name: '폼폼푸린', emoji: '🐻', imageName: 'pompompurin', type: '보완적 관계' }
    ],
    'INTP': [
      { mbti: 'ESFJ', name: '헬로키티', emoji: '🐱', imageName: 'hellokitty', type: '이상적인 관계' },
      { mbti: 'ESTJ', name: '케로케로케로피', emoji: '🐸', imageName: 'kerokero', type: '보완적 관계' }
    ],
    'ISFJ': [
      { mbti: 'ENTP', name: '구데타마', emoji: '🥚', imageName: 'gudetama', type: '이상적인 관계' },
      { mbti: 'ESTP', name: '포차코', emoji: '🐶', imageName: 'pochacco', type: '보완적 관계' }
    ],
    'ISFP': [
      { mbti: 'ENFJ', name: '디어 다니엘', emoji: '🐰', imageName: 'deardaniel', type: '이상적인 관계' },
      { mbti: 'ENTJ', name: '배드 바츠마루', emoji: '🦇', imageName: 'badtzmaru', type: '보완적 관계' }
    ],
    'ISTJ': [
      { mbti: 'ENFP', name: '폼폼푸린', emoji: '🐻', imageName: 'pompompurin', type: '이상적인 관계' },
      { mbti: 'ESFP', name: '포차코', emoji: '🐶', imageName: 'pochacco', type: '보완적 관계' }
    ],
    'ISTP': [
      { mbti: 'ESFJ', name: '헬로키티', emoji: '🐱', imageName: 'hellokitty', type: '이상적인 관계' },
      { mbti: 'ENFJ', name: '디어 다니엘', emoji: '🐰', imageName: 'deardaniel', type: '보완적 관계' }
    ]
  }
  
  return compatibilityMap[mbti] || []
}
</script>

<style scoped>
.result-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.result-container {
  max-width: 800px;
  width: 100%;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
}

.title {
  font-size: 2.5rem;
  color: #ff69b4;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(255, 105, 180, 0.3);
  animation: sparkle 2s ease-in-out infinite;
}

@keyframes sparkle {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.result-card {
  background: linear-gradient(145deg, #fff5f7, #ffe6f2);
  border: 3px solid #ffb6c1;
  border-radius: 25px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(255, 182, 193, 0.3);
  position: relative;
  overflow: hidden;
}

.result-card::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 182, 193, 0.1) 0%, transparent 70%);
  animation: float 8s ease-in-out infinite;
}

.mbti-section {
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
}

.mbti-title {
  font-size: 3rem;
  color: #ff69b4;
  margin-bottom: 0.5rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(255, 105, 180, 0.3);
}

.mbti-description {
  font-size: 1.2rem;
  color: #666;
  margin: 0;
}

.character-section {
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
}

.character-image {
  margin-bottom: 1rem;
}

.character-placeholder {
  font-size: 8rem;
  margin: 0 auto;
  width: fit-content;
  animation: bounce 2s ease-in-out infinite;
}

.character-img {
  max-width: 200px;
  height: auto;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(255, 105, 180, 0.3);
  transition: transform 0.3s ease;
  display: block;
  margin: 0 auto;
}

.character-img:hover {
  transform: scale(1.05);
}

.character-name {
  font-size: 2rem;
  color: #ff69b4;
  margin-bottom: 1rem;
  font-weight: bold;
}

.character-description {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.personality-traits {
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
}

.personality-traits h4 {
  color: #ff69b4;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  text-align: center;
}

.traits-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.5rem;
}

.traits-list li {
  background: rgba(255, 182, 193, 0.2);
  padding: 0.8rem 1rem;
  border-radius: 15px;
  text-align: center;
  color: #4a4a4a;
  font-weight: 500;
  border: 1px solid rgba(255, 182, 193, 0.3);
}

.compatibility-section {
  margin-top: 2rem;
  position: relative;
  z-index: 1;
}

.compatibility-section h4 {
  color: #ff69b4;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  text-align: center;
}

.compatibility-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  justify-items: center;
}

.compatible-card {
  background: rgba(255, 182, 193, 0.1);
  border: 1px solid rgba(255, 182, 193, 0.2);
  border-radius: 15px;
  padding: 1rem;
  text-align: center;
  width: 100%;
  max-width: 180px;
  box-shadow: 0 4px 15px rgba(255, 182, 193, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.compatible-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(255, 182, 193, 0.2);
  background: rgba(255, 182, 193, 0.15);
}

.compatible-image {
  margin-bottom: 0.5rem;
  position: relative;
  width: 100%;
  height: 100px; /* Fixed height for image container */
  display: flex;
  align-items: center;
  justify-content: center;
}

.compatible-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.compatible-emoji {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  animation: float 3s ease-in-out infinite;
}

.compatible-card h5 {
  font-size: 1.1rem;
  color: #ff69b4;
  margin-bottom: 0.3rem;
  font-weight: bold;
}

.compatible-card p {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.compatibility-type {
  font-size: 0.8rem;
  color: #888;
  font-weight: 500;
  background: rgba(255, 182, 193, 0.2);
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  display: inline-block;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
}

.restart-btn, .share-btn, .home-btn {
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(255, 105, 180, 0.3);
}

.restart-btn {
  background: linear-gradient(45deg, #ff69b4, #ffb6c1);
  color: white;
}

.share-btn {
  background: linear-gradient(45deg, #87ceeb, #98d8e8);
  color: white;
}

.home-btn {
  background: linear-gradient(45deg, #98fb98, #90ee90);
  color: white;
}

.restart-btn:hover, .share-btn:hover, .home-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(255, 105, 180, 0.4);
}

.error-message {
  text-align: center;
  color: #666;
}

.error-message p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .result-page {
    padding: 1rem;
  }
  
  .result-card {
    padding: 2rem 1.5rem;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .mbti-title {
    font-size: 2.5rem;
  }
  
  .character-placeholder {
    font-size: 6rem;
  }
  
  .actions {
    flex-direction: column;
  }
  
  .traits-list {
    grid-template-columns: 1fr;
  }

  .compatibility-grid {
    grid-template-columns: 1fr;
  }
}
</style>
