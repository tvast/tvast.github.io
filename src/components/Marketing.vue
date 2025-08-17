<template>
  <section class="advantages">
    <h2>{{ lang === 'fr' ? "Mes atouts" : "My Advantages" }}</h2>

    <ul>
      <li v-for="(adv, index) in currentAdvantages" :key="index">
        {{ adv }}
      </li>
    </ul>

    <button class="lang-btn" @click="toggleLang">
      {{ lang === "fr" ? "🇬🇧 English" : "🇫🇷 Français" }}
    </button>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";

const lang = ref("en"); // default

const advantagesFR = [
  "Créativité : trouver des solutions innovantes et surprenantes.",
  "Bonne énergie : créer une ambiance positive dans l’équipe et les projets.",
  "Expertise technique : maîtrise des technologies modernes (Vue, Three.js, Firebase...).",
  "Polyvalence : capacité à passer de la vision globale aux détails précis.",
  "Esprit collaboratif : favoriser le partage, la clarté et la communication."
];

const advantagesEN = [
  "Creativity: bringing fresh, innovative, and surprising solutions.",
  "Good vibes: keeping a positive atmosphere within the team and projects.",
  "Technical expertise: strong knowledge of modern stacks (Vue, Three.js, Firebase...).",
  "Versatility: able to switch from big-picture thinking to precise details.",
  "Collaborative spirit: promoting sharing, clarity, and communication."
];

const currentAdvantages = computed(() =>
  lang.value === "fr" ? advantagesFR : advantagesEN
);

function toggleLang() {
  lang.value = lang.value === "fr" ? "en" : "fr";
}
</script>

<style scoped>
.advantages {
  max-width: 700px;
  margin: 2rem auto;
  padding: 1.5rem;
  font-family: system-ui, sans-serif;
  line-height: 1.6;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.advantages h2 {
  text-align: center;
  margin-bottom: 1rem;
}

.advantages ul {
  list-style: none;
  padding: 0;
}

.advantages li {
  margin: 0.5rem 0;
  padding-left: 1rem;
  position: relative;
}

.advantages li::before {
  content: "✨";
  position: absolute;
  left: -1.5rem;
}

.lang-btn {
  display: block;
  margin: 1.5rem auto 0;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  background: #333;
  color: #fff;
  cursor: pointer;
  transition: background 0.2s;
}
.lang-btn:hover {
  background: #555;
}
</style>