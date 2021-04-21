<template>
  <div class="diamond-shape">
    <v-text :propValue="element.propValue" :element="element" />
    <canvas class="diamond-canvas" @mousedown="hanldeMousedownOnCanvas" :id="canvasId" width="200" height="200"></canvas>
  </div>
</template>

<script>
import rough from 'roughjs/bundled/rough.esm.js';

export default {
  name: 'Diamond',
  props: {
    element: {
      type: Object,
    },
  },
  data() {
    return {
      canvasId: 'diamond-canvas'+new Date().getTime(),
    };
  },
  watch: {
    element(val) {
      console.log(val);
    },
  },
  mounted() {
    setTimeout(() => {
      this.draw();
    }, 0);
  },
  methods: {
    draw() {
      let rc = rough.canvas(document.getElementById(this.canvasId));
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
      );
    },
    hanldeMousedownOnCanvas() {
    },
  },
};
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
  .diamond-canvas {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
}
</style>