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
  "Créativité : proposer des solutions innovantes et surprenantes.",
  "Bonne énergie : créer une ambiance positive dans l’équipe et les projets.",
  "Expertise technique : maîtrise des technologies modernes (Vue, Three.js, Firebase…).",
  "Polyvalence : passer facilement de la vision globale aux détails précis.",
  "Esprit collaboratif : favoriser le partage, la clarté et la communication.",
  "Autonomie : capable de gérer les projets de manière indépendante et responsable."
];

const advantagesEN = [
  "Creativity: delivering fresh, innovative, and surprising solutions.",
  "Positive energy: keeping a good atmosphere in the team and projects.",
  "Technical expertise: strong knowledge of modern technologies (Vue, Three.js, Firebase…).",
  "Versatility: easily switching between big-picture thinking and detailed work.",
  "Collaborative spirit: promoting sharing, clarity, and communication.",
  "Autonomy: able to handle projects independently and responsibly."
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
  max-width: 900px;
  margin: 3rem auto;
  padding: 2rem;
  font-family: system-ui, sans-serif;
  line-height: 1.6;
  background: rgba(255, 255, 255, 0.07);
  border-radius: 1.25rem;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(8px);
}

.advantages h2 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: clamp(1.5rem, 2vw, 2.25rem);
  font-weight: 700;
  color: #222;
}

.advantages ul {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 0;
  list-style: none;
}

.advantages li {
  background: rgba(0, 0, 0, 0.05);
  padding: 1rem 1.25rem;
  border-radius: 0.75rem;
  position: relative;
  font-size: clamp(0.95rem, 1.2vw, 1.1rem);
}

.advantages li::before {
  content: "✨";
  position: absolute;
  left: -1.8rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
}

.lang-btn {
  display: block;
  margin: 2rem auto 0;
  padding: 0.6rem 1.25rem;
  border: none;
  border-radius: 0.6rem;
  background: #222;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s, background 0.2s;
}
.lang-btn:hover {
  background: #444;
  transform: translateY(-2px);
}

@media (min-width: 640px) {
  .advantages ul {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1024px) {
  .advantages ul {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>