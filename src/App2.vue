<template>
  <div :class="currentTheme" id="app">
    <header>
      <button @click="setTheme('dark')">Dark</button>
      <button @click="setTheme('grey')">Grey</button>
      <button @click="setTheme('pink')">Pink</button>
    </header>

    <Timeline />
    <MasonryBoard />
  </div>
</template>

<script>
import Timeline from './components/Timeline.vue'
import MasonryBoard from './components/MasonryBoard.vue'

export default {
  name: 'App',
  components: {
    Timeline,
    MasonryBoard
  },
  data() {
    return {
      currentTheme: 'theme-dark', // default theme
    }
  },
  methods: {
    setTheme(theme) {
      this.currentTheme = `theme-${theme}`
      localStorage.setItem('theme', this.currentTheme)
    },
  },
  created() {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      this.currentTheme = savedTheme
    }
  }
}
</script>

<style>
:root {
  --background-color: #fff;
  --text-color: #000;
  --primary-color: #42b983;
}

/* Dark mode */
.theme-dark {
  --background-color: #121212;
  --text-color: #e0e0e0;
  --primary-color: #42b983;
}

/* Grey mode */
.theme-grey {
  --background-color: #f5f5f5;
  --text-color: #333333;
  --primary-color: #666666;
}

/* Pink mode */
.theme-pink {
  --background-color: #ffe4e6;
  --text-color: #5a2a2a;
  --primary-color: #d6336c;
}

div#app {
  background-color: var(--background-color);
  color: var(--text-color);
  min-height: 100vh;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Buttons style */
header {
  padding: 1rem;
  text-align: center;
  background-color: var(--background-color);
  border-bottom: 1px solid var(--primary-color);
  margin-bottom: 1rem;
}

button {
  background-color: var(--primary-color);
  border: none;
  color: var(--text-color);
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  opacity: 0.85;
}
</style>

