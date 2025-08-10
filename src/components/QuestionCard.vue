<!-- src/components/QuestionCard.vue -->
<template>
  <div class="question-card">
    <h2 class="question">{{ question.text }}</h2>
    <div class="options">
      <button @click="selectOption(question.options[0].value)">
        {{ question.options[0].label }}
      </button>
      <button @click="selectOption(question.options[1].value)">
        {{ question.options[1].label }}
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  question: Object
})

const emit = defineEmits(['answered'])

function selectOption(value) {
  emit('answered', value)
}
</script>

<!-- 스타일은 따로 분리 -->