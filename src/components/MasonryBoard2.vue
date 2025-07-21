<template>
  <section class="masonry-board">
    <div v-for="item in projects" :key="item.projectId" class="masonry-item">
      <a :href="item.url" target="_blank" rel="noopener noreferrer">
        <img :src="item.screenshot" :alt="item.title" loading="lazy" />
        <h3>{{ item.title }}</h3>
      </a>
    </div>
  </section>
</template>

<script>
export default {
  name: 'MasonryBoard',
  data() {
    return {
      projects: [],
    }
  },
  async created() {
    // fetch masonry.json from public folder
    const res = await fetch('/masonry.json')
    this.projects = await res.json()
  }
}
</script>
<style scoped>
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
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
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
