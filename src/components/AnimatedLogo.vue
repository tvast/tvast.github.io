<template>
  <div class="logo-container">
    <transition name="logo-fade">
      <img
        v-if="showLogo"
        src="@/assets/logo.png"
        alt="Animated Logo"
        class="animated-logo"
      />
    </transition>
  </div>
</template>

<script>
export default {
  name: "AnimatedLogo",
  data() {
    return {
      showLogo: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.showLogo = true;
    }, 300); // slight delay for fade-in
  },
};
</script>

<style scoped>
@keyframes pulse {
  0% {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(1.1) rotate(3deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
}

.animated-logo {
  width: 150px;
  height: auto;
  animation: pulse 4s infinite ease-in-out;
  transition: transform 0.5s ease;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2));
}

.logo-fade-enter-active,
.logo-fade-leave-active {
  transition: opacity 1.2s;
}
.logo-fade-enter,
.logo-fade-leave-to {
  opacity: 0;
}
</style>

