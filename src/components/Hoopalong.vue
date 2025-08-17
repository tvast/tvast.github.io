<template>
  <div class="row">
    <div class="col-12">
      <div class="grid-content bg-purple" ref="threeContainer">
        <audio ref="audioFile" loop preload="auto">
          <source :src="song" type="audio/mp3" />
        </audio>
        <canvas ref="canvas"></canvas>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-24 col-sm-24 col-md-8"></div>
    <div class="col-xs-24 col-sm-24 col-md-8">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title">Hoopalong</h5>
        </div>
        <div class="card-body">
          <a class="btn-11" @click="togglePlayback">
            {{ isPlaying ? "Pause" : "Play" }}
          </a>
        </div>
      </div>
    </div>
    <div class="col-xs-24 col-sm-24 col-md-8"></div>
  </div>
</template>

<script>
import * as THREE from "three";

class AudioAnalyzer {
  constructor(audioContext, source, fftSize = 2048) {
    this.audioContext = audioContext;
    this.source = source;
    this.fftSize = fftSize;
    this.analyser = audioContext.createAnalyser();
    this.analyser.fftSize = fftSize;
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.source.connect(this.analyser);
  }

  getData() {
    this.analyser.getByteFrequencyData(this.dataArray);
    return this.dataArray;
  }
}

export default {
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      hoop: null,
      icosahedron: null,
      audioAnalyzer: null,
      audioContext: null,
      audioSource: null,
      audioLoaded: false,
      isPlaying: false,
      canvasWidth: window.innerWidth,
      canvasHeight: window.innerHeight,
    //   song: "../../public/Canceinterlude.flac",
      song: "/Canceinterlude.flac",
    };
  },

  mounted() {
    this.initThree();
    this.initCanvas();
    const audio = this.$refs.audioFile;
    audio.addEventListener("loadedmetadata", () => {
      this.audioLoaded = true;
      this.initAudio();
    });
  },

  methods: {
    togglePlayback() {
      const audio = this.$refs.audioFile;
      if (this.isPlaying) audio.pause();
      else audio.play();
      this.isPlaying = !this.isPlaying;
    },

    initAudio() {
      if (this.audioContext) return;
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const audio = this.$refs.audioFile;
      this.audioSource = this.audioContext.createMediaElementSource(audio);
      this.audioAnalyzer = new AudioAnalyzer(this.audioContext, this.audioSource);
      this.audioSource.connect(this.audioContext.destination);
    },

    initCanvas() {
      const canvas = this.$refs.canvas;
      canvas.width = this.canvasWidth;
      canvas.height = this.canvasHeight;
      this.draw();
    },

    draw() {
      const canvas = this.$refs.canvas;
      if (!canvas || !this.audioAnalyzer) return;
      const ctx = canvas.getContext("2d");
      const freqData = this.audioAnalyzer.getData();
      const points = this.generateFractalPoints(freqData);

      ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      points.forEach(point => {
        ctx.beginPath();
        ctx.fillStyle = point.color;
        ctx.arc(point.x, point.y, point.size, 0, 2 * Math.PI);
        ctx.fill();
        point.x += point.speedX;
        point.y += point.speedY;
        if (point.x < 0 || point.x > this.canvasWidth) point.speedX *= -1;
        if (point.y < 0 || point.y > this.canvasHeight) point.speedY *= -1;
      });

      requestAnimationFrame(this.draw.bind(this));
    },

    generateFractalPoints(freqData) {
      const points = [];
      const numPoints = 500;
      const minSpeed = 0.01;
      const maxSpeed = 0.05;
      const colors = ["#03A9F4", "#FFEB3B", "#0e1820", "#0f334d", "#0b5d85", "#b8b7c5", "#f0dde0"];

      for (let i = 0; i < numPoints; i++) {
        const x = Math.random() * this.canvasWidth;
        const y = Math.random() * this.canvasHeight;
        const speedX = minSpeed + Math.random() * (maxSpeed - minSpeed);
        const speedY = minSpeed + Math.random() * (maxSpeed - minSpeed);
        const intensity = freqData[Math.floor((x / this.canvasWidth) * freqData.length)];
        const size = 5 + (intensity / 255) * 50;
        const colorIndex = Math.floor((intensity / 255) * (colors.length - 1));
        points.push({ x, y, speedX, speedY, size, color: colors[colorIndex] });
      }
      return points;
    },

    initThree() {
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      this.camera.position.z = 5;

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.$refs.threeContainer.appendChild(this.renderer.domElement);

      // Torus
      const torusGeometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
      const torusMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      this.hoop = new THREE.Mesh(torusGeometry, torusMaterial);
      this.scene.add(this.hoop);

      // Icosahedron with texture
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load("../../public/O.jpeg", texture => {
        const icoGeometry = new THREE.IcosahedronGeometry(1, 1);
        const icoMaterial = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.7,
          metalness: 0.2,
        });
        this.icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
        this.icosahedron.position.x = 3;
        this.scene.add(this.icosahedron);
      });

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
      this.scene.add(ambientLight);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(5, 5, 5);
      this.scene.add(directionalLight);

      this.animate();
    },

    animate() {
      requestAnimationFrame(this.animate.bind(this));

      if (this.hoop && this.audioAnalyzer) {
        const data = this.audioAnalyzer.getData();
        const avg = data.reduce((a, b) => a + b, 0) / data.length;
        this.hoop.rotation.x += 0.01;
        this.hoop.rotation.y += 0.01 * (avg / 128);
      }

      window.addEventListener("resize", () => {
  this.canvasWidth = window.innerWidth;
  this.canvasHeight = window.innerHeight;
  this.$refs.canvas.width = this.canvasWidth;
  this.$refs.canvas.height = this.canvasHeight;

  if (this.camera) {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }
  if (this.renderer) {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
});
    },
  },
};
</script>

<style scoped>
.grid-content {
  position: relative;
  width: 100%;
  height: 500px;
}
canvas {
  position: absolute;
  top: 0;
  left: 0;
}
.btn-11 {
  cursor: pointer;
  padding: 10px 20px;
  background: #ff4081;
  color: white;
  border-radius: 5px;
  display: inline-block;
}
</style>