<template>
  <section class="hero">
    <div class="overlay"></div>

    <div class="content">
      <transition name="logo-fade">
     <img
  v-if="showLogo"
  :src="logo"
  alt="Animated Logo"
  class="animated-logo"
  @click="handleLogoClick"
/>
      </transition>

      <transition name="text-slide">
        <h1 v-if="showLogo" class="hero-title">
          Welcome to My Universe
        </h1>
      </transition>

      <transition name="subtitle-fade">
        <p v-if="showLogo" class="hero-subtitle">
          Where creativity meets <strong>technology</strong>
        </p>

      </transition>
          <Cursor />

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import logo from "../../public/logo.png";

const showLogo = ref(false);
import { eventBus } from "../eventBus";
import Cursor from "./Cursor.vue";

function handleLogoClick() {
  eventBus.emit("open-chat");
}
onMounted(() => {
  setTimeout(() => {
    showLogo.value = true;
  }, 300);
});
</script>

<style scoped>
/* Hero full screen background with black background */
.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* Subtle gray overlay */
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.05);
  pointer-events: none;
}

/* Content centered with white text */
.content {
  position: relative;
  text-align: center;
  z-index: 2;
  color: black;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  letter-spacing: 0.05em;
}

/* Animated logo with subtle opacity fade */
.animated-logo {
  width: 180px;
  height: auto;
  animation: fadeIn 1.2s ease forwards;
  opacity: 0;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

/* Minimal, elegant hero title */
.hero-title {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 2.5rem;
  margin-top: 1rem;
  text-transform: none;
  letter-spacing: 0.1em;
  color: black;
}

/* Remove gradient span styling */
/* Subtitle */
.hero-subtitle {
  margin-top: 0.5rem;
  font-size: 1.2rem;
  opacity: 0.8;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: black;
}

/* Animations */
.logo-fade-enter-active,
.logo-fade-leave-active {
  transition: opacity 1.2s ease;
}
.logo-fade-enter,
.logo-fade-leave-to {
  opacity: 0;
}

.text-slide-enter-active {
  transition: all 1s ease 0.3s;
}
.text-slide-enter {
  transform: translateY(30px);
  opacity: 0;
}

.subtitle-fade-enter-active {
  transition: opacity 1.2s ease 0.6s;
}
.subtitle-fade-enter {
  opacity: 0;
}
</style>