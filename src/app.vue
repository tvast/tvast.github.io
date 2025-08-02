<template>
  <div :class="currentTheme" id="app" class="min-h-screen bg-black text-white overflow-hidden">
    <!-- Hero Section -->
    <HeroSection />

    <!-- Theme Switcher -->
    <div class="flex space-x-4 my-4 justify-center">
      <button @click="setTheme('dark')" class="px-4 py-2 bg-gray-800 rounded">Dark</button>
      <button @click="setTheme('grey')" class="px-4 py-2 bg-gray-500 rounded">Grey</button>
      <button @click="setTheme('pink')" class="px-4 py-2 bg-pink-500 rounded">Pink</button>
    <AIPrompt/>
    
    </div>

    <!-- Timeline & Masonry -->
    <Timeline />
    <MasonryBoard />

    <!-- Timeline Sections -->
    <TimelineRoot title="Work Experience" :items="experience" />
    <TimelineRoot title="Education" :items="education" />

    <!-- Profile Card -->
    <div class="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6 text-black my-12">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 class="text-3xl font-bold">{{ profile.name }}</h1>
          <p class="text-lg text-gray-600">{{ profile.title }}</p>
          <p class="text-sm text-gray-500">{{ profile.location }}</p>
        </div>
        <div class="mt-4 md:mt-0 space-y-1">
          <p>📞 {{ profile.contact.phone }}</p>
          <p>✉️ <a :href="'mailto:' + profile.contact.email" class="text-blue-500">{{ profile.contact.email }}</a></p>
          <p>🔗 <a :href="profile.contact.linkedin" target="_blank" class="text-blue-500">LinkedIn</a></p>
          <p>🌐 <a :href="profile.contact.portfolio" target="_blank" class="text-blue-500">Portfolio</a></p>
        </div>
      </div>

      <!-- Summary -->
      <div>
        <h2 class="text-xl font-semibold">Summary</h2>
        <p class="text-gray-700">{{ profile.summary }}</p>
      </div>

      <!-- Skills -->
      <div>
        <h2 class="text-xl font-semibold">Skills</h2>
        <ul class="list-disc list-inside text-gray-700">
          <li v-for="skill in profile.skills" :key="skill">{{ skill }}</li>
        </ul>
      </div>

      <!-- Languages -->
      <div>
        <h2 class="text-xl font-semibold">Languages</h2>
        <ul class="list-disc list-inside text-gray-700">
          <li v-for="lang in profile.languages" :key="lang.name">
            {{ lang.name }} — {{ lang.level }}
          </li>
        </ul>
      </div>

      <!-- Certifications & Awards -->
      <div class="flex flex-col md:flex-row md:space-x-12">
        <div>
          <h2 class="text-xl font-semibold">Certifications</h2>
          <ul class="list-disc list-inside text-gray-700">
            <li v-for="cert in profile.certifications" :key="cert">{{ cert }}</li>
          </ul>
        </div>
        <div>
          <h2 class="text-xl font-semibold">Awards</h2>
          <ul class="list-disc list-inside text-gray-700">
            <li v-for="award in profile.awards" :key="award">{{ award }}</li>
          </ul>
        </div>
      </div>

      <!-- Experience -->
      <div>
        <h2 class="text-xl font-semibold">Experience</h2>
        <div v-for="exp in profile.experiences" :key="exp.company + exp.title" class="mb-6">
          <h3 class="text-lg font-bold">{{ exp.title }}</h3>
          <p class="text-gray-600">{{ exp.company }} — {{ exp.location }} ({{ exp.date }})</p>
          <ul v-if="exp.description.length" class="list-disc list-inside text-gray-700 mt-2">
            <li v-for="desc in exp.description" :key="desc">{{ desc }}</li>
          </ul>
        </div>
      </div>

      <!-- Education -->
      <div>
        <h2 class="text-xl font-semibold">Education</h2>
        <div v-for="edu in profile.education" :key="edu.school + (edu.degree || edu.field)" class="mb-4">
          <h3 class="text-lg font-bold">{{ edu.school }}</h3>
          <p class="text-gray-600">
            {{ edu.degree ? edu.degree + ', ' : '' }}{{ edu.field }}
            ({{ edu.years || edu.year }})
          </p>
        </div>
      </div>
    </div>

    <!-- Orbital Navigation Mock -->
    <section class="flex flex-col justify-center items-center h-screen">
      <div class="animate-pulse text-4xl mb-8">[ Orbital Navigation Coming Soon ]</div>
    </section>
  </div>
</template>

<script>
import HeroSection from './components/HeroSection.vue';
import TimelineRoot from './components/TimelineRoot.vue';
import Timeline from './components/Timeline.vue';
import MasonryBoard from './components/MasonryBoard.vue';
import DataForloop from '../public/Data.json'
import AIPrompt from './components/AI-Prompt.vue';
export default {
  name: 'App',
  components: {
    HeroSection,
    TimelineRoot,
    Timeline,
    MasonryBoard,
    AIPrompt
  },
  data() {
    return {
      currentTheme: 'dark',
      sections: [],
      experience: DataForloop,
      education: [
        { title: 'SUP\'Internet', date: '2011 - 2013', location: 'Paris', description: 'Bachelor\'s degree in Development' },
      ],
      profile: {
        name: "Theophile Vast",
        title: "Web Dev ✦ UI/UX ✦ Prompt Engineer Junior",
        location: "Montpellier, Occitanie, France",
        contact: {
          phone: "0698758226",
          email: "theophile.vast@gmail.com",
          linkedin: "https://www.linkedin.com/in/theophile-vast",
          portfolio: "https://tvast.github.io/portfolio2k20"
        },
        skills: ["Intelligence artificielle (IA)", ".NET Framework", "Restauration fine"],
        languages: [
          { name: "Français", level: "Native or Bilingual" },
          { name: "Anglais", level: "Full Professional" },
          { name: "Espagnol", level: "Professional Working" },
          { name: "Italien", level: "Limited Working" }
        ],
        certifications: ["OSPG certification"],
        awards: ["Hackathon Nao"],
        summary: "Lead dev avec background DevOps. Spécialisé en Vue.js, CI/CD, Docker, et automatisation d'infrastructure.",
        experiences: [
          // Full experience list as you have it...
        ],
        education: [
          {
            school: "SUP'Internet",
            degree: "Bachelor's degree",
            field: "Développement informatique",
            years: "2011 - 2013"
          }
        ]
      }
    };
  },
  methods: {
    setTheme(theme) {
      this.currentTheme = theme;
    }
  }
};
</script>
<style scoped>
:root {
  --background-color: #fff;
  --text-color: #000;
  --primary-color: #42b983;
}
.theme-dark {
  --background-color: #121212;
  --text-color: #e0e0e0;
  --primary-color: #42b983;
}
.theme-grey {
  --background-color: #f5f5f5;
  --text-color: #333333;
  --primary-color: #666666;
}
.theme-pink {
  --background-color: #ffe4e6;
  --text-color: #5a2a2a;
  --primary-color: #d6336c;
}
div#app {
  background-color: var(--background-color);
  color: var(--text-color);
  min-height: 100vh;
  transition: background-color 0.3s ease, color 0.3s ease;
}
header {
  padding: 1rem;
  text-align: center;
  background-color: var(--background-color);
  border-bottom: 1px solid var(--primary-color);
  margin-bottom: 1rem;
}
button {
  background-color: var(--primary-color);
  border: none;
  color: var(--text-color);
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
button:hover {
  opacity: 0.85;
}
section {
  padding: 2rem;
  border-top: 1px dashed var(--primary-color);
}
.theme-dark {
  --color-accent: #00bcd4;
  --color-secondary: #aaa;
  background: #121212;
  color: #fff;
}
.theme-light {
  --color-accent: #607d8b;
  --color-secondary: #444;
  background: #f4f4f4;
  color: #000;
}
.theme-pink {
  --color-accent: #e91e63;
  --color-secondary: #880e4f;
  background: #fff0f6;
  color: #2c003e;
}
</style>