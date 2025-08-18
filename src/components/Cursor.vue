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
  color: black;
  display: inline-block;
  position: relative;
  z-index: 1000; /* 🔥 toujours au-dessus */
}

.cursor {
  display: inline-block;
  width: 2px;
  margin-left: 2px;
  font-weight: bold;
  font-size: 1.2em;
  color: #ff80c0;
  text-shadow: 0 0 6px #ffb3d9, 0 0 12px #ff66cc;
  animation: blink 1s step-start infinite, kawaii 3s infinite;
  z-index: 1000;
  position: relative;
}

/* Blink classique */
@keyframes blink {
  50% { opacity: 0; }
}

/* Variation kawaii pastel */
@keyframes kawaii {
  0%, 100% { color: #ff80c0; text-shadow: 0 0 6px #ffb3d9; }
  50% { color: #80ffea; text-shadow: 0 0 6px #b3ffff; }
}
</style>