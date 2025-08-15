<template>
  <div class="chat-button-wrapper">
    <button class="fab" @click="toggleChat">
      💬
      <span class="tooltip">Chat with AI!</span>
    </button>
  </div>
</template>

<script>
import { EventBus } from './event-bus';

export default {
  methods: {
    toggleChat() {
      EventBus.$emit('toggle-chat');
    }
  }
}

</script>

<style scoped>
.chat-button-wrapper {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 1000;
}

/* Glass effect button */
.fab {
  position: relative;
  width: 70px;
  height: 70px;
  background: rgba(0, 255, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(0, 255, 0, 0.5);
  border-radius: 50%;
  font-size: 2rem;
  color: #0f0;
  cursor: pointer;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
}

.fab:hover {
  transform: scale(1.2);
  box-shadow: 0 0 30px rgba(0, 255, 0, 0.9);
}

/* Tooltip / incentive text */
.tooltip {
  position: absolute;
  bottom: 100%; /* au-dessus du bouton */
  left: 50%;
  transform: translateX(-50%) translateY(-0.5rem);
  background: rgba(0, 255, 0, 0.2);
  backdrop-filter: blur(6px);
  color: #0f0;
  padding: 0.3rem 0.6rem;
  font-size: 0.8rem;
  border-radius: 6px;
  opacity: 0;
  pointer-events: none;
  transition: 0.3s;
  white-space: nowrap;
}

/* Tooltip apparaît au hover */
.fab:hover .tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(-1rem);
}
</style>

<style scoped>
.chat-button-wrapper {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 1000;
}

/* Glass effect button */
.fab {
  position: relative;
  width: 70px;
  height: 70px;
  background: rgba(0, 255, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(0, 255, 0, 0.5);
  border-radius: 50%;
  font-size: 2rem;
  color: #0f0;
  cursor: pointer;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
}

.fab:hover {
  transform: scale(1.2);
  box-shadow: 0 0 30px rgba(0, 255, 0, 0.9);
}

/* Tooltip / incentive text */
.tooltip {
  position: absolute;
  bottom: 100%; /* au-dessus du bouton */
  left: 50%;
  transform: translateX(-50%) translateY(-0.5rem);
  background: rgba(0, 255, 0, 0.2);
  backdrop-filter: blur(6px);
  color: #0f0;
  padding: 0.3rem 0.6rem;
  font-size: 0.8rem;
  border-radius: 6px;
  opacity: 0;
  pointer-events: none;
  transition: 0.3s;
  white-space: nowrap;
}

/* Tooltip apparaît au hover */
.fab:hover .tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(-1rem);
}
</style>