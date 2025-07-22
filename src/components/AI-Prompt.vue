<!-- src/components/AIPrompt.vue -->
<template>
  <div class="terminal">
    <div v-for="(line, index) in history" :key="index" class="line">
      <span class="prompt">> </span>{{ line }}
    </div>

    <div class="suggestions">
      <button @click="setPrompt('Tell me a bit about yourself.')">About You</button>
      <button @click="setPrompt('Write a short poem about technology.')">Poem</button>
      <button @click="setPrompt('Help me prepare a quick elevator pitch.')">Elevator Pitch</button>
    </div>

    <form @submit.prevent="submitPrompt">
      <span class="prompt">> </span>
      <input
        v-model="input"
        autofocus
        autocomplete="off"
        spellcheck="false"
        placeholder="Type your question or click a suggestion..."
      />
      <button type="submit" :disabled="loading || !input.trim()" style="display:none;">Send</button>
    </form>

    <div v-if="loading" class="loading">AI is thinking...</div>
  </div>
</template>

<script>
export default {
  name: 'AIPrompt',
  data() {
    return {
      input: '',
      history: [],
      loading: false,
      error: null,
    };
  },
  methods: {
    setPrompt(text) {
      this.input = text;
      this.submitPrompt();
    },

    async submitPrompt() {
      const cleanedPrompt = this.input.trim();
      if (!cleanedPrompt) return;

      this.history.push(cleanedPrompt);
      this.loading = true;

      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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', // <-- Replace this
            'HTTP-Referer': 'https://yourdomain.com',
            'X-Title': 'my-ai-terminal',
          },
          body: JSON.stringify({
            model: 'google/gemma-3-27b-it:free',
            max_tokens: 1024,
            messages: [{ role: 'user', content: cleanedPrompt }],
          }),
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error?.message || response.statusText);
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
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(0, 255, 0, 0.2);
  border-radius: 10px;
  color: #00ff88;
  font-family: 'Fira Code', monospace;
  padding: 1.5rem;
  min-height: 400px;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
.line {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

</style>
