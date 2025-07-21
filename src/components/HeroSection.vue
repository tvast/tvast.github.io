<template>
  <section class="hero-section">
    <AnimatedLogo />

    <transition name="fade-slide">
      <h1 class="hero-title">Alien Computing | THEOPHILE VAST</h1>
    </transition>

    <transition name="fade-slide" appear>
      <p class="hero-subtitle">JavaScript Full Stack • Shop • Landing Page</p>
    </transition>

    <div class="offers-tab">
      <span
        v-for="offer in offers"
        :key="offer.label"
        class="offer-item"
      >
        {{ offer.icon }} {{ offer.label }}
      </span>
    </div>
  </section>
</template>

<script>
import AnimatedLogo from './AnimatedLogo.vue';

export default {
  name: 'HeroSection',
  components: {
    AnimatedLogo,
  },
  data() {
    return {
      offers: [
        { icon: '💻', label: 'Full Stack Apps' },
        { icon: '🛒', label: 'E-commerce' },
        { icon: '🚀', label: 'Landing Pages' },
      ],
    };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@600&family=Roboto:wght@400&display=swap');

.hero-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 1rem;
  background: linear-gradient(to bottom, #f8f9fa, #e9ecef);
  font-family: 'Roboto', sans-serif;
  text-align: center;
  overflow: hidden;
}

.hero-title {
  font-family: 'Inter', sans-serif;
  font-size: 2.75rem;
  font-weight: 600;
  margin: 1.2rem 0 0.8rem;
  color: #212529;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #495057;
  margin-bottom: 2rem;
}

.offers-tab {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  background: #ffffff;
  padding: 1rem 2rem;
  border-radius: 2rem;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
}

.offer-item {
  font-weight: 600;
  text-transform: uppercase;
  color: #343a40;
  cursor: pointer;
  transition: all 0.3s ease;
}

.offer-item:hover {
  color: #007bff;
  transform: translateY(-2px);
}

/* Animations */
.fade-slide-enter-active {
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-slide-enter {
  opacity: 0;
  transform: translateY(15px);
}
</style>

