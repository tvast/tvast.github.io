<template>
  <section class="timeline">
    <h2 class="timeline-title">Experience Timeline</h2>
    <div
      v-for="(experience, index) in timelineItems"
      :key="index"
      :class="['timeline-item', index % 2 === 0 ? 'left' : 'right']"
    >
      <div class="content">
        <div class="company">{{ experience.company }}</div>

        <template v-if="experience.roles">
          <div
            v-for="(role, i) in experience.roles"
            :key="i"
            class="role"
          >
            <h3>{{ role.title }}</h3>
            <span class="date-location">{{ role.date }} — {{ role.location }}</span>
            <ul v-if="role.description && Array.isArray(role.description)">
              <li v-for="(task, tIndex) in role.description" :key="tIndex">{{ task }}</li>
            </ul>
          </div>
        </template>

        <template v-else>
          <h3>{{ experience.title }}</h3>
          <span class="date-location">{{ experience.date }} — {{ experience.location }}</span>
          <p v-if="experience.description">{{ experience.description }}</p>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
import cv from '@/../public/cv.json'

export default {
  name: 'Timeline',
  data() {
    return {
      timelineItems: cv.experiences
    }
  }
}
</script>

<style scoped>
.timeline {
  position: relative;
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.timeline-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 3rem;
  color: #42b983;
  font-weight: 700;
}

/* vertical line */
.timeline::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 4px;
  background: #42b983;
  transform: translateX(-50%);
  border-radius: 2px;
}

/* timeline item base */
.timeline-item {
  position: relative;
  width: 50%;
  padding: 1rem 2rem;
  box-sizing: border-box;
}

.timeline-item .content {
  background: #f0f9f4;
  padding: 1.5rem 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(66, 185, 131, 0.15);
  position: relative;
  border-left: 5px solid #42b983;
}

/* left side items */
.timeline-item.left {
  left: 0;
  text-align: right;
}

/* left side arrow */
.timeline-item.left .content::after {
  content: '';
  position: absolute;
  top: 20px;
  right: -15px;
  border-style: solid;
  border-width: 10px 0 10px 15px;
  border-color: transparent transparent transparent #f0f9f4;
}

/* right side items */
.timeline-item.right {
  left: 50%;
  text-align: left;
}

/* right side arrow */
.timeline-item.right .content::after {
  content: '';
  position: absolute;
  top: 20px;
  left: -15px;
  border-style: solid;
  border-width: 10px 15px 10px 0;
  border-color: transparent #f0f9f4 transparent transparent;
}

/* circle on the line */
.timeline-item::before {
  content: '';
  position: absolute;
  top: 20px;
  width: 16px;
  height: 16px;
  background: #42b983;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(66, 185, 131, 0.4);
  z-index: 1;
}

/* position circle on left or right side */
.timeline-item.left::before {
  right: -8px;
}

.timeline-item.right::before {
  left: -8px;
}

/* company styling */
.company {
  font-weight: 700;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

/* role titles */
.role h3,
.timeline-item h3 {
  margin: 0.3rem 0 0.6rem;
  color: #34495e;
  font-weight: 600;
}

/* date and location */
.date-location {
  display: block;
  font-size: 0.85rem;
  color: #7f8c8d;
  margin-bottom: 1rem;
}

/* tasks list */
ul {
  margin: 0;
  padding-left: 1.2rem;
  list-style-type: disc;
  color: #34495e;
  font-size: 0.95rem;
}

/* responsive */
@media (max-width: 768px) {
  .timeline-item,
  .timeline-item.left,
  .timeline-item.right {
    width: 100%;
    left: 0 !important;
    text-align: left !important;
    margin-bottom: 2rem;
  }
  .timeline::before {
    left: 8px;
  }
  .timeline-item::before {
    left: 0 !important;
  }
  .timeline-item .content::after {
    display: none;
  }
}
</style>

