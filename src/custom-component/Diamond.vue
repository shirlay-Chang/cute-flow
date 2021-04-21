<template>
  <div class="diamond-shape">
    <v-text :propValue="element.propValue" :element="element" />
    <canvas id="diamond-shape-canvas" width="200" height="200"></canvas>
  </div>
</template>

<script>
import rough from 'roughjs/bundled/rough.esm.js'

export default {
  name: 'Diamond',
  props: {
    element: {
      type: Object,
    },
  },
  watch: {
    element(val) {
      console.log(val)
    },
  },
  mounted() {
    setTimeout(() => {
      this.draw()
    }, 0)
  },
  methods: {
    draw() {
      let rc = rough.canvas(document.getElementById('diamond-shape-canvas'))
      rc.polygon(
        [
          [100, 2],
          [198, 100],
          [100, 198],
          [2, 100],
        ],
        {
          stroke: 'black',
          strokeWidth: 1,
          // fill: 'rgba(0,0,255,0.2)',
          // fillStyle: 'solid'
        },
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.diamond-shape {
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
  .v-text {
    position: absolute;
    z-index: 1;
  }
  #diamond-shape-canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>