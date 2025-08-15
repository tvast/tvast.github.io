<template>
  <div v-if="timelineData.length" :class="['timeline-container', currentEvent.era]">
    <!-- Timeline Header -->
    <div class="timeline-header">
      <h2 class="timeline-title">Career Timeline</h2>
      <p class="timeline-subtitle">Professional experiences and roles</p>
    </div>

    <!-- Timeline Content -->
    <div class="timeline-content-wrapper">
      <div class="timeline-content">
        <div
          class="event-icon"
          :class="{ fadeOut: isFading }"
          v-html="currentEventIcon"
        ></div>
        <div class="event-year" :class="{ fadeOut: isFading }">
          {{ currentEvent.date || currentEvent.year }}
        </div>
        <div class="event-company" :class="{ fadeOut: isFading }">
          {{ currentEvent.company }}
        </div>
        <div class="event-description" :class="{ fadeOut: isFading }">
          <ul v-if="currentEvent.description && currentEvent.description.length">
            <li v-for="(item, idx) in currentEvent.description" :key="idx">
              {{ item }}
            </li>
          </ul>
          <span v-else>{{ currentEvent.title || '' }}</span>
        </div>
      </div>
    </div>

    <!-- Timeline Slider -->
    <div class="slider-container">
      <input
        type="range"
        class="timeline-slider"
        min="0"
        :max="timelineData.length - 1"
        v-model.number="currentIndex"
        @input="onSliderInput"
      />
      <div class="slider-track">
        <div
          v-for="(event, i) in timelineData"
          :key="i"
          class="tick"
          :class="{ active: i === currentIndex }"
          :style="{ left: `${(i / (timelineData.length - 1)) * 100}%` }"
        ></div>
      </div>

      <!-- <div class="year-labels">
        <span
          v-for="(event, idx) in visibleLabels"
          :key="idx"
          class="year-label"
          :class="{ active: (idx + visibleStart) === currentIndex }"
          :style="{ left: `${((idx + visibleStart) / (timelineData.length - 1)) * 100}%` }"
        >
          {{ event.date || event.year }}
        </span>
      </div> -->

      <div class="progress-fill" :style="{ width: progress + '%' }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Timeline",
  props: {
    cv: { type: Object, required: true }
  },
  data() {
    return {
      currentIndex: 0,
      autoPlayInterval: null,
      isFading: false,
      visibleStart: 0
    };
  },
  computed: {
    timelineData() {
      const flattened = [];
      this.cv.experiences.forEach(exp => {
        if (exp.roles) {
          exp.roles.forEach(role => {
            flattened.push({
              ...role,
              company: exp.company,
              era: this.getEra(role.date),
              icon: this.getIcon(role.title)
            });
          });
        } else {
          flattened.push({
            ...exp,
            era: this.getEra(exp.date),
            icon: this.getIcon(exp.title)
          });
        }
      });
      return flattened;
    },
    currentEvent() {
      return this.timelineData[this.currentIndex] || {};
    },
    currentEventIcon() {
      return this.currentEvent.icon
        ? `<i class="fa-solid ${this.currentEvent.icon}"></i>`
        : "<i class='fa-solid fa-briefcase'></i>";
    },
    progress() {
      return this.timelineData.length
        ? (this.currentIndex / (this.timelineData.length - 1)) * 100
        : 0;
    },
    visibleLabels() {
      const windowSize = 5;
      const start = Math.max(0, this.currentIndex - Math.floor(windowSize / 2));
      const end = Math.min(this.timelineData.length, start + windowSize);
      this.visibleStart = start;
      return this.timelineData.slice(start, end);
    }
  },
  methods: {
    getEra(date) {
      if (!date) return "era-modern";
      const year = parseInt(date.slice(-4));
      if (year < 2000) return "era-early-web";
      if (year < 2005) return "era-dot-com";
      if (year < 2010) return "era-social-media";
      if (year < 2015) return "era-mobile";
      if (year < 2025) return "era-modern";
      return "era-future-tech";
    },
    getIcon(title) {
      if (!title) return "fa-briefcase";
      if (/developer/i.test(title)) return "fa-code";
      if (/architect/i.test(title)) return "fa-brain";
      if (/manager/i.test(title)) return "fa-users";
      if (/engineer/i.test(title)) return "fa-cogs";
      return "fa-briefcase";
    },
    updateTimeline(index) {
      if (index === this.currentIndex) return;
      this.isFading = true;
      setTimeout(() => {
        this.currentIndex = index;
        this.isFading = false;
      }, 300);
    },
    onSliderInput() { this.stopAutoPlay(); },
    startAutoPlay() {
      this.stopAutoPlay();
      this.autoPlayInterval = setInterval(() => {
        const nextIndex = (this.currentIndex + 1) % this.timelineData.length;
        this.updateTimeline(nextIndex);
      }, 4000);
    },
    stopAutoPlay() {
      if (this.autoPlayInterval) clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  },
  mounted() { setTimeout(() => this.startAutoPlay(), 2000); },
  beforeUnmount() { this.stopAutoPlay(); }
};
</script>

<style scoped>
* { margin:0; padding:0; box-sizing:border-box; }
body { }

.timeline-container {
  font-family: 'Roboto'  , sans-serif !important;
  width: 100%;
  background: rgba(255,255,255,0.95);
  border-radius: 20px;
  padding: 4rem 2rem;
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
  border: 1px solid rgba(226,232,240,0.8);
  backdrop-filter: blur(10px);
  text-align: center;
}

.timeline-content-wrapper {
  width: 100%;
  display: flex;
  overflow-x: hidden; /* hide overflowing content */
  justify-content: center; /* center the active panel */
}

.timeline-container {
      min-width: -webkit-fill-available;
  flex: 0 0 100%; /* make each panel full width of container */
  max-width: 100%; /* prevent shrinking */
  padding: 2rem;
  margin: 0; /* remove left/right spacing */
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

/* Add your previous slider, ticks, year-label, era, and responsive CSS here */

</style>