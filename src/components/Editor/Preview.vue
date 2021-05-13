<template>
  <div class="bg" v-if="show">
    <el-button @click="save" class="save">保存</el-button>
    <el-button @click="close" class="close">关闭</el-button>
    <div class="canvas-container">
      <div class="canvas" id="previewCanvas">
        <component
          v-for="(item, index) in componentData"
          :key="item.id"
          :index="index"
          class="component"
          :is="item.component"
          :style="getStyle(item.style)"
          :propValue="item.propValue"
          :element="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getStyle } from '@/utils/style';
import { mapState } from 'vuex';
import { changeStyleWithScale } from '@/utils/translate';
import html2canvas from 'html2canvas';

export default {
  model: {
    prop: 'show',
    event: 'change',
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  components: { 
  },
  computed: mapState(['componentData', 'canvasStyleData']),
  watch: {
  },
  methods: {
    changeStyleWithScale,

    getStyle,

    close() {
      this.$emit('change', false);
    },

    save() {
      html2canvas(document.getElementById('previewCanvas')).then((canvas) => {
        const a = document.createElement('a');
        a.href = canvas.toDataURL();
        a.download = new Date().getTime()+'.png';
        a.click();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.bg {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  background: rgb(0, 0, 0, 0.5);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;

  .canvas-container {
    width: calc(100% - 30px);
    height: calc(100% - 120px);
    .canvas {
      background: #fff;
      position: relative;
      margin: auto;
      width: 100%;
      height: 100%;
      overflow: auto;
    }
  }

  .save{
    position: absolute;
    right: 100px;
    top: 20px;
  }

  .close {
    position: absolute;
    right: 20px;
    top: 20px;
  }
}
</style>