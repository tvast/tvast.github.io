<template>
  <div class="timeline">
    <div v-for="(exp, i) in experiences" :key="i" class="timeline-item">
      <div class="timeline-marker"></div>
      <div class="timeline-content">
        <h3>{{ exp.company }}</h3>
        <h4>{{ exp.title || exp.roles?.[0]?.title }}</h4>
        <p class="date">{{ exp.date }} - {{ exp.location }}</p>
        <ul v-if="exp.description">
          <li v-for="(desc, j) in exp.description" :key="j">{{ desc }}</li>
        </ul>
        <div v-if="exp.roles">
          <div v-for="(role, k) in exp.roles" :key="k">
            <strong>{{ role.title }}</strong> ({{ role.date }})
            <ul>
              <li v-for="(desc, d) in role.description" :key="d">{{ desc }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["experiences"]
};
</script>

<style scoped>
.timeline {
  position: relative;
  margin: 2rem 0;
  padding-left: 2rem;
  border-left: 2px solid #555;
}
.timeline-item {
  margin-bottom: 2rem;
  position: relative;
}
.timeline-marker {
  width: 14px;
  height: 14px;
  background-color: #333;
  border-radius: 50%;
  position: absolute;
  left: -9px;
  top: 4px;
}
.timeline-content {
  margin-left: 1rem;
}
.date {
  font-size: 0.9rem;
  color: gray;
}
</style>

