<template>
  <div class="lang-switcher">
    <button @click="lang = 'fr'">🇫🇷 Français</button>
    <button @click="lang = 'en'">🇬🇧 English</button>
  </div>
  <div class="readme-container" v-html="readmeHtml"></div>
</template>

<script setup>
import { ref, watch } from "vue";
import { marked } from "marked";

// Import Markdown as raw text
import readmeEN from '../assets/_EN.md?raw';
import readmeFR from '../assets/_FR.md?raw';
const lang = ref("en");
const readmeHtml = ref("");

function loadReadme(language) {
  const md = language === "fr" ? readmeFR : readmeEN;
  readmeHtml.value = marked(md);
}

watch(lang, (newLang) => loadReadme(newLang));
loadReadme(lang.value); // initial load
</script>

<style scoped>
.readme-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: system-ui, sans-serif;
  line-height: 1.6;
}
.lang-switcher {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin: 1rem 0;
}

.readme-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: system-ui, sans-serif;
  line-height: 1.6;
}
.lang-switcher {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin: 1rem 0;
}
</style>