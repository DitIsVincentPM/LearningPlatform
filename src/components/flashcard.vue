<template>
  <div
      class="w-80 h-48 perspective cursor-pointer"
      @click="flipCard"
  >
    <!-- Card Inner Container -->
    <div
        class="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d"
        :class="{ 'rotate-y-180': isFlipped }"
    >
      <!-- Front Side -->
      <div
          class="absolute w-full h-full dark:bg-neutral-900 dark:text-white bg-green-100 text-black flex justify-center items-center shadow-lg outline backface-hidden rounded-lg"
      >
        <p class="text-xl font-semibold">{{ frontText }}</p>
      </div>

      <!-- Back Side -->
      <div
          class="absolute w-full h-full bg-emerald-600 text-white flex justify-center items-center shadow-lg rounded-lg rotate-y-180 backface-hidden"
      >
        <p class="text-xl font-semibold">{{ backText }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    frontText: String,
    backText: String
  },
  data() {
    return {
      isFlipped: false,
    };
  },
  methods: {
    flipCard() {
      this.isFlipped = !this.isFlipped;
    },
  },
};
</script>

<style scoped>
.perspective {
  perspective: 1000px; /* Creates the 3D perspective for the card rotation */
}

.backface-hidden {
  backface-visibility: hidden; /* Hides the backface of the card */
}

.rotate-y-180 {
  transform: rotateY(180deg); /* Correctly rotates the back side */
}

.transform-style-preserve-3d {
  transform-style: preserve-3d; /* Ensures the card rotates in 3D space */
}
</style>
