<template>
  <canvas ref="canvas" class="universe-canvas"></canvas>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from "vue";
import * as THREE from "three";

// Props
const props = defineProps({
  color: { type: String, default: "#ffffff" },
  scale: { type: Number, default: 1 },
  speed: { type: Number, default: 0.5 },
  letter: { type: String, default: "A" },
});

const canvas = ref(null);
let scene, camera, renderer, particles, particleMaterial;

// Randomize props
function randomizeProps() {
  const colors = ['#ffffff', '#ff0000', '#00ff00', '#0000ff'];
  props.color = colors[Math.floor(Math.random() * colors.length)];
  props.scale = +(Math.random() * 2 + 0.5).toFixed(2);
  props.speed = +(Math.random() * 2).toFixed(2);
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  props.letter = letters[Math.floor(Math.random() * letters.length)];
}

// Hoopalong attractor
function hoopalong(x, y, a, b, c) {
  return [y - Math.sign(x) * Math.sqrt(Math.abs(b * x - c)), a - x];
}

function init() {
  if (!canvas.value) return;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({ canvas: canvas.value, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const geometry = new THREE.BufferGeometry();
  const positions = [];

  let x = 0, y = 0;
  for(let i=0;i<2000;i++){
    [x, y] = hoopalong(x, y, 0.5, -0.6, 1.0);
    positions.push(x*props.scale, y*props.scale, (Math.random()-0.5)*0.5);
  }
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));

  particleMaterial = new THREE.PointsMaterial({ color: props.color, size: 0.02 });
  particles = new THREE.Points(geometry, particleMaterial);
  scene.add(particles);
}

function animate() {
  requestAnimationFrame(animate);
  if (particles) particles.rotation.y += props.speed * 0.001;
  if (renderer && scene && camera) renderer.render(scene, camera);
}

onMounted(() => {
  nextTick(() => {
    randomizeProps();
    init();
    animate();
  });
});

watch(() => props.color, (newColor) => {
  if(particleMaterial) particleMaterial.color.set(newColor);
});
watch(() => props.scale, (newScale) => {
  if(particles){
    const positions = particles.geometry.attributes.position.array;
    for(let i=0;i<positions.length;i+=3){
      positions[i] *= newScale;
      positions[i+1] *= newScale;
    }
    particles.geometry.attributes.position.needsUpdate = true;
  }
});
</script>

<style scoped>
.universe-canvas {
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  z-index: 0;
}
</style>