<template>
  <div :class="'circle-shape '+circleClass">
    <v-text :propValue="element.propValue" :element="element" />
    <svg 
    class="circle-svg" 
    :id="svgId" 
    :width="wrapperWidth" 
    :height="wrapperHeight"></svg>
  </div>
</template>

<script>
import rough from 'roughjs/bundled/rough.esm.js';
import { mapState } from 'vuex';

export default {
  name: 'circleShape',
  props: {
    element: {
      type: Object,
    },
    componentId: {
      type: Number,
    },
  },
  data() {
    return {
      circleClass: 'circle-shape'+new Date().getTime(),
      svgId: 'circle-svg'+new Date().getTime(),
      wrapperWidth: 200,
      wrapperHeight: 200,
    };
  },
  computed: mapState([
    'curComponent',
    'canvasStyleData',
  ]),
  watch: {
    curComponent() {
      if (this.componentId == this.$store.state.curComponentIndex) {
        this.update();
        this.draw();
      }
    },
    canvasStyleData() {
      this.draw();
      this.update();
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
      while (svg.lastChild) {
        svg.removeChild(svg.lastChild);
      }
      const rc = rough.svg(svg);
      svg.appendChild(rc.ellipse(
        this.wrapperWidth / 2,
        this.wrapperHeight / 2,
        this.wrapperWidth-10,
        this.wrapperHeight-10, 
        { 
          ...this.element.svgStyle,
        },
      ));
    },
    update() {
      const circle = document.getElementsByClassName(this.circleClass)[0];
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