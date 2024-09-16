<script setup>
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";
import Button from "primevue/button";
import Message from "primevue/message";
import Dialog from "primevue/dialog";
import { ref, defineEmits } from 'vue';

const props = defineProps({
  frontText: String,
  backText: String
});

const emit = defineEmits(['test-complete', 'add-incorrect-answer']);

const userAnswer = ref('');
const resultMessage = ref('');
const isCorrect = ref(false);
const showAnswer = ref(false);

const checkAnswer = () => {
  const normalizedAnswer = userAnswer.value.trim().toLowerCase();
  const normalizedBackText = props.backText.trim().toLowerCase();

  if (normalizedAnswer === normalizedBackText) {
    isCorrect.value = true;
    resultMessage.value = 'Correct!';
    emit('test-complete', true); // Emit correctness
    userAnswer.value = '';

    // Clear text box and result message after a delay
    setTimeout(() => {
      ClearBox();
    }, 1000);
  } else {
    isCorrect.value = false;
    resultMessage.value = 'Incorrect. Please try again.';
  }
};

const showAnswerAndStop = () => {
  showAnswer.value = true;

  emit('add-incorrect-answer', {
    frontText: props.frontText,
    backText: props.backText,
    userAnswer: userAnswer.value || 'No answer provided'
  });

  // Clear text box and result message after a delay
  setTimeout(() => {
    ClearBox();
    showAnswer.value = false; // Reset showAnswer to hide the answer
    emit('test-complete'); // Proceed to the next question
  }, 2000);
};

const ClearBox = () => {
  resultMessage.value = '';
};

</script>

<template>
  <div class="flex gap-2">
    <div class="flex gap-2">
      <Message severity="contrast" class="mb-8">{{ frontText }}</Message>
      <div v-if="!showAnswer">
        <FloatLabel>
          <InputText v-model="userAnswer" id="text" />
          <label for="text">Type the answer here...</label>
        </FloatLabel>

        <div v-if="resultMessage" :class="{'text-green-500': isCorrect, 'text-red-500': !isCorrect}">
          {{ resultMessage }}
        </div>
      </div>
      <div v-if="showAnswer">
        <Message severity="info">The correct answer is: {{ props.backText }}</Message>
      </div>
    </div>

    <Button class="h-11" @click="checkAnswer" v-if="!showAnswer">Check Answer</Button>
    <Button class="h-11" outlined severity="info" @click="showAnswerAndStop" v-if="!showAnswer">Show Answer</Button>
  </div>
</template>
