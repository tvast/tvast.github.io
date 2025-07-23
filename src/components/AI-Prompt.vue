<template>
  <div class="terminal">
    <div v-for="(line, index) in history" :key="index" class="line">
      <span class="prompt">> </span>{{ line }}
    </div>

    <div class="suggestions" v-if="isAuthenticated">
      <button @click="setPrompt('Tell me a bit about yourself.')">About You</button>
      <button @click="setPrompt('Write a short poem about technology.')">Poem</button>
      <button @click="setPrompt('Help me prepare a quick elevator pitch.')">Elevator Pitch</button>
    </div>

    <form @submit.prevent="submitPrompt" v-if="isAuthenticated">
      <span class="prompt">> </span>
      <input
        v-model="input"
        autofocus
        autocomplete="off"
        spellcheck="false"
        placeholder="Type your question or click a suggestion..."
      />
      <button type="submit" :disabled="loading || !input.trim()" style="display: none;">Send</button>
    </form>

    <div v-else class="unauthorized">
      🚫 You must be authenticated to chat with the AI.
    </div>

    <div v-if="loading" class="loading">AI is thinking...</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      history: [],
      loading: false,
      isAuthenticated: false, // mock auth state – update with real auth logic
    };
  },
  mounted() {
    // Here you can connect to a real auth service (e.g., Firebase Auth)
    // For demo, we'll just simulate a user being authenticated
    this.isAuthenticated = true; // 🔐 change logic if needed
  },
  methods: {
    setPrompt(text) {
      this.input = text;
    },
    async submitPrompt() {
      const cleanedPrompt = this.input.trim();
      if (!cleanedPrompt || !this.isAuthenticated) return;

      this.history.push(cleanedPrompt);
      this.loading = true;

      try {
       const response = await fetch('https://tvast-github-io.vercel.app', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Secret-Key': 'your-secret-key-if-you-implemented-auth',
  },
  body: JSON.stringify({ prompt: cleanedPrompt }),
});
const data = await response.json();


        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || response.statusText);
        }

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || '[No response]';
        this.history.push(`🤖: ${reply}`);
      } catch (err) {
        this.history.push(`⚠️ Error: ${err.message}`);
      } finally {
        this.loading = false;
        this.input = '';
      }
    },
  },
};
</script>

<style scoped>
.terminal {
  background: #111;
  color: #0f0;
  font-family: 'Courier New', Courier, monospace;
  padding: 1rem;
  height: 300px;
  overflow-y: auto;
  border-radius: 5px;
  box-shadow: 0 0 10px #0f0;
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
  font-family: inherit;
  font-size: 1rem;
  width: 100%;
  margin-top: 0.5rem;
}
.loading {
  color: #0f0;
  font-style: italic;
  margin-top: 0.5rem;
  user-select: none;
}
.unauthorized {
  color: #f00;
  font-style: italic;
  margin-top: 1rem;
}
.suggestions {
  margin-bottom: 0.5rem;
}
.suggestions button {
  background: transparent;
  border: 1px solid #0f0;
  color: #0f0;
  font-family: inherit;
  font-size: 0.9rem;
  margin-right: 0.5rem;
  padding: 0.2rem 0.5rem;
  cursor: pointer;
  border-radius: 3px;
  transition: background 0.2s ease;
}
.suggestions button:hover {
  background: #0f0;
  color: #111;
}
</style>
