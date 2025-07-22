<template>
  <div ref="container" class="three-container"></div>
</template>

<script>
import * as THREE from 'three'
import cloud from 'd3-cloud'

export default {
  name: 'ThreeWordCloud',
 props: {
  skills: {
    type: Array,
    default: () => []
  }
},
  mounted() {
    this.initThree()
  },
  beforeDestroy() {
    cancelAnimationFrame(this.animationId)
    this.renderer.dispose()
  },
  methods: {
    initThree() {
      const width = this.$refs.container.clientWidth
      const height = this.$refs.container.clientHeight

      // Scene setup
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
      this.camera.position.z = 500

      this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      this.renderer.setSize(width, height)
      this.$refs.container.appendChild(this.renderer.domElement)

      // Generate cloud layout (position + rotation + size)
      cloud()
        .size([width, height])
        .words(this.skills.map(word => ({ text: word, size: 10 + Math.random() * 40 })))
        .padding(5)
        .rotate(() => (Math.random() > 0.5 ? 0 : 90))
        .font('Impact')
        .fontSize(d => d.size)
        .on('end', words => this.addWords(words, width, height))
        .start()

      window.addEventListener('resize', this.onResize)
    },

    addWords(words, width, height) {
      this.wordMeshes = []

      words.forEach(word => {
        const sprite = this.createTextSprite(word.text, word.size)
        sprite.position.set(word.x - width / 2, word.y - height / 2, 0) // center the cloud
        sprite.rotation.z = (word.rotate * Math.PI) / 180
        this.scene.add(sprite)
        this.wordMeshes.push(sprite)
      })

      this.animate()
    },

    createTextSprite(text, fontSize) {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')

      const font = `${fontSize}px Impact`
      context.font = font

      const textWidth = context.measureText(text).width
      canvas.width = textWidth
      canvas.height = fontSize * 1.2

      // Set again after resizing canvas (resets context)
      context.font = font
      context.fillStyle = '#'+Math.floor(Math.random()*16777215).toString(16)  // random color
      context.fillText(text, 0, fontSize)

      const texture = new THREE.CanvasTexture(canvas)
      texture.minFilter = THREE.LinearFilter

      const material = new THREE.SpriteMaterial({ map: texture })
      const sprite = new THREE.Sprite(material)
      sprite.scale.set(canvas.width, canvas.height, 1)
      return sprite
    },

    animate() {
      this.animationId = requestAnimationFrame(this.animate)

      // Simple rotation of whole scene (or word group)
      this.scene.rotation.y += 0.002

      this.renderer.render(this.scene, this.camera)
    },

    onResize() {
      const width = this.$refs.container.clientWidth
      const height = this.$refs.container.clientHeight

      this.camera.aspect = width / height
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(width, height)
    }
  }
}
</script>

<style scoped>
.three-container {
  width: 100%;
  height: 500px;
  background-color: #000;
}
</style>
