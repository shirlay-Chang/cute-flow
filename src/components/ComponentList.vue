<template>
  <div @dragstart="handleDragStart" class="component-list">
    <div
      v-for="(item, index) in componentList"
      :key="index"
      class="list"
      draggable
      :data-index="index"
    >
      <span class="iconfont" :class="'icon-' + item.icon"></span>
      <!-- <span>{{ item.label }}</span> -->
    </div>
  </div>
</template>

<script>

import componentList from '@/custom-component/component-list';

export default {
  data() {
    return {
      componentList,
    };
  },
  methods: {
    handleDragStart(e) {
      e.dataTransfer.setData('index', e.target.dataset.index);
    },
  },
};
</script>

<style lang="scss" scoped>
.component-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10px;

  .list {
    width: 45%;
    cursor: grab;
    text-align: center;
    color: #74b3e9;
    padding: 2px 5px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:active {
      cursor: grabbing;
    }

    .iconfont {
      margin-right: 4px;
      width: 50px;
      height: 50px;
    }

    .icon-diamond{
      background: url('../assets/iconfont/diamond.png') no-repeat top left;
      background-size: 100% 100%;
    }
    .icon-circle{
      background: url('../assets/iconfont/circle.png') no-repeat top left;
      background-size: 100% 100%;
    }
    .icon-rect{
      background: url('../assets/iconfont/rect.png') no-repeat top left;
      background-size: 100% 100%;
    }
    .icon-picture{
      background: url('../assets/iconfont/picture.png') no-repeat top left;
      background-size: 100% 100%;
    }
    .icon-text{
      background: url('../assets/iconfont/text.png') no-repeat top left;
      background-size: 100% 100%;
    }
    .icon-arrow-r{
      background: url('../assets/iconfont/arrow-r.png') no-repeat top left;
      background-size: 100% 100%;
    }
    .icon-arrow-l{
      background: url('../assets/iconfont/arrow-r.png') no-repeat top left;
      background-size: 100% 100%;
      transform: rotate(-180deg);
    }
    .icon-line{
      background: url('../assets/iconfont/line.png') no-repeat top left;
      background-size: 100% 100%;
    }
    .icon-polygon{
      background: url('../assets/iconfont/polygon.png') no-repeat top left;
      background-size: 100% 90%;
    }
  }
}
</style>