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
.masonry-board {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-gap: 16px;
  padding: 16px;
}

.masonry-item {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
}

.masonry-item:hover {
  transform: translateY(-6px);
  box-shadow: 0 15px 25px rgba(0,0,0,0.2);
}

.masonry-item img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

.masonry-item h3 {
  margin: 12px;
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  text-align: center;
}
</style>

