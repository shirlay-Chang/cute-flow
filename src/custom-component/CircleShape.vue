<template>
  <div class="circle-shape">
    <v-text :propValue="element.propValue" :element="element" />
    <svg 
    class="circle-svg" 
    :style="svgStyle"
    :id="svgId" 
    width="200" 
    height="200"></svg>
  </div>
</template>

<script>
import rough from 'roughjs/bundled/rough.esm.js';

export default {
  name: 'circle-shape',
  props: {
    element: {
      type: Object,
    },
  },
  data() {
    return {
      svgId: 'circle-svg'+new Date().getTime(),
      wrapperWidth: 200,
      wrapperHeight: 200,
    };
  },
  computed: {
    svgStyle() {
      return {
        transform: `scale(${(this.wrapperWidth / 200).toFixed(2)}, ${(this.wrapperHeight / 200).toFixed(2)})`,
        transformOrigin: 'left top',
      };
    },
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
      const svg = document.getElementById(this.svgId);
      const rc = rough.svg(svg);
      svg.appendChild(rc.circle(
        100, 100, 190,
        {
          stroke: 'black',
          strokeWidth: 1,
          // fill: 'rgba(0,0,255,0.2)',
          // fillStyle: 'solid'
        },
      ));
    },
    update() {
      const circle = document.getElementsByClassName('circle-shape')[0];
      this.wrapperWidth = circle.clientWidth;
      this.wrapperHeight = circle.clientHeight;
    },
  },
};
</script>

<style lang="scss" scoped>
.circle-shape {
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
  .v-text {
    position: absolute;
    z-index: 1;
  }
  .circle-svg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
}
</style>