<template>
  <div class="timeline-carousel">
    <div v-if="timeline.length" class="carousel">
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
    <p v-else class="empty-message">Timeline is loading or empty...</p>

    <!-- Initial user gesture -->
    <div v-if="!userInteracted" class="overlay">
      <button @click="startAudio">Start Experience</button>
    </div>

    <audio ref="audioFile" loop preload="auto">
      <source :src="song" type="audio/mp3" />
    </audio>
  </div>
</template>

<script>
export default {
  name: "Timeline",
  data() {
    return {
      timeline: [],
      userInteracted: false,
      isPlaying: false,
      song:"Canceinterlude.flac"
    };
  },
 
  mounted() {
    window.addEventListener("scroll", this.handleScrollPlayback);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScrollPlayback);
  },
  methods: {
    startAudio() {
      const audio = this.$refs.audioFile;
      audio.play().then(() => {
        this.userInteracted = true;
        this.isPlaying = true;
      }).catch(err => {
        console.warn("Playback failed:", err);
      });
    },
    handleScrollPlayback() {
      if (!this.userInteracted) return;
      const audio = this.$refs.audioFile;
      if (!this.isPlaying && window.scrollY > 50) {
        audio.play();
        this.isPlaying = true;
      } else if (this.isPlaying && window.scrollY <= 50) {
        audio.pause();
        this.isPlaying = false;
      }
    },startAudio() {
  const audio = this.$refs.audioFile;
  audio.load();
  audio.play()
    .then(() => {
      this.userInteracted = true;
      this.isPlaying = true;
    })
    .catch(err => console.warn("Playback failed:", err));
}
  }
};
</script>

<style scoped>
.timeline-carousel {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
}

.carousel {
  display: flex;
  overflow-x: auto;
  gap: 1rem;
  padding-bottom: 1rem;
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
.carousel-card:hover { transform: scale(1.05); }

.icon { font-size: 2rem; margin-bottom: 0.5rem; }
.title { font-weight: bold; font-size: 1.2rem; margin: 0.2rem 0; }
.subtitle { font-size: 0.9rem; color: #333; margin-bottom: 0.5rem; }
ul { padding-left: 1rem; }
li { margin-bottom: 0.3rem; }
.empty-message { color: #999; font-style: italic; }

.overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.8);
  display: flex; align-items: center; justify-content: center;
  z-index: 999;
}
.overlay button {
  background: #00ff80;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 1rem;
  cursor: pointer;
}
</style>