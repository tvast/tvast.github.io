<template>
  <div ref="cloud" class="word-cloud"></div>
</template>

<script>
import cloud from 'd3-cloud'
import * as d3 from 'd3'

export default {
  name: 'SkillCloud',
  props: {
    skills: {
      type: Array,
      required: true
    }
  },
  mounted() {
    this.drawCloud()
  },
  methods: {
    drawCloud() {
      const width = 400
      const height = 400

      const draw = words => {
        d3.select(this.$refs.cloud).selectAll('*').remove()

        d3.select(this.$refs.cloud)
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', `translate(${width / 2}, ${height / 2})`)
          .selectAll('text')
          .data(words)
          .enter().append('text')
          .style('font-size', d => d.size + 'px')
          .style('font-family', 'Impact')
          .style('fill', () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
          .attr('text-anchor', 'middle')
          .attr('transform', d => `translate(${d.x},${d.y})rotate(${d.rotate})`)
          .text(d => d.text)
      }

      const layout = cloud()
        .size([width, height])
        .words(this.skills.map(skill => ({
          text: skill,
          size: 10 + Math.random() * 30
        })))
        .padding(5)
        .rotate(() => ~~(Math.random() * 2) * 90)
        .font('Impact')
        .fontSize(d => d.size)
        .on('end', draw)

      layout.start()
    }
  }
}
</script>

<style scoped>
.word-cloud {
  width: 400px;
  height: 400px;
  margin: 2rem auto;
}
</style>

