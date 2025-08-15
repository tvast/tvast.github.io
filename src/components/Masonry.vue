<template>
  <section class="masonry">
    <!-- Masonry Grid -->
    <div v-for="(item, index) in projects" :key="item.projectId" class="item" @click="openLightbox(index)">
      <img :src="item.screenshot" :alt="item.title" loading="lazy" />
      <p>{{ item.title }}</p>
    </div>

    <!-- Lightbox -->
    <div v-if="lightboxVisible" class="lightbox" @click.self="closeLightbox">
      <span class="close" @click="closeLightbox">&times;</span>
      <span class="nav left" @click.stop="prevImage">&#10094;</span>
      <img class="lightbox-img" :src="projects[currentIndex].screenshot" :alt="projects[currentIndex].title" />
      <span class="nav right" @click.stop="nextImage">&#10095;</span>
      <p class="caption">
        <a :href="projects[currentIndex].url" target="_blank" rel="noopener">{{ projects[currentIndex].title }}</a>
      </p>
    </div>
  </section>
</template>

<script>
import projectsData from '../assets/masonry.json';

export default {
  name: 'Masonry',
  data() {
    return {
      projects: projectsData, // use imported JSON directly
      lightboxVisible: false,
      currentIndex: 0
    };
  },
  methods: {
    openLightbox(index) {
      this.currentIndex = index;
      this.lightboxVisible = true;
    },
    closeLightbox() {
      this.lightboxVisible = false;
    },
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.projects.length;
    },
    prevImage() {
      this.currentIndex = (this.currentIndex - 1 + this.projects.length) % this.projects.length;
    },
    handleKey(e) {
      if (!this.lightboxVisible) return;
      if (e.key === 'ArrowRight') this.nextImage();
      if (e.key === 'ArrowLeft') this.prevImage();
      if (e.key === 'Escape') this.closeLightbox();
    }
  },
  mounted() {
    window.addEventListener('keydown', this.handleKey);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKey);
  },
  watch: {
    currentIndex(newIndex) {
      // Preload next/prev images
      const next = (newIndex + 1) % this.projects.length;
      const prev = (newIndex - 1 + this.projects.length) % this.projects.length;
      [next, prev].forEach(i => {
        const img = new Image();
        img.src = this.projects[i].screenshot;
      });
    }
  }
};
</script>

<style scoped>
/* Masonry Layout */
.masonry {
    column-count: 3;
    column-gap: 1rem;
    max-width: 1200px;
    margin: 0 auto;
}

.item {
    display: inline-block;
    background: #fff;
    margin: 0 0 1rem;
    width: 100%;
    box-sizing: border-box;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    cursor: zoom-in;
    transition: transform 0.2s ease;
}

.item:hover {
    transform: scale(1.03);
}

.item img {
    max-width: 100%;
    display: block;
    border-bottom: 1px solid #eee;
}

.item p {
    padding: 0.5rem 1rem;
    font-size: 14px;
    color: #333;
}

/* Lightbox */
.lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    z-index: 1000;
}

.lightbox-img {
    max-width: 90%;
    max-height: 80%;
}

.close {
    position: absolute;
    top: 1rem;
    right: 2rem;
    font-size: 3rem;
    color: white;
    cursor: pointer;
}

.nav {
    position: absolute;
    top: 50%;
    font-size: 3rem;
    color: white;
    cursor: pointer;
    padding: 0 1rem;
    user-select: none;
}

.nav.left {
    left: 1rem;
}

.nav.right {
    right: 1rem;
}

.caption {
    margin-top: 1rem;
    color: #ccc;
    font-size: 1rem;
}

/* Responsive */
@media (max-width: 900px) {
    .masonry {
        column-count: 2;
    }
}

@media (max-width: 600px) {
    .masonry {
        column-count: 1;
    }
}
</style>