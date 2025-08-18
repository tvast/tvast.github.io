<template>
  <div class="lang-switcher">
    <button @click="lang = 'fr'">🇫🇷 Français</button>
    <button @click="lang = 'en'">🇬🇧 English</button>
  </div>
  <div class="readme-container" v-html="readmeHtml"></div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { marked } from "marked";

// Import markdown files as raw text
import readmeEN from '/_EN.md?raw';
import readmeFR from '/_FR.md?raw';

const lang = ref("en"); // default language
const readmeHtml = ref("");

function loadReadme(language) {
  const md = language === "fr" ? readmeFR : readmeEN;
  readmeHtml.value = marked(md);
}

watch(lang, (newLang) => loadReadme(newLang));
onMounted(() => loadReadme(lang.value));
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
</style>