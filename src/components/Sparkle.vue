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

    <!-- Sparkle CTA Button -->
    <a
      :href="linkedinUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="sparkle-btn"
    >
      Choose Alien Computing
      <span class="sparkle"></span>
      <span class="sparkle"></span>
      <span class="sparkle"></span>
      <span class="sparkle"></span>
    </a>
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

// CTA Link
const recipientId = "theophile-vast";
const linkedinUrl = `https://www.linkedin.com/messaging/compose/?recipient=${recipientId}`;
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
  text-align: center;
}

.advantages h2 {
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
  margin: 1.5rem auto 1rem;
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

/* Sparkle button styles */
.sparkle-btn {
  position: relative;
  display: inline-block;
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
  background: linear-gradient(135deg, #ff0080, #7928ca);
  border-radius: 12px;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.2s;
  text-decoration: none;
  margin-top: 1rem;
}

.sparkle-btn:hover {
  transform: scale(1.05);
}

.sparkle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: white;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  pointer-events: none;
  animation: sparkle-animation 1.5s linear infinite;
}

.sparkle:nth-child(1) { animation-delay: 0s; }
.sparkle:nth-child(2) { animation-delay: 0.4s; }
.sparkle:nth-child(3) { animation-delay: 0.8s; }
.sparkle:nth-child(4) { animation-delay: 1.2s; }

@keyframes sparkle-animation {
  0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
  25% { transform: translate(calc(-50% + 20px), calc(-50% - 20px)) scale(1); opacity: 0.8; }
  50% { transform: translate(calc(-50% - 25px), calc(-50% + 15px)) scale(0.5); opacity: 0.6; }
  75% { transform: translate(calc(-50% + 15px), calc(-50% + 25px)) scale(1); opacity: 0.8; }
  100% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
}
</style>