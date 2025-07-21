<template>
  <div class="logo">
    <div class="initials">TV</div>
    <div class="name">
      <span class="first">theophile</span>
      <span class="last">vast</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Logo",
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Serif+Display&display=swap');

.logo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: 'DM Serif Display', serif;
  color: #111;
}

.initials {
  font-size: 3rem;
  font-weight: bold;
  letter-spacing: -0.05em;
  line-height: 1;
}

.name {
  font-size: 0.9rem;
  text-transform: lowercase;
  margin-top: 0.2rem;
  display: flex;
  gap: 0.25rem;
}

.name .first {
  font-weight: 300;
  opacity: 0.8;
}

.name .last {
  font-weight: 500;
}
</style>

