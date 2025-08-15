<template>
  <div class="typing">
    {{ displayedText }}<span class="cursor">|</span>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const phrases = ["I code", "Build", "Run", "Ship"];
const displayedText = ref("");
let phraseIndex = 0;
let charIndex = 0;
let timeoutId;

function typeText() {
  const currentPhrase = phrases[phraseIndex];
  if (charIndex < currentPhrase.length) {
    displayedText.value += currentPhrase[charIndex];
    charIndex++;
    timeoutId = setTimeout(typeText, 150);
  } else {
    // Pause before deleting
    timeoutId = setTimeout(deleteText, 1000);
  }
}

function deleteText() {
  if (charIndex > 0) {
    displayedText.value = displayedText.value.slice(0, -1);
    charIndex--;
    timeoutId = setTimeout(deleteText, 50);
  } else {
    phraseIndex = (phraseIndex + 1) % phrases.length;
    timeoutId = setTimeout(typeText, 150);
  }
}

onMounted(() => {
  typeText();
});

onBeforeUnmount(() => {
  clearTimeout(timeoutId);
});
</script>

<style scoped>
.typing {
  font-family: 'Courier New', monospace;
  font-size: 2rem;
  color: white;
  display: inline-block;
}

.cursor {
  display: inline-block;
  width: 2px;
  opacity: 0.5;
  margin-left: 2px;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50%, 100% { opacity: 1; }
  25%, 75% { opacity: 0; }
}
</style>