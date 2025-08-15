<template>
  <div class="readme-container" v-html="readmeHtml"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { marked } from "marked";

const readmeHtml = ref("");

onMounted(async () => {
  try {
    const res = await fetch(
      "https://raw.githubusercontent.com/tvast/tvast.github.io/main/README.md"
    );
    const md = await res.text();
    readmeHtml.value = marked(md);
  } catch (err) {
    console.error("Error fetching README.md:", err);
  }
});
</script>

<style scoped>
.readme-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: system-ui, sans-serif;
  line-height: 1.6;
}

.readme-container h1,
.readme-container h2,
.readme-container h3 {
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3em;
}

.readme-container pre {
  background: #f6f8fa;
  padding: 0.8rem;
  overflow-x: auto;
}

.readme-container code {
  background: rgba(27, 31, 35, 0.05);
  padding: 0.2em 0.4em;
  border-radius: 4px;
}
</style>