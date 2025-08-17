<template>
  <div>
    <div v-if="!isLoaded" class="loading-container">
      <img src="/logo.png" alt="Animated Logo" class="splash-logo" />
    </div>
    <div v-else>
      <AnimatedLogo />
<Thorus />
      <AiPrompt />
      <Landing />
<Marketing />
<Donuts/>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import AnimatedLogo from "./components/AnimatedLogo.vue";
import AiPrompt from "./components/AiPrompt.vue";
import Landing from "./components/Landing.vue";
import Donuts from "./components/Donuts.vue";
import DonutsAnimated from "./components/DonutsAnimated.vue";
import AnimatedDonutsStyle from "./components/AnimatedDonutsStyle.vue";
import Thorus from "./components/Thorus.vue";
import Marketing from "./components/Marketing.vue";

const isLoaded = ref(false);
const showLogo = ref(true);
const handleLogoClick = () => {
  console.log("Logo clicked");
};

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true;
  }, 3000);
});
</script>

<style scoped>
.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: white;
}

.splash-logo {
  width: 150px;
  animation: splashAnimation 1.8s ease-in-out forwards;
}

@keyframes splashAnimation {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  50% {
    opacity: 1;
    transform: scale(3.2);
  }
  100% {
    opacity: 0;
    transform: scale(1);
  }
}
</style>