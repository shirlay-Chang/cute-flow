<template>
  <div :class="'arrow-shape '+arrowClass">
    <v-text :propValue="element.propValue" :element="element" />
    <svg 
    class="arrow-svg" 
    :id="svgId" 
    :width="wrapperWidth" 
    :height="wrapperHeight"></svg>
  </div>
</template>

<script>
import rough from 'roughjs/bundled/rough.esm.js';
import { mapState } from 'vuex';

export default {
  name: 'rightArrowShape',
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
      arrowClass: 'arrow-shape'+new Date().getTime(),
      svgId: 'arrow-svg'+new Date().getTime(),
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
      svg.appendChild(rc.path(`M2 ${this.wrapperHeight/3} 
      H ${this.wrapperWidth/2} 
      L ${this.wrapperWidth/2} 0  
      L ${this.wrapperWidth} ${this.wrapperHeight/2} 
      L ${this.wrapperWidth/2} ${this.wrapperHeight} 
      L ${this.wrapperWidth/2} ${2*this.wrapperHeight/3} 
      L 2 ${2*this.wrapperHeight/3}  
      L 2 ${this.wrapperHeight/3} `, { 
        ...this.element.svgStyle,
      }));
    },
    update() {
      const arrow = document.getElementsByClassName(this.arrowClass)[0];
      this.wrapperWidth = arrow.clientWidth;
      this.wrapperHeight = arrow.clientHeight;
    },
  },
};
</script>

<style lang="scss" scoped>
.arrow-shape {
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
  .v-text {
    position: absolute;
    z-index: 1;
  }
  .arrow-svg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
}
</style>