<template>
  <div :class="'rect-shape '+rectClass">
    <v-text :propValue="element.propValue" :element="element" />
    <svg 
    class="rect-svg" 
    :style="svgStyle"
    :id="svgId" 
    :width="wrapperWidth" 
    :height="wrapperHeight"></svg>
  </div>
</template>

<script>
import rough from 'roughjs/bundled/rough.esm.js';

export default {
  name: 'RectShape',
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
      rectClass: 'rect-shape'+new Date().getTime(),
      svgId: 'rect-svg'+new Date().getTime(),
      wrapperWidth: 200,
      wrapperHeight: 200,
    };
  },
  computed: {
    svgStyle() {
      return {
        // transform: `scale(${(this.wrapperWidth / 200).toFixed(2)}, ${(this.wrapperHeight / 200).toFixed(2)})`,
        // transformOrigin: 'left top',
      };
    },
    curComponent() {
      return this.$store.state.curComponent;
    },
  },
  watch: {
    curComponent() {
      if (this.componentId == this.$store.state.curComponentIndex) {
        this.update();
        this.draw();
      }
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
      svg.appendChild(rc.rectangle(2, 2, this.wrapperWidth-4, this.wrapperHeight-4, { 
        ...this.element.svgStyle,
      }));
    },
    update() {
      const rect = document.getElementsByClassName(this.rectClass)[0];
      this.wrapperWidth = rect.clientWidth;
      this.wrapperHeight = rect.clientHeight;
    },
  },
};
</script>

<style lang="scss" scoped>
.rect-shape {
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
  .v-text {
    position: absolute;
    z-index: 1;
  }
  .rect-svg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
}
</style>