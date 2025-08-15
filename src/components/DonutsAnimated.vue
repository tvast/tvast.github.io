<template>
  <div class="donut-container">
    <pre v-html="frame"></pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      frame: '',
      A: 0,
      B: 0,
    };
  },
  mounted() {
    this.interval = setInterval(this.renderFrame, 50);
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
  methods: {
    renderFrame() {
      const width = 60;
      const height = 30;
      const output = Array.from({ length: height }, () => Array(width).fill(' '));
      const colorBuffer = Array.from({ length: height }, () => Array(width).fill('white'));
      const zbuffer = Array.from({ length: height }, () => Array(width).fill(0));
      const chars = '.,-~:;=!*#$@';
      const { A, B } = this;

      for (let theta = 0; theta < 2 * Math.PI; theta += 0.07) {
        for (let phi = 0; phi < 2 * Math.PI; phi += 0.02) {
          const cosTheta = Math.cos(theta),
            sinTheta = Math.sin(theta);
          const cosPhi = Math.cos(phi),
            sinPhi = Math.sin(phi);

          const h = cosTheta * 2 + 3;
          const D = 1 / (sinTheta * h * Math.sin(A) + sinPhi * Math.cos(B) + 5);
          const t = sinTheta * h * Math.cos(A) - cosPhi * Math.sin(B);

          const x = Math.floor(width / 2 + width * D * (cosPhi * cosTheta * Math.cos(B) - t));
          const y = Math.floor(height / 2 - height * D * (cosPhi * cosTheta * Math.sin(B) + t));

          if (y >= 0 && y < height && x >= 0 && x < width && D > zbuffer[y][x]) {
            zbuffer[y][x] = D;
            const luminance = Math.floor(8 * ((cosPhi * cosTheta * Math.sin(B) - t) / 2 + 1));
            output[y][x] = chars[Math.max(0, Math.min(chars.length - 1, luminance))];

            if (luminance < 3) colorBuffer[y][x] = 'blue';
            else if (luminance < 6) colorBuffer[y][x] = 'white';
            else colorBuffer[y][x] = 'red';
          }
        }
      }

      // Wrap each character per line in <span> to avoid broken HTML
      const html = output
        .map((row, y) =>
          row
            .map((char, x) => `<span style="color:${colorBuffer[y][x]}">${char}</span>`)
            .join('')
        )
        .join('<br>');

      this.frame = html;
      this.A += 0.07;
      this.B += 0.03;
    },
  },
};
</script>

<style scoped>
.donut-container {
  font-family: monospace;
  white-space: pre;
  line-height: 75%;
  text-align: center;
  font-size: 10px;
}
</style>

