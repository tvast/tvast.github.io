<template>
  <div class="timeline-carousel">
    <!-- Hoopalong background -->

    <!-- Timeline foreground -->
    <div v-if="timeline && timeline.length" class="carousel-wrapper">
      <button class="nav-btn left" @click="scroll(-1)">‹</button>
      <div ref="carousel" class="carousel">
        <div v-for="(item, index) in timeline" :key="index" class="carousel-card">
          <div class="icon">{{ item.icon }}</div>
          <div class="content">
            <h3 class="title">{{ item.title }}</h3>
            <p class="subtitle">
              {{ item.company || item.institution || '' }} - {{ item.date || '' }}
            </p>
            <ul v-if="item.description && item.description.length">
              <li v-for="(desc, i) in item.description" :key="i">{{ desc }}</li>
            </ul>
          </div>
        </div>
      </div>
      <button class="nav-btn right" @click="scroll(1)">›</button>
    </div>
  </div>
</template>

<script>

export default {
  name: "Timeline",
  props: {
    cv: { type: Array, required: true },
  },

  data() {
    return {
      timeline: [],
    };
  },
  created() {
    this.loadTimeline();
  },
  methods: {
    loadTimeline() {
      this.timeline = this.cv;
    },
    scroll(direction) {
      const carousel = this.$refs.carousel;
      if (!carousel || !carousel.children.length) return;

      const cardWidth = carousel.children[0].offsetWidth + 16; // includes gap
      carousel.scrollBy({
        left: direction * cardWidth,
        behavior: 'smooth',
      });
    },
  },
};
</script>

<style scoped>
.timeline-carousel {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  width: 100%;
  /* min-height: 100vh; REMOVE this */
}
/* Hoopalong background fills viewport */
.background {
  position: fixed;
  top: 0; left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1; /* push behind timeline */
}

.carousel-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
  z-index: 1; /* keep timeline above */
}

.carousel {
  display: flex;
  overflow-x: auto;
  gap: 1rem;
  scroll-behavior: smooth;
  padding: 1rem 0;
}

.carousel-card {
  flex: 0 0 300px;
  background: rgba(0, 255, 128, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.carousel-card:hover {
  transform: scale(1.05);
}

.icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.title {
  font-weight: bold;
  font-size: 1.2rem;
  margin: 0.2rem 0;
}

.subtitle {
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 0.5rem;
}

ul {
  padding-left: 1rem;
}

li {
  margin-bottom: 0.3rem;
}

.empty-message {
  color: #999;
  font-style: italic;
}

/* Navigation buttons */
.nav-btn {
  background: rgba(0, 255, 128, 0.3);
  border: none;
  border-radius: 50%;
  font-size: 2rem;
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  transition: transform 0.2s ease;
  z-index: 2;
}

.nav-btn:hover {
  transform: scale(1.1);
}

.nav-btn.left {
  margin-right: 0.5rem;
}

.nav-btn.right {
  margin-left: 0.5rem;
}
</style>