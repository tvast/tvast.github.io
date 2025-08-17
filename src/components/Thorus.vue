<script setup>
import { ref, onMounted } from 'vue'
import * as THREE from 'three'
import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise.js'

let scene, camera, renderer, analyser
const noise = new ImprovedNoise()
const donuts = []
const donutCount = 5
const audioReady = ref(false)
let audio, listener

onMounted(() => {
  initScene()
  window.addEventListener('resize', onWindowResize)
})

function initScene() {
     // Scene & Camera
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        100
      );
    camera.position.z = 8;

  scene.add(new THREE.AmbientLight(0xffffff, 0.5))

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.getElementById('out').appendChild(renderer.domElement)

  // générer les donuts
  createDonuts()

  // lumière
  const light = new THREE.PointLight(0xffffff, 1)
  light.position.set(50, 50, 50)
  scene.add(light)

  // setup audio
  listener = new THREE.AudioListener()
  camera.add(listener)
  audio = new THREE.Audio(listener)
  const loader = new THREE.AudioLoader()
  loader.load(
    'Canceinterlude.flac',
    buffer => {
      audio.setBuffer(buffer)
      audio.setLoop(true)
      audio.setVolume(0.5)
      analyser = new THREE.AudioAnalyser(audio, 32)
      audioReady.value = true
    },
    undefined,
    err => console.error('Audio load failed', err)
  )
}

// function createDonuts() {
//   for (let i = 0; i < donutCount; i++) {
//     const canvas = document.createElement('canvas')
//     canvas.width = 256
//     canvas.height = 256
//     const ctx = canvas.getContext('2d')
//     ctx.fillStyle = `hsl(${Math.random() * 360}, 80%, 50%)`
//     ctx.fillRect(0, 0, canvas.width, canvas.height)
//     const texture = new THREE.CanvasTexture(canvas)

//     const geometry = new THREE.TorusGeometry(Math.random() * 1 + 0.5, 0.1, 16, 100)
//     const material = new THREE.MeshBasicMaterial({ map: texture, wireframe: true })

//     const donut = new THREE.Mesh(geometry, material)
//     donut.position.set(
//       (Math.random() - 0.5) * 10,
//       (Math.random() - 0.5) * 10,
//       (Math.random() - 0.5) * 10
//     )
//     donut.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0)
//     donut.userData = { canvas, ctx, texture, speed: Math.random() * 0.02 + 0.01 }
//     scene.add(donut)
//     donuts.push(donut)
//   }
// }

function startAudio() {
  if (!audioReady.value) return
  audio.play()
  animate()
}

// function createDonuts() {

//   const vertexShader = `
//   varying vec3 vNormal;
//   varying vec3 vPosition;

//   void main() {
//     vNormal = normalize(normalMatrix * normal);
//     vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//   }
// `;
//   // Vertex shader
//   const fragmentShader = `
//   varying vec3 vNormal;
//   varying vec3 vPosition;
//   uniform vec3 uColor;
//   uniform vec3 uLightPos;

//   void main() {
//     vec3 lightDir = normalize(uLightPos - vPosition);
//     float diff = max(dot(vNormal, lightDir), 0.0);
//     float spec = pow(max(dot(reflect(-lightDir, vNormal), vec3(0.0, 0.0, 1.0)), 0.0), 16.0);
//     vec3 color = uColor * diff + vec3(1.0) * spec * 0.5; // glossy highlight
//     gl_FragColor = vec4(color, 1.0);
//   }
// `;
//   for (let i = 0; i < donutCount; i++) {
//     const geometry = new THREE.TorusGeometry(Math.random() * 0.5 + 0.2, 0.1, 16, 100);

//     // Create a canvas texture for each donut
//     const canvas = document.createElement('canvas');
//     canvas.id= i

//     canvas.width = 256;
//     canvas.height = 256;
//     const ctx = canvas.getContext('2d');

//     const texture = new THREE.CanvasTexture(canvas);

//     const material = new THREE.MeshBasicMaterial({ map: texture });

//     const donut = new THREE.Mesh(geometry, material);

//     // Random initial position
//     donut.position.set(
//       (Math.random() - 0.5) * 5,
//       (Math.random() - 0.5) * 5,
//       (Math.random() - 0.5) * 5
//     );
//     donut.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

//     // Save canvas context and texture to update later
//     donut.userData = { canvas, ctx, texture };

//     scene.add(donut);
//     donuts.push(donut);
//   }}

function generateColor() {
  return new THREE.Color(`hsl(${Math.random() * 360}, 80%, 50%)`);
}

function createDonuts() {
  const vertexShader = `
    varying vec2 vUv;
    varying float vWave;

    uniform float uTime;

    void main() {
      vUv = uv;

      // Animation de vague kawai
      float wave = sin(position.y * 10.0 + uTime * 2.0) * 0.05;
      vWave = wave;

      vec3 pos = position;
      pos.z += wave;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    varying float vWave;

    void main() {
      // Noir en fond
      vec3 color = vec3(0.0, 0.0, 0.0);

      // Vert terminal vertical
      color = mix(color, vec3(0.0, 1.0, 0.5), vUv.y + vWave);

      // Accent rose kawai horizontal
      color = mix(color, vec3(1.0, 0.47, 0.8), vUv.x * 0.5);

      gl_FragColor = vec4(color, 1.0);
    }
  `;

  for (let i = 0; i < donutCount; i++) {
    const geometry = new THREE.TorusGeometry(
  Math.random() * 1.5 + 1.0, // outer radius bigger
  0.4,                       // tube thickness
  32,
  100
);
    geometry.originalPositions = new Float32Array(geometry.attributes.position.array);

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uColor: { value: new THREE.Color(`hsl(${Math.random() * 360}, 80%, 60%)`) },
        uLightPos: { value: new THREE.Vector3(5, 5, 5) },
        uTime: { value: 0.0 },
        uBass: { value: 0.0 }
      },
      side: THREE.DoubleSide
    });

    const donut = new THREE.Mesh(geometry, material);

    donut.position.set(
      (Math.random() - 0.5) * 5,
      (Math.random() - 0.5) * 5,
      (Math.random() - 0.5) * 5
    );
    donut.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    donut.userData = { speed: Math.random() * 0.02 + 0.01 };

    scene.add(donut);
    donuts.push(donut);
  }
}
  function animate() {
    requestAnimationFrame(animate)

    let bass = 0
    let tre = 0
    if (analyser) {
      bass = analyser.getAverageFrequency() * 0.01
      tre = analyser.getAverageFrequency() * 0.002
    }

    donuts.forEach(donut => {
      const posAttr = donut.geometry.attributes.position
      const original = donut.geometry.originalPositions

      for (let i = 0; i < posAttr.count; i++) {
        const ix = i * 3
        const iy = ix + 1
        const iz = ix + 2

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

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
</script>

<template>
  <div id="out" class="w-full h-screen relative"></div>
    <!-- Bouton Play -->
    <button v-if="audioReady" class="play-button" @click="startAudio">
      ▶️ Play
    </button>
  <div id="out"></div>
</template>

<style scoped>
.scene-container {
  position: relative;
  width: 100%;
  height: 100vh;
}

.donuts-canvas {
  width: 100%;
  height: 100%;
}

/* Kawaii CTA Button */
.play-button {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  padding: 16px 36px;
  font-size: 22px;
  font-weight: bold;
  border: none;
  border-radius: 24px;
  background: linear-gradient(135deg, #ff9a9e, #fad0c4, #fbc2eb);
  color: #fff;
  cursor: pointer;
  box-shadow: 0 8px 15px rgba(255, 182, 193, 0.4);
  transition: all 0.3s ease;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
}

/* Hover kawaii sparkle effect */
.play-button:hover {
  transform: translate(-50%, -50%) scale(1.15) rotate(-2deg);
  box-shadow: 0 12px 20px rgba(255, 182, 193, 0.6), 0 0 10px rgba(255,255,255,0.5) inset;
  background: linear-gradient(135deg, #fbc2eb, #a18cd1, #ffdde1);
}

/* Cute bouncing animation */
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
  40% { transform: translate(-50%, -55%) scale(1.1) rotate(-3deg); }
  60% { transform: translate(-50%, -52%) scale(1.05) rotate(2deg); }
}

.play-button {
  animation: bounce 2s infinite;
}
</style>