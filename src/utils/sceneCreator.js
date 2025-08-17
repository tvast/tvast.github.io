import * as THREE from 'three';

export function createScene(canvas, donutCount = 100) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: false });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000080);

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(5, 5, 5);
  scene.add(ambientLight, pointLight);

  // Hoop & Icosahedron
  const hoopGeometry = new THREE.TorusGeometry(1, 0.05, 16, 100);
  const hoopMaterial = new THREE.MeshStandardMaterial({ color: 0xffaa00, metalness: 0.5, roughness: 0.3 });
  const hoop = new THREE.Mesh(hoopGeometry, hoopMaterial);
  scene.add(hoop);

  const icoGeometry = new THREE.IcosahedronGeometry(0.3, 1);
  const icoMaterial = new THREE.MeshStandardMaterial({ color: 0x00aaff, metalness: 0.5, roughness: 0.3 });
  const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
  hoop.add(icosahedron);

  // Donuts
  const donuts = [];
  const colors = [0xA7D8D8, 0xF1D0A0, 0xA1D6B4, 0xE4A6A1, 0xD1D9D1];
  const canvasTexture = document.createElement('canvas');
  canvasTexture.width = 256;
  canvasTexture.height = 256;
  const ctx = canvasTexture.getContext('2d');

  for (let i = 0; i < donutCount; i++) {
    const geometry = new THREE.TorusGeometry(Math.random() * 0.5 + 0.2, 0.1, 16, 100);
    const texture = new THREE.CanvasTexture(canvasTexture);
    const material = new THREE.MeshBasicMaterial({ map: texture, color: colors[i % colors.length] });
    const donut = new THREE.Mesh(geometry, material);
    donut.position.set((Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5);
    donut.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    scene.add(donut);
    donuts.push(donut);
  }

  // Star Field
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 1000;
  const starPositions = [];
  for (let i = 0; i < starCount; i++) {
    starPositions.push((Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100);
  }
  starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
  const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5, transparent: true, opacity: 0.2 });
  const starField = new THREE.Points(starGeometry, starMaterial);
  scene.add(starField);

  return { scene, camera, renderer, hoop, icosahedron, donuts };
}