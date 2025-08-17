<template>
  <section class="advantages-section">
    <h2>Why Choose Alien Computing?</h2>
    <div class="columns">
      <div class="column" v-for="(item, index) in advantages" :key="index">
        <h3>{{ item.title }}</h3>
        <p>{{ item.benefit }}</p>
      </div>
    </div>
    <Sparkle/>
  </section>
</template>

<script setup>
import Sparkle from './Sparkle.vue';
const advantages = [
  {
    title: "Expert Team",
    benefit: "Work with highly skilled professionals focused on delivering cutting-edge solutions."
  },
  {
    title: "Fast Delivery",
    benefit: "Projects completed efficiently without compromising quality."
  },
  {
    title: "Innovative Solutions",
    benefit: "Unique approaches tailored to each client’s needs."
  }
]
</script>

<style scoped>
.advantages-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.columns {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 2rem;
}

.column {
  flex: 1;
  min-width: 250px;
  background: #f5f5f5;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.column h3 {
  margin-bottom: 1rem;
  color: #2c3e50;
}

.column p {
  color: #555;
}
</style>