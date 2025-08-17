<template>
  <div class="p-6 grid gap-4">
    <h2 class="text-2xl font-bold text-center">Alien Computing – AI Research Setup</h2>

    <!-- Step 1: Project Type -->
    <div>
      <label class="font-semibold">What kind of AI project?</label>
      <select v-model="form.projectType" class="w-full border rounded p-2">
        <option disabled value="">-- select --</option>
        <option>Natural Language Processing</option>
        <option>Computer Vision</option>
        <option>Generative AI (Art / Music)</option>
        <option>Robotics</option>
        <option>Quantum-inspired Simulation</option>
      </select>
    </div>

    <!-- Step 2: Data Scale -->
    <div>
      <label class="font-semibold">Dataset size</label>
      <select v-model="form.dataset" class="w-full border rounded p-2">
        <option disabled value="">-- select --</option>
        <option>Small (under 1GB)</option>
        <option>Medium (1-100GB)</option>
        <option>Large (100GB - 10TB)</option>
        <option>Massive (10TB+)</option>
      </select>
    </div>

    <!-- Step 3: Compute Power -->
    <div>
      <label class="font-semibold">Preferred Compute</label>
      <select v-model="form.compute" class="w-full border rounded p-2">
        <option disabled value="">-- select --</option>
        <option>GPU Cluster</option>
        <option>TPU Pods</option>
        <option>Quantum Hybrid</option>
        <option>Alien Neural Fabric (Experimental)</option>
      </select>
    </div>

    <!-- Step 4: Budget -->
    <div>
      <label class="font-semibold">Budget Level</label>
      <input
        type="range"
        v-model="form.budget"
        min="1"
        max="5"
        class="w-full"
      />
      <p class="text-sm">Level: {{ form.budget }}</p>
    </div>

    <!-- Result -->
    <div class="bg-gray-100 p-4 rounded">
      <h3 class="font-bold mb-2">Recommended Setup:</h3>
      <p v-if="form.projectType && form.compute">
        For your <b>{{ form.projectType }}</b> project with a
        <b>{{ form.dataset }}</b> dataset, we recommend using
        <b>{{ form.compute }}</b> with a budget level of <b>{{ form.budget }}</b>.
      </p>
      <p v-else class="text-gray-500">Fill the options above to see recommendation.</p>
    </div>

    <!-- Confirm -->
    <button
      class="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded"
      @click="confirmChoice"
    >
      Confirm Choice
    </button>
  </div>
</template>

<script setup>
import { reactive } from "vue"

const form = reactive({
  projectType: "",
  dataset: "",
  compute: "",
  budget: 3,
})

function confirmChoice() {
  alert(`Your Alien Computing setup has been locked in 🚀\n
  Project: ${form.projectType}\n
  Dataset: ${form.dataset}\n
  Compute: ${form.compute}\n
  Budget: Level ${form.budget}`)
}
</script>