<template>
  <div :class="'diamond-shape '+diamondClass">
    <v-text :propValue="element.propValue" :element="element" />
    <svg 
    class="diamond-svg" 
    :style="svgStyle"
    :id="svgId" 
    :width="wrapperWidth" 
    :height="wrapperHeight"></svg>
  </div>
</template>

<script>
import rough from 'roughjs/bundled/rough.esm.js';
import { mapState } from 'vuex';

export default {
  name: 'DiamondShape',
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
      diamondClass: 'diamond-shape'+new Date().getTime(),
      svgId: 'diamond-svg'+new Date().getTime(),
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
        this.draw();
        this.update();
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
      svg.appendChild(rc.polygon(
        [
          [this.wrapperWidth/2, 2],
          [this.wrapperWidth-2, this.wrapperHeight/2],
          [this.wrapperWidth/2, this.wrapperHeight-2],
          [2, this.wrapperHeight/2],
        ],
        {
          ...this.element.svgStyle,
        },
      ));
    },
    update() {
      const diamond = document.getElementsByClassName(this.diamondClass)[0];
      this.wrapperWidth = diamond.clientWidth;
      this.wrapperHeight = diamond.clientHeight;
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
  .diamond-svg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
}
</style>