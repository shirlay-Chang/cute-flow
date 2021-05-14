<template>
  <div class="bg" v-if="show">
    <el-button @click="save" class="save">保存图片</el-button>
    <el-button @click="close" class="close">关闭</el-button>
    <div class="img-container">
      <img :src="imgUrl"/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import html2canvas from 'html2canvas';

export default {
  model: {
    prop: 'show',
    event: 'change',
  },
  data() {
    return {
      canvas: '',
      imgUrl: '',
    };
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
    show(val) {
      if (val) {
        document.getElementsByClassName('grid')[0].style.display = 'none';
        html2canvas(document.getElementById('editor')).then((canvas) => {
          this.canvas = canvas;
          this.imgUrl = canvas.toDataURL();
        });
      } else {
        document.getElementsByClassName('grid')[0].style.display = 'block';
      }
    },
  },
  methods: {
    close() {
      this.$emit('change', false);
    },

    save() {
      const a = document.createElement('a');
      a.href = this.canvas.toDataURL();
      a.download = new Date().getTime()+'.png';
      a.click();
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

  .img-container {
    background: #fff;
    width: calc(100% - 30px);
    height: calc(100% - 120px);
    img {
      display: block;
      height: 100%;
      margin:0 auto;
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