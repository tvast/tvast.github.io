<template>
  <section class="cta-section">
    <h2>Ready to Boost Your Project?</h2>
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
const recipientId = "theophile-vast"; // e.g., 1234567890
const linkedinUrl = `https://www.linkedin.com/messaging/compose/?recipient=${recipientId}`;
</script>

<style scoped>
.cta-section {
  text-align: center;
  margin: 3rem 0;
}

.sparkle-btn {
  position: relative;
  display: inline-block;
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
  background: linear-gradient(135deg, #ff0080, #7928ca);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.2s;
  text-decoration: none;
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