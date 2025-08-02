<template>
  <div class="h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-gray-900 to-black">
    <h1 class="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-600 animate-fadeIn">
      Welcome Back, {{ userName }}
    </h1>
    <p class="mt-4 text-xl text-gray-400">Prepare to enter the Next Dimension.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const userName = ref('Explorer');

onMounted(() => {
  const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
    const [key, value] = cookie.split('=');
    acc[key] = decodeURIComponent(value);
    return acc;
  }, {});

  if (cookies.username) {
    userName.value = cookies.username;
  }
});
</script>

<style scoped>
@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn {
  animation: fadeIn 1s ease-out forwards;
}
</style>
