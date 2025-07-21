<template>
  <div class="masonry">
    <div v-for="(project, i) in projects" :key="i" class="masonry-item">
      <h4>{{ project.title }}</h4>
      <p>{{ project.description }}</p>
      <a :href="project.link" target="_blank">Voir le projet</a>
    </div>
  </div>
</template>

<script>
export default {
  props: ["projects"]
};
</script>

<style scoped>
.masonry {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.masonry-item {
  background: #f3f3f3;
  padding: 1rem;
  flex: 1 1 calc(33% - 1rem);
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
.masonry-item a {
  display: inline-block;
  margin-top: 0.5rem;
  color: #333;
  text-decoration: underline;
}
@media (max-width: 768px) {
  .masonry-item {
    flex: 1 1 100%;
  }
}
</style>

