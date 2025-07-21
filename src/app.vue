<template>
  <div id="app">
    <Timeline />
<MasonryBoard />
  </div>
</template>

<script>
import Timeline from './components/Timeline.vue'
import MasonryBoard from './components/MasonryBoard.vue'
export default {
  name: 'App',
  components: {
    Timeline,
MasonryBoard
  }
}
</script>

