<template>
  <div :class="'polygon-shape '+polygonClass">
    <v-text :propValue="element.propValue" :element="element" />
    <svg 
    class="polygon-svg" 
    :id="svgId" 
    :width="wrapperWidth" 
    :height="wrapperHeight"></svg>
  </div>
</template>

<script>
import rough from 'roughjs/bundled/rough.esm.js';
import { mapState } from 'vuex';

export default {
  name: 'PolygonShape',
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
      polygonClass: 'polygon-shape'+new Date().getTime(),
      svgId: 'polygon-svg'+new Date().getTime(),
      wrapperWidth: 200,
      wrapperHeight: 130,
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
      svg.appendChild(rc.polygon([[40, 2], 
        [this.wrapperWidth-42, 2],
        [this.wrapperWidth-2, this.wrapperHeight/2], 
        [this.wrapperWidth-42, this.wrapperHeight-2], 
        [42, this.wrapperHeight-2],
        [2, this.wrapperHeight/2],
      ], { 
        ...this.element.svgStyle,
      }));
    },
    update() {
      const polygon = document.getElementsByClassName(this.polygonClass)[0];
      this.wrapperWidth = polygon.clientWidth;
      this.wrapperHeight = polygon.clientHeight;
    },
  },
};
</script>

<style lang="scss" scoped>
.polygon-shape {
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
  .v-text {
    position: absolute;
    z-index: 1;
  }
  .polygon-svg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
}
</style>