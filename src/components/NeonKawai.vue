<template>
  <button class="neon-btn" @click="$emit('click')">
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup>
defineProps({
  label: { type: String, default: "Play" }
})
</script>

<style scoped>
.neon-btn {
  position: relative;
  padding: 1rem 2.5rem;
  font-size: 1.3rem;
  font-weight: bold;
  color: #fff;
  background: #222;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  overflow: hidden;
  text-shadow: 0 0 5px #ff5af0, 0 0 10px #ff5af0, 0 0 20px #ff5af0;
  box-shadow: 0 0 10px #ff5af0, 0 0 20px #ff5af0 inset;
  transition: all 0.3s ease;
}

.neon-btn::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,90,240,0.2) 0%, transparent 70%);
  animation: glow 2s linear infinite;
  z-index: 0;
}

.neon-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 0 20px #ff5af0, 0 0 40px #ff5af0 inset;
}

.neon-btn > * {
  position: relative;
  z-index: 1;
}

@keyframes glow {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(180deg); }
}
</style>