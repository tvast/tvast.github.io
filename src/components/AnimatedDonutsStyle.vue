<template>
  <transition name="subtitle-fade">
    <p v-if="showLogo" class="hero-subtitle inverted">
      Where creativity meets 
      <strong>
        <DonutsAnimated style="width: 100%; height: auto;" class="donut-inline"/>
      </strong>
    </p>
  </transition>
</template>

<script>
import DonutsAnimated from './DonutsAnimated.vue';

export default {
  components: { DonutsAnimated },
  data() {
    return { showLogo: true };
  },
};
</script>

<style scoped>
/* Invert colors */
.hero-subtitle.inverted {
  color: white;            /* text around donut */
  background-color: black; /* background for entire line */
  font-size: 2rem;
  font-weight: 500;
  padding: 0.5em 1em;
}

/* Make the donut inline and centered */
.donut-inline {
  display: inline-block;
  width: 1em;        /* adjust as needed */
  height: 1em;
  vertical-align: middle;
}
</style>