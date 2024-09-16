<script setup>
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";
import Button from "primevue/button";
import Message from "primevue/message";
import { ref, defineEmits } from 'vue';

const props = defineProps({
  frontText: String,
  backText: String
});

const emit = defineEmits(['test-complete', 'test-summary']);

const userAnswer = ref('');
const resultMessage = ref('');
const isCorrect = ref(false);
const isAnswerRevealed = ref(false);

const checkAnswer = () => {
  const normalizedAnswer = userAnswer.value.trim().toLowerCase();
  const normalizedBackText = props.backText.trim().toLowerCase();

  if (normalizedAnswer === normalizedBackText) {
    isCorrect.value = true;
    resultMessage.value = 'Correct!';

    // Proceed to the next question after a delay
    setTimeout(() => {
      emit('test-complete');
      ClearBox();
    }, 1000);
  } else {
    isCorrect.value = false;
    resultMessage.value = 'Incorrect. Please try again.';
    emit('add-incorrect-answer', { frontText: props.frontText, backText: props.backText, userAnswer: normalizedAnswer });
  }
};

const ClearBox = () => {
  resultMessage.value = '';
  userAnswer.value = '';
}

const revealAnswer = () => {
  isAnswerRevealed.value = true;
};

const nextQuestion = () => {
  emit('test-complete');
  ClearBox();
  isAnswerRevealed.value = false;
}
</script>

<template>
  <div class="flex gap-2">
    <div class="flex gap-2">
      <Message severity="contrast" class="mb-8">{{ frontText }}</Message>
      <div v-if="!isAnswerRevealed">
        <FloatLabel>
          <InputText v-model="userAnswer" id="text" />
          <label for="text">Type the answer here...</label>
        </FloatLabel>

        <div v-if="resultMessage" :class="{'text-green-500': isCorrect, 'text-red-500': !isCorrect}">
          {{ resultMessage }}
        </div>
      </div>
      <div v-else>
        <Message severity="info" class="mb-8">{{ backText }}</Message>
      </div>
    </div>

    <Button class="h-11" @click="isAnswerRevealed ? nextQuestion() : checkAnswer()">
      {{ isAnswerRevealed ? 'Next Question' : 'Check Answer' }}
    </Button>
    <Button v-if="!isAnswerRevealed" class="h-11 ml-2" @click="revealAnswer">
      Reveal Answer
    </Button>
  </div>
</template>
