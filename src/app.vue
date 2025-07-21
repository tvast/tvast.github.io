<template>
  <div class="cv-page">
    <header>
      <h1>{{ cv.name }}</h1>
      <h2>{{ cv.title }}</h2>
      <p>{{ cv.location }}</p>
    </header>

    <section>
      <h3>Expériences professionnelles</h3>
      <CvTimeline :experiences="cv.experiences" />
    </section>

    <section>
      <h3>Projets récents</h3>
      <CvMasonry :projects="projects" />
    </section>
  </div>
</template>

<script>
import cv from "@/cv.json";
import CvTimeline from "@/components/timeline.vue";
import CvMasonry from "@/components/masonry.vue";

export default {
  components: {
    CvTimeline,
    CvMasonry
  },
  data() {
    return {
      cv,
      projects: [
        {
          title: "Portfolio Galaxound",
          description: "Visualisation audio 3D via Three.js + Wavesurfer",
          link: "https://tvast.github.io/portfolio2k20/"
        },
        {
          title: "Quasar DevOps App",
          description: "Application Vue + GitLab CI/CD pour NLP",
          link: "https://github.com/tvast/nlp-quasar"
        },
        {
          title: "Amadeus Dashboard",
          description: "Dashboard d’analyse connecté à Adobe et CSV",
          link: "#"
        }
      ]
    };
  }
};
</script>

<style scoped>
.cv-page {
  max-width: 960px;
  margin: auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
}
header {
  border-bottom: 2px solid #000;
  margin-bottom: 2rem;
}
h1 {
  margin: 0;
}
section {
  margin-top: 2rem;
}
</style>

