<template>
  <div :class="'line-shape '+lineClass">
    <v-text :propValue="element.propValue" :element="element" />
    <svg 
    class="line-svg" 
    :style="svgStyle"
    :id="svgId" 
    width="200" 
    height="20"></svg>
  </div>
</template>

<script>
import rough from 'roughjs/bundled/rough.esm.js';

export default {
  name: 'LineShape',
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
      lineClass: 'line-shape'+new Date().getTime(),
      svgId: 'line-svg'+new Date().getTime(),
      wrapperWidth: 200,
      wrapperHeight: 20,
    };
  },
  computed: {
    svgStyle() {
      return {
        transform: `scale(${(this.wrapperWidth / 200).toFixed(2)}, ${(this.wrapperHeight / 20).toFixed(2)})`,
        transformOrigin: 'left top',
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
      svg.appendChild(rc.line(0, this.wrapperHeight/2, this.wrapperWidth, this.wrapperHeight/2, {
        ...this.element.svgStyle,
      }));
    },
    update() {
      const line = document.getElementsByClassName(this.lineClass)[0];
      this.wrapperWidth = line.clientWidth;
      this.wrapperHeight = line.clientHeight;
    },
  },
};
</script>

<style lang="scss" scoped>
.line-shape {
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
  .v-text {
    position: absolute;
    z-index: 1;
  }
  .line-svg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
}
</style>