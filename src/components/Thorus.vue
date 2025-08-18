<script setup>
import { ref, onMounted, nextTick } from 'vue'
import * as THREE from 'three'
import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise.js'

const out = ref(null)
const audioReady = ref(false)
const isPlaying = ref(false)
const mounted = ref(false)

let scene, camera, renderer, analyser, audio, listener
const noise = new ImprovedNoise()
const donuts = []
const donutCount = 7
let idleAnimating = true

// ----------------- INITIALIZATION -----------------
onMounted(() => {
  mounted.value = true
  nextTick(() => {
    if (!out.value) return console.error('No container found!')
    initScene()
    idleAnimate()
    window.addEventListener('resize', onWindowResize)
  })
})

// ----------------- SCENE & CAMERA -----------------
function initScene() {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.z = 10
  scene.add(new THREE.AmbientLight(0xffffff, 0.5))

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  out.value.appendChild(renderer.domElement)

  createDonuts()

  const light = new THREE.PointLight(0xffffff, 1)
  light.position.set(50, 50, 50)
  scene.add(light)

  setupAudio()
}

// ----------------- DONUTS -----------------
function createDonuts() {
  const vertexShader = `
    varying vec2 vUv;
    varying float vWave;
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform float uTime;

    void main() {
      vUv = uv;
      float wave = sin(position.y * 10.0 + uTime * 2.0) * 0.05;
      vWave = wave;
      vec3 pos = position;
      pos.z += wave;
      vNormal = normalize(normalMatrix * normal);
      vPosition = (modelViewMatrix * vec4(pos, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `

  const fragmentShader = `
    varying vec2 vUv;
    varying float vWave;
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform vec3 uBaseColor;
    uniform vec3 uLightPos;
    uniform float uSpecularIntensity;
    uniform float uDiffuseIntensity;

    void main() {
      vec3 baseColor = uBaseColor;
      baseColor = mix(baseColor, vec3(0.0, 1.0, 0.5), vUv.y + vWave);
      baseColor = mix(baseColor, vec3(1.0, 0.47, 0.8), vUv.x * 0.5);
      vec3 lightDir = normalize(uLightPos - vPosition);
      float diff = max(dot(vNormal, lightDir), 0.0);
      vec3 viewDir = normalize(-vPosition);
      vec3 reflectDir = reflect(-lightDir, vNormal);
      float spec = pow(max(dot(viewDir, reflectDir), 0.0), 16.0);
      vec3 color = baseColor * (diff * uDiffuseIntensity) + vec3(1.0) * spec * uSpecularIntensity;
      gl_FragColor = vec4(color, 1.0);
    }
  `

  for (let i = 0; i < donutCount; i++) {
    const geometry = new THREE.TorusGeometry(Math.random() * 1.5 + 1.0, 0.4, 32, 100)
    geometry.originalPositions = new Float32Array(geometry.attributes.position.array)

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uLightPos: { value: new THREE.Vector3(5, 5, 5) },
        uSpecularIntensity: { value: 0.5 },
        uDiffuseIntensity: { value: 1.0 },
        uBaseColor: { value: new THREE.Color(0x00ff00) } // neon green base
      },
      wireframe: true,
      skinning: false
    })

    const donut = new THREE.Mesh(geometry, material)
    donut.position.set((Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5)
    donut.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0)
    donut.userData = { speed: Math.random() * 0.02 + 0.01 }

    scene.add(donut)
    donuts.push(donut)
  }
}

// ----------------- AUDIO -----------------
function setupAudio() {
  listener = new THREE.AudioListener()
  camera.add(listener)
  audio = new THREE.Audio(listener)
  const loader = new THREE.AudioLoader()
  loader.load('Canceinterlude.flac', buffer => {
    audio.setBuffer(buffer)
    audio.setLoop(true)
    audio.setVolume(0.5)
    analyser = new THREE.AudioAnalyser(audio, 32)
    audioReady.value = true
  }, undefined, err => console.error('Audio load failed', err))
}

function toggleAudio() {
  if (!audioReady.value) return
  if (isPlaying.value) {
    audio.pause()
    isPlaying.value = false
    idleAnimating = true
    idleAnimate()
  } else {
    audio.play()
    isPlaying.value = true
    idleAnimating = false
    animate()
  }
}

// ----------------- ANIMATION -----------------
function idleAnimate() {
  if (!idleAnimating) return
  requestAnimationFrame(idleAnimate)
  renderer.render(scene, camera)
}

function animate() {
  requestAnimationFrame(animate)
  let bass = analyser ? analyser.getAverageFrequency() * 0.01 : 0
  let tre = analyser ? analyser.getAverageFrequency() * 0.002 : 0

  donuts.forEach(donut => {
    const posAttr = donut.geometry.attributes.position
    const original = donut.geometry.originalPositions

    for (let i = 0; i < posAttr.count; i++) {
      const ix = i * 3, iy = ix + 1, iz = ix + 2
      posAttr.array[ix] = original[ix] + noise.noise(original[ix], original[iy], performance.now() * 0.001) * bass
      posAttr.array[iy] = original[iy] + noise.noise(original[iy], original[iz], performance.now() * 0.001) * tre
      posAttr.array[iz] = original[iz] + noise.noise(original[iz], original[ix], performance.now() * 0.001) * bass
    }
    posAttr.needsUpdate = true
    donut.rotation.x += donut.userData.speed
    donut.rotation.y += donut.userData.speed
  })

  renderer.render(scene, camera)
}

// ----------------- RESIZE -----------------
function onWindowResize() {
  if (!camera || !renderer) return
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}
</script>

<template>
  <div v-if="mounted" ref="out" class="w-full h-screen relative"></div>

  <div v-if="!audioReady" class="absolute inset-0 flex items-center justify-center bg-black text-white z-50">
    <div class="loader"></div>
    <p class="ml-4 text-xl">Loading...</p>
  </div>

  <!-- Embedded Kawaii Neon Button -->
  <button
    v-else
    @click="toggleAudio"
    class="kawaii-button"
  >
    {{ isPlaying ? '⏸️ Pause' : '▶️ Play' }}
  </button>
</template>

<style scoped>
.kawaii-button {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1rem 2.5rem;
  font-size: 1.3rem;
  font-weight: bold;
  color: #00ff80; /* neon green */
  background: #002200;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  text-shadow: 0 0 5px #00ff80, 0 0 10px #00ff80, 0 0 20px #00ff80;
  box-shadow: 0 0 10px #00ff80, 0 0 20px #00ff80 inset;
  overflow: hidden;
  z-index: 50;
  transition: transform 0.3s;
}
.kawaii-button:hover {
  transform: translate(-50%, -50%) scale(1.1);
  box-shadow: 0 0 20px #00ff80, 0 0 40px #00ff80 inset;
}
</style>