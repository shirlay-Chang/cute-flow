<template>
    <div style="overflow: hidden">
        <img :src="imgUrl">
    </div>
</template>

<script>
export default {
  props: {
    propValue: {
      type: String,
      require: true,
    },
  },
  computed: {
    imgUrl() {
      return this.propValue;
    },
  },
};
</script>

<style lang="scss" scoped>
img {
    width: 100%;
    height: 100%;
}
</style>