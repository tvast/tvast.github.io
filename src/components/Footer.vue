<template>
  <footer class="deep-sea-footer">
    <div class="sea">
      <!-- Creatures -->
      <div class="fish">🐟</div>
      <div class="fish">🐠</div>
      <div class="fish">🐡</div>
      <div class="squid">🦑</div>
      <div class="crab">🦀</div>
      <div class="whale">🐋</div>
      <!-- Volcano -->
      <div class="volcano">
        <div class="lava"></div>
        <div class="lava"></div>
        <div class="lava"></div>
      </div>
      <!-- Bubbles -->
      <div v-for="n in 10" :key="n" class="bubble"></div>
    </div>
    <p class="footer-text">© 2025 Alien Computing | Theophile Vast — Deep Sea Mode 🌊</p>
  </footer>
</template>

<script>
export default {
  name: "DeepSeaFooter",
};
</script>

<style scoped>

/* Volcano */
.volcano {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 40px;
  background: #4b2e2e;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  z-index: 1;
}

.lava {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 10px;
  height: 10px;
  background: linear-gradient(45deg, #ff5f00, #ffdd00);
  border-radius: 50%;
  animation: erupt 2s infinite ease-in;
}

.lava:nth-child(2) {
  animation-delay: 0.5s;
  width: 14px; height: 14px;
}
.lava:nth-child(3) {
  animation-delay: 1s;
  width: 12px; height: 12px;
}

@keyframes erupt {
  0% { transform: translate(-50%, 0) scale(1); opacity: 1; }
  50% { transform: translate(-50%, -50px) scale(1.3); opacity: 0.7; }
  100% { transform: translate(-50%, -100px) scale(0.8); opacity: 0; }
}
.deep-sea-footer {
  position: relative;
  width: 100%;
  background: linear-gradient(to top, #001220, #002b45);
  color: #fff;
  text-align: center;
  padding: 2rem 1rem 4rem;
  overflow: hidden;
  font-family: "Inter", sans-serif;
}

.footer-text {
  margin-top: 2rem;
  font-size: 0.9rem;
  color: #a5cbe4;
  z-index: 2;
  position: relative;
}

/* Sea container */
.sea {
  position: relative;
  width: 100%;
  height: 150px;
  overflow: hidden;
}

/* Creatures base */
.fish,
.squid,
.crab,
.whale {
  position: absolute;
  font-size: 2rem;
  opacity: 0.9;
  white-space: nowrap;
  animation-timing-function: linear;
}

/* Fish positions & durations */
.fish:nth-child(1) { top: 10px; left: -50px; animation: swim-bob 12s linear infinite; }
.fish:nth-child(2) { top: 40px; left: -80px; animation: swim-bob 18s linear infinite; }
.fish:nth-child(3) { top: 70px; left: -100px; animation: swim-bob 15s linear infinite; }

/* Squid */
.squid { bottom: -20px; left: -120px; font-size: 2.5rem; animation: swim-bob 20s linear infinite; }

/* Crab walks along bottom */
.crab { bottom: 0; left: -60px; font-size: 1.8rem; animation: swim-bob 25s linear infinite; }

/* Whale big & slow */
.whale { top: 20px; left: -200px; font-size: 3rem; animation: swim-bob 30s linear infinite; }

/* Swimming + bobbling animation */
@keyframes swim-bob {
  0% { transform: translateX(0) translateY(0) rotate(0deg); }
  25% { transform: translateX(25vw) translateY(-10px) rotate(-5deg); }
  50% { transform: translateX(50vw) translateY(5px) rotate(5deg); }
  75% { transform: translateX(75vw) translateY(-5px) rotate(-3deg); }
  100% { transform: translateX(120vw) translateY(0) rotate(0deg); }
}

/* Bubbles */
.bubble {
  position: absolute;
  bottom: 0;
  width: 6px;
  height: 6px;
  background: rgba(173, 216, 230, 0.7);
  border-radius: 50%;
  animation: rise-bob linear infinite;
  opacity: 0.8;
}

/* Random bubble positions & speeds */
/* Bigger bubbles */
.bubble:nth-child(1) { left: 10%; animation-duration: 6s; width:16px; height:16px; }
.bubble:nth-child(2) { left: 20%; animation-duration: 9s; width:20px; height:20px; }
.bubble:nth-child(3) { left: 30%; animation-duration: 7s; width:12px; height:12px; }
.bubble:nth-child(4) { left: 40%; animation-duration: 8s; width:24px; height:24px; }
.bubble:nth-child(5) { left: 55%; animation-duration: 10s; width:18px; height:18px; }
.bubble:nth-child(6) { left: 70%; animation-duration: 12s; width:28px; height:28px; }
.bubble:nth-child(7) { left: 80%; animation-duration: 11s; width:14px; height:14px; }
.bubble:nth-child(8) { left: 85%; animation-duration: 13s; width:20px; height:20px; }
.bubble:nth-child(9) { left: 90%; animation-duration: 14s; width:16px; height:16px; }
.bubble:nth-child(10){ left: 95%; animation-duration: 15s; width:12px; height:12px; }
/* Rising + drifting bubbles */
@keyframes rise-bob {
  0% { transform: translateY(0) translateX(0); opacity: 0.8; }
  25% { transform: translateY(-30px) translateX(3px); }
  50% { transform: translateY(-60px) translateX(-2px); }
  75% { transform: translateY(-90px) translateX(2px); }
  100% { transform: translateY(-150px) translateX(0); opacity: 0; }
}
</style>