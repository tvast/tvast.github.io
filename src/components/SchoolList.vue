<template>
  <div class="school-list">
    <div v-for="(school, index) in education" :key="index" class="school-card">
      <h3>{{ school.school }}</h3>
      <p v-if="school.degree">{{ school.degree }}</p>
      <p>{{ school.field }}</p>
      <p>{{ school.year || school.years }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SchoolList',
  props: {
    education: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.school-card {
  border-left: 4px solid #42b983;
  padding: 1rem;
  margin-bottom: 1rem;
}
</style>

