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

const lang = ref("en"); // default language
const readmeHtml = ref("");

const rawUrlEN = "https://raw.githubusercontent.com/tvast/tvast.github.io/main/README_EN.md";
const rawUrlFR = "https://raw.githubusercontent.com/tvast/tvast.github.io/main/README_FR.md";

async function loadReadme(language) {
  const url = language === "fr" ? rawUrlFR : rawUrlEN;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const md = await res.text();
    readmeHtml.value = marked(md);
  } catch (err) {
    console.error("Error fetching README:", err);
    readmeHtml.value = `<p style="color:red">Failed to load README.</p>`;
  }
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