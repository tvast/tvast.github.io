<template>
  <div class="timeline-root">
    <h2 class="timeline-title">{{ title }}</h2>
    <div class="timeline">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="timeline-item"
      >
        <div class="dot"></div>
        <div class="content">
          <h3>{{ item.title }}</h3>
          <p class="meta">
            {{ item.subtitle }} – {{ item.dates }}
          </p>
          <ul v-if="item.details && item.details.length">
            <li v-for="(point, idx) in item.details" :key="idx">{{ point }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimelineRoot',
  props: {
    title: String,
    items: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.timeline-root {
  margin: 2rem 0;
}
.timeline-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
.timeline {
  border-left: 3px solid var(--color-accent, #ccc);
  padding-left: 1rem;
}
.timeline-item {
  position: relative;
  margin-bottom: 1.5rem;
}
.timeline-item .dot {
  position: absolute;
  left: -10px;
  top: 0.3rem;
  width: 10px;
  height: 10px;
  background: var(--color-accent, #ccc);
  border-radius: 50%;
}
.content h3 {
  margin: 0;
  font-weight: 600;
}
.content .meta {
  font-size: 0.9rem;
  color: var(--color-secondary, #666);
}
.content ul {
  margin: 0.5rem 0 0 1rem;
}
</style>

