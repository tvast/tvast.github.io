<template>
  <div>
    <!-- Hero Header Section -->
    <section class="hero-section">
      <AnimatedLogo />

      <transition name="fade-slide" appear>
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

      <a
        href="/assets/IA-FRONT_END-EN-FR-THEOPHILE-VAST.pdf"
        download
        class="resume-download-button"
      >
        📄 Download Résumé (EN/FR)
      </a>
    </section>

    <!-- Timeline Section -->
    <section class="timeline">
      <h2 class="timeline-title">Experience Timeline</h2>
      <div
        v-for="(experience, index) in timelineItems"
        :key="index"
        :class="['timeline-item', index % 2 === 0 ? 'left' : 'right']"
      >
        <div class="content">
          <div class="company">{{ experience.company }}</div>

          <template v-if="experience.roles">
            <div
              v-for="(role, i) in experience.roles"
              :key="i"
              class="role"
            >
              <h3>{{ role.title }}</h3>
              <span class="date-location">{{ role.date }} — {{ role.location }}</span>
              <ul v-if="role.description && Array.isArray(role.description)">
                <li v-for="(task, tIndex) in role.description" :key="tIndex">{{ task }}</li>
              </ul>
            </div>
          </template>

          <template v-else>
            <h3>{{ experience.title }}</h3>
            <span class="date-location">{{ experience.date }} — {{ experience.location }}</span>
            <p v-if="experience.description">{{ experience.description }}</p>
          </template>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import AnimatedLogo from './AnimatedLogo.vue';
import cv from '@/../public/Data.json';

export default {
  name: 'Timeline',
  components: {
    AnimatedLogo,
  },
  data() {
    return {
      timelineItems: cv.experiences,
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

/* --- Hero Section --- */
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

.resume-download-button {
  display: inline-block;
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  background-color: #0d6efd;
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  border-radius: 40px;
  font-family: 'Inter', sans-serif;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.resume-download-button:hover {
  background-color: #084298;
  transform: translateY(-2px);
}

.fade-slide-enter-active {
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-slide-enter {
  opacity: 0;
  transform: translateY(15px);
}

/* --- Timeline --- */
.timeline {
  position: relative;
  max-width: 900px;
  margin: 4rem auto;
  padding: 0 1rem;
}

.timeline-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 3rem;
  color: #42b983;
  font-weight: 700;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 4px;
  background: #42b983;
  transform: translateX(-50%);
  border-radius: 2px;
}

.timeline-item {
  position: relative;
  width: 50%;
  padding: 1rem 2rem;
  box-sizing: border-box;
}

.timeline-item .content {
  background: #f0f9f4;
  padding: 1.5rem 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(66, 185, 131, 0.15);
  position: relative;
  border-left: 5px solid #42b983;
}

.timeline-item.left {
  left: 0;
  text-align: right;
}
.timeline-item.left .content::after {
  content: '';
  position: absolute;
  top: 20px;
  right: -15px;
  border-style: solid;
  border-width: 10px 0 10px 15px;
  border-color: transparent transparent transparent #f0f9f4;
}

.timeline-item.right {
  left: 50%;
  text-align: left;
}
.timeline-item.right .content::after {
  content: '';
  position: absolute;
  top: 20px;
  left: -15px;
  border-style: solid;
  border-width: 10px 15px 10px 0;
  border-color: transparent #f0f9f4 transparent transparent;
}

.timeline-item::before {
  content: '';
  position: absolute;
  top: 20px;
  width: 16px;
  height: 16px;
  background: #42b983;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(66, 185, 131, 0.4);
  z-index: 1;
}

.timeline-item.left::before {
  right: -8px;
}
.timeline-item.right::before {
  left: -8px;
}

.company {
  font-weight: 700;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.role h3,
.timeline-item h3 {
  margin: 0.3rem 0 0.6rem;
  color: #34495e;
  font-weight: 600;
}

.date-location {
  display: block;
  font-size: 0.85rem;
  color: #7f8c8d;
  margin-bottom: 1rem;
}

ul {
  margin: 0;
  padding-left: 1.2rem;
  list-style-type: disc;
  color: #34495e;
  font-size: 0.95rem;
}

/* Responsive */
@media (max-width: 768px) {
  .timeline-item,
  .timeline-item.left,
  .timeline-item.right {
    width: 100%;
    left: 0 !important;
    text-align: left !important;
    margin-bottom: 2rem;
  }
  .timeline::before {
    left: 8px;
  }
  .timeline-item::before {
    left: 0 !important;
  }
  .timeline-item .content::after {
    display: none;
  }
}
.timeline-header {
  background: #222;
  color: #fff;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  padding: 1rem 2rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.timeline-title {
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 2.25rem;
  color: #222; /* dark, like hero header text */
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 2.5rem;
}

.timeline-header {
  background: #42b983; /* hero accent green */
  color: #fff;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  padding: 1rem 2rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-radius: 8px;
  margin-bottom: 2rem;
}
.company {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  color: #222; /* dark text */
  font-size: 1.3rem;
}

.role h3,
.timeline-item h3 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  color: #42b983; /* green accent for subheads */
}

</style>

