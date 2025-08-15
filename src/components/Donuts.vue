<template>
  <div class="donuts-container">
    <canvas ref="donutsCanvas"></canvas>
    
    <!-- Overlay the typing effect -->
    <div class="typing-text">
      <span ref="typingSpan"></span><span class="cursor"><Cursor /></span>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three';
import Cursor from './Cursor.vue';
export default {
    name: 'DonutsScene',
    components: { Cursor },
    data() {
        return {
            donuts: [],
            donutCount: 10
        };
    },
    mounted() {
        this.initScene();
        window.addEventListener('resize', this.onWindowResize);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onWindowResize);
        cancelAnimationFrame(this.animationId);
        this.renderer.dispose();
    },
    methods: {
        initScene() {
const canvas = document.createElement('canvas');

            // Add this above fragmentShader
            const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
            // Vertex shader
            const fragmentShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  uniform vec3 uColor;
  uniform vec3 uLightPos;

  void main() {
    vec3 lightDir = normalize(uLightPos - vPosition);
    float diff = max(dot(vNormal, lightDir), 0.0);
    float spec = pow(max(dot(reflect(-lightDir, vNormal), vec3(0.0, 0.0, 1.0)), 0.0), 16.0);
    vec3 color = uColor * diff + vec3(1.0) * spec * 0.5; // glossy highlight
    gl_FragColor = vec4(color, 1.0);
  }
`;
            // Scene & Camera
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(
                75,
                window.innerWidth / window.innerHeight,
                0.1,
                1000
            );
            this.camera.position.z = 5;

            // Renderer
            this.renderer = new THREE.WebGLRenderer({
                canvas: this.$refs.donutsCanvas,
                alpha: false
            });
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setClearColor(0x000080); // navy blue

            // Lights
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
            const pointLight = new THREE.PointLight(0xffffff, 1);
            pointLight.position.set(5, 5, 5);
            this.scene.add(ambientLight, pointLight);

            // Donut Colors
            const colors = [
                new THREE.Color(0xA7D8D8),
                new THREE.Color(0xF1D0A0),
                new THREE.Color(0xA1D6B4),
                new THREE.Color(0xE4A6A1),
                new THREE.Color(0xD1D9D1),
                new THREE.Color(0xA1D8B4),
                new THREE.Color(0xA1D8D8),
                new THREE.Color(0xA1D8D8),
                new THREE.Color(0xF1D0A0),
                new THREE.Color(0xA1D8B4)
            ];
            for (let i = 0; i < this.donutCount; i++) {
                const geometry = new THREE.TorusGeometry(Math.random() * 0.5 + 0.2, 0.1, 16, 100);

                // Create a canvas texture for each donut
                
                canvas.width = 256;
                canvas.height = 256;
                const ctx = canvas.getContext('2d');

                const texture = new THREE.CanvasTexture(canvas);

                const material = new THREE.MeshBasicMaterial({ map: texture });

                const donut = new THREE.Mesh(geometry, material);

                // Random initial position
                donut.position.set(
                    (Math.random() - 0.5) * 5,
                    (Math.random() - 0.5) * 5,
                    (Math.random() - 0.5) * 5
                );
                donut.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

                // Save canvas context and texture to update later
                donut.userData = { canvas, ctx, texture };

                this.scene.add(donut);
                this.donuts.push(donut);
            }

            // Star Background
            const starGeometry = new THREE.BufferGeometry();
            const starCount = 1000;
            const starPositions = [];
             const texture = new THREE.CanvasTexture(canvas);

                const material = new THREE.MeshBasicMaterial({ map: texture });
            for (let i = 0; i < starCount; i++) {
                starPositions.push(
                    (Math.random() - 0.5) * 100,
                    (Math.random() - 0.5) * 100,
                    (Math.random() - 0.5) * 100
                );
            }
            starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
            // Asumiendo que colors ya está definido
const starMaterial = new THREE.PointsMaterial({
    color: colors[Math.floor(Math.random() * colors.length)], // color aleatorio
    size: 0.5,              // un poco más grande o ajusta según tu gusto
    sizeAttenuation: true,  // mantiene la perspectiva de tamaño
    transparent: true,      // permite efectos de fade
    opacity: 0.2    ,           // suaviza la intensidad
    depthWrite: false        // evita problemas de overlay con otros objetos
});
            const starField = new THREE.Mesh(starGeometry, starMaterial);
            this.scene.add(starField);

            // Bind animate
            this.animate = this.animate.bind(this);
            this.animate(starField);
        },
        animate() {
            this.animationId = requestAnimationFrame(this.animate);

            // Rotate donuts
            this.donuts.forEach((donut, i) => {
                donut.rotation.x += 0.01 + i * 0.001;
                donut.rotation.y += 0.01 + i * 0.001;
                donut.position.x = Math.sin(Date.now() * 0.001 + i) * 2;
                donut.position.y = Math.cos(Date.now() * 0.001 + i) * 2;
            });

            this.donuts.forEach((donut, i) => {
                // Rotate donuts
                donut.rotation.x += 0.01 + i * 0.001;
                donut.rotation.y += 0.01 + i * 0.001;

                // Update position like before
                donut.position.x = Math.sin(Date.now() * 0.001 + i) * 2;
                donut.position.y = Math.cos(Date.now() * 0.001 + i) * 2;

                // Draw random characters on the canvas
                const { ctx, canvas, texture } = donut.userData;
                ctx.fillStyle = 'black';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.fillStyle = '#00ff00'; // Matrix green
                ctx.font = '20px monospace';
                for (let j = 0; j < 10; j++) {
                    const char = String.fromCharCode(33 + Math.floor(Math.random() * 94)); // random ASCII
                    const x = Math.random() * canvas.width;
                    const y = Math.random() * canvas.height;
                    ctx.fillText(char, x, y);
                }

                // Tell Three.js to update the texture
                texture.needsUpdate = true;
            });

            this.renderer.render(this.scene, this.camera);
        },
        onWindowResize() {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        }
    }
};
</script>

<style scoped>
.donuts-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

canvas {
    display: block;
}

.ai-prompt-overlay {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 10;
    pointer-events: auto;
    /* so you can click it */
}

.donuts-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    /* required for absolute children */
}

canvas {
    display: block;
}
.donuts-container {
  position: relative;
  width: 100vw;
  height: 100vh;
}

canvas {
  display: block;
}

.typing-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: monospace;
  font-size: 64px;          /* Bigger font */
  color: white;
  background: transparent;   /* Transparent background */
  white-space: nowrap;
}

.cursor {
  display: inline-block;
  animation: blink 0.8s infinite;
  font-weight: bold;
}
@keyframes blink {
  0%, 50%, 100% { opacity: 1; }
  25%, 75% { opacity: 0; }
}
</style>