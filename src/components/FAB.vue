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

/* Skeuomorphic metal button */
.fab {
  position: relative;
  width: 70px;
  height: 70px;
  background: linear-gradient(145deg, #b0b0b0, #7a7a7a);
  border: 2px solid #5a5a5a;
  border-radius: 50%;
  font-size: 2rem;
  color: #222;
  cursor: pointer;
  box-shadow: 5px 5px 15px #4a4a4a, -5px -5px 15px #d0d0d0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.fab:hover {
  background: linear-gradient(145deg, #9a9a9a, #6a6a6a);
  box-shadow: inset 2px 2px 5px #4a4a4a, inset -2px -2px 5px #d0d0d0;
  transform: scale(1.1);
}

/* Tooltip */
.tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-0.5rem);
  background: #e0e0e0;
  color: #333;
  padding: 0.3rem 0.6rem;
  font-size: 0.8rem;
  border-radius: 6px;
  box-shadow: 2px 2px 6px rgba(0,0,0,0.3);
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.fab:hover .tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(-1rem);
}
</style>