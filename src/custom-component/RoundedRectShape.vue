<template>
  <div :class="'roundedrect-shape '+roundedrectClass">
    <v-text :propValue="element.propValue" :element="element" />
    <svg 
    class="roundedrect-svg" 
    :id="svgId" 
    :width="wrapperWidth" 
    :height="wrapperHeight"></svg>
  </div>
</template>

<script>
import rough from 'roughjs/bundled/rough.esm.js';
import { mapState } from 'vuex';

export default {
  name: 'RoundedrectShape',
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
      roundedrectClass: 'roundedrect-shape'+new Date().getTime(),
      svgId: 'roundedrect-svg'+new Date().getTime(),
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
      svg.appendChild(rc.arc(10, 200, 200, 180, Math.PI, Math.PI * 1.6, false, { 
        ...this.element.svgStyle,
      }));
      // svg.appendChild(rc.rectangle(2, 2, this.wrapperWidth-4, this.wrapperHeight-4, { 
      //   ...this.element.svgStyle,
      // }));
    },
    update() {
      const roundedrect = document.getElementsByClassName(this.roundedrectClass)[0];
      this.wrapperWidth = roundedrect.clientWidth;
      this.wrapperHeight = roundedrect.clientHeight;
    },
  },
};
</script>

<style lang="scss" scoped>
.roundedrect-shape {
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
  .v-text {
    position: absolute;
    z-index: 1;
  }
  .roundedrect-svg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
}
</style>