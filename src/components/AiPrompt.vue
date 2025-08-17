<template>
  <div>
    <!-- FAB Button -->
    <button class="fab" @click="toggleChat">
      💬
      <span class="tooltip">Chat with AI!</span>
    </button>

    <!-- Chat Window -->
    <div v-if="open" class="chat-window">
      <div ref="terminal" class="terminal">
        <div v-for="(line, i) in history" :key="i" class="line">
          <span class="prompt">{{ line.isUser ? '> ' : '' }}</span>{{ line.text }}
        </div>

        <div class="suggestions" v-if="isAuthenticated">
          <button @click="feedFunnyText()">Funny Théophile / Alien</button>
          <button @click="setPrompt('Write a short poem about technology.')">Poem</button>
          <button @click="setPrompt('Help me prepare a quick elevator pitch.')">Elevator Pitch</button>
        </div>

        <form @submit.prevent="submitPromptHandler" v-if="isAuthenticated">
          <span class="prompt">></span>
          <input v-model="input" placeholder="Type your question..." autofocus />
          <button type="submit" :disabled="loading || !input.trim()" style="display:none;">Send</button>
        </form>

        <div v-if="loading" class="loading">AI is thinking...</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import { getApp } from "firebase/app";
import { getFunctions, httpsCallable } from "firebase/functions";
import { eventBus } from "../eventBus";

const app = getApp();
const functions = getFunctions(app, "europe-west1");
const chatWithAI = httpsCallable(functions, "chatWithAI");
const terminal = ref(null);
const input = ref("");
const history = ref([]);
const loading = ref(false);
const open = ref(false);
const isAuthenticated = ref(true);


function toggleChat() {
  open.value = !open.value;
}

function setPrompt(text) {
  input.value = text;
  submitPromptHandler();
}

function feedFunnyText() {
  const prompts = [
    "Write a short and funny story about Théophile Vast.",
    "Make a humorous comment about Alien Computing."
  ];
  const prompt = prompts[Math.floor(Math.random() * prompts.length)];
  setPrompt(prompt);
}

onMounted(() => {
  eventBus.on("open-chat", () => {
    open.value = true;
  });
});

onBeforeUnmount(() => {
  eventBus.off("open-chat");
});

async function submitPromptHandler() {
  const prompt = input.value.trim();
  if (!prompt) return;

  history.value.push({ text: prompt, isUser: true });
  input.value = "";
  loading.value = true;

  scrollToBottom();

  try {
    const result = await chatWithAI({ prompt });
    history.value.push({ text: result.data.text, isUser: false });
    scrollToBottom();
  } catch (err) {
    history.value.push({ text: `Error: ${err.message}`, isUser: false });
    scrollToBottom();
  } finally {
    loading.value = false;
  }
}

function scrollToBottom() {
  nextTick(() => {
    if (terminal.value) {
      terminal.value.scrollTop = terminal.value.scrollHeight;
    }
  });
}
</script>

<style scoped>
.fab {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  width: 60px;
  height: 60px;
  background: rgba(0, 255, 0, 0.2);
  backdrop-filter: blur(10px);
  color: #111;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.7);
  z-index: 1000;
  transition: 0.2s;
}

.fab:hover {
  transform: scale(1.1);
}

.tooltip {
  position: absolute;
  bottom: 70px;
  right: 0;
  background: rgba(0, 255, 0, 0.1);
  color: #0f0;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.2s;
}

.fab:hover .tooltip {
  opacity: 1;
}

.chat-window {
  position: fixed;
  bottom: 7.5rem;
  right: 1.5rem;
  width: 320px;
  max-height: 400px;
  height: 400px; /* make sure the inner terminal knows the height */
  background: rgba(17, 17, 17, 0.8);
  backdrop-filter: blur(5px);
  color: #0f0;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  overflow: hidden; /* don't scroll the outer div */
}

.terminal {
  padding: 1rem;
  height: 100%;
  overflow-y: auto; /* THIS allows scrolling */
  font-family: 'Courier New', monospace;
  display: flex;
  flex-direction: column;
}

.line {
  white-space: pre-wrap;
  margin-bottom: 0.5rem;
}

.prompt {
  color: #0f0;
  font-weight: bold;
}

input {
  background: transparent;
  border: none;
  color: #0f0;
  outline: none;
  width: 100%;
  margin-top: 0.5rem;
  font-family: inherit;
}

.loading {
  font-style: italic;
  margin-top: 0.5rem;
}

.suggestions button {
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  background: rgba(0, 255, 0, 0.1);
  border: 1px solid #0f0;
  color: #0f0;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
}

.suggestions button:hover {
  background: rgba(0, 255, 0, 0.2);
}

.chat-container {
  position: fixed;
  bottom: 100px; /* adjust as needed */
  right: 1.5rem;
  width: 300px;
  max-height: 400px;
  background: #222;
  color: #0f0;
  border-radius: 10px;
  overflow-y: auto;
  padding: 1rem;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: #555 #222; /* Firefox */
}

/* Scrollbar style for Webkit browsers */
.chat-container::-webkit-scrollbar {
  width: 8px;
}

.chat-container::-webkit-scrollbar-track {
  background: #222;
}

.chat-container::-webkit-scrollbar-thumb {
  background-color: #555;
  border-radius: 4px;
  transition: background 0.3s;
}

/* Highlight scrollbar on hover */
.chat-container:hover::-webkit-scrollbar-thumb {
  background-color: #0f0; /* glowing green effect */
}

/* Chat messages */
.chat-message {
  margin-bottom: 0.5rem;
  font-family: 'Courier New', monospace;
}
</style>