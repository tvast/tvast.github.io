<template>
  <div>
    <h1>{{ cv.name }}</h1>
    <h2>{{ cv.title }}</h2>
    <p>{{ cv.location }}</p>

    <section>
      <h3>Contact</h3>
      <ul>
        <li>Email: {{ cv.contact.email }}</li>
        <li>Phone: {{ cv.contact.phone }}</li>
        <li><a :href="cv.contact.linkedin">LinkedIn</a></li>
        <li><a :href="cv.contact.portfolio">Portfolio</a></li>
      </ul>
    </section>

    <section>
      <h3>Expériences</h3>
      <div v-for="(exp, i) in cv.experiences" :key="i">
        <h4>{{ exp.company }} - {{ exp.title || exp.roles?.[0]?.title }}</h4>
        <p>{{ exp.date }} - {{ exp.location }}</p>
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
    </section>
  </div>
</template>

<script>
import cv from "@/assets/cv.json"; // Place le fichier json dans /assets

export default {
  data() {
    return {
      cv
    };
  }
};
</script>

