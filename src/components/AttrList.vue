<template>
  <div class="attr-list">
    <el-form>
      <el-form-item
        v-for="(key, index) in styleKeys.filter((item) => item != 'rotate')"
        :key="index"
        :label="map[key]"
      >
        <el-color-picker
          v-if="key == 'borderColor'"
          v-model="editComponent.style[key]"
          @change="changeAttr($event,'style',key)"
        ></el-color-picker>
        <el-color-picker
          v-else-if="key == 'color'"
          v-model="editComponent.style[key]"
          @change="changeAttr($event,'style',key)"
        ></el-color-picker>
        <el-color-picker
          v-else-if="key == 'backgroundColor'"
          v-model="editComponent.style[key]"
          @change="changeAttr($event,'style',key)"
        ></el-color-picker>
        <el-slider
          v-else-if="key == 'roughness'"
          v-model="editComponent.svgStyle[key]"
          @change="changeAttr($event,'style',key)"
        ></el-slider>
        <el-select
          v-else-if="key == 'textAlign'"
          v-model="editComponent.style[key]"
          @change="changeAttr($event,'style',key)"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input 
        type="number" 
        @input="changeAttr($event,'style',key)" 
        :step="key == 'opacity' ? 0.1 : 1"
        :max="key == 'opacity' ? 1 : 800"
        v-else 
        v-model="editComponent.style[key]" />
      </el-form-item>
      <el-form-item
        label="内容"
        v-if="editComponent && !excludes.includes(editComponent.component)"
      >
        <el-input 
        type="textarea" 
        @input="changeAttr($event,'propValue')" 
        v-model="editComponent.propValue" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { deepCopy } from '@/utils/utils';

export default {
  data() {
    return {
      excludes: ['Picture', 'Group'], // 这些组件不显示内容
      options: [
        {
          label: '左对齐',
          value: 'left',
        },
        {
          label: '居中',
          value: 'center',
        },
        {
          label: '右对齐',
          value: 'right',
        },
      ],
      map: {
        left: 'x 坐标',
        top: 'y 坐标',
        height: '高',
        width: '宽',
        color: '颜色',
        backgroundColor: '背景色',
        borderWidth: '边框宽度',
        borderColor: '边框颜色',
        borderRadius: '边框半径',
        fontSize: '字体大小',
        fontWeight: '字体粗细',
        lineHeight: '行高',
        letterSpacing: '字间距',
        textAlign: '对齐方式',
        opacity: '透明度',
        roughness: '粗糙度',
        bowing: '线条弯曲',
        stroke: '边框线条颜色',
        strokeWidth: '边框线条宽度',
        fill: '填充线条颜色',
        fillWeight: '填充线条宽度',
        fillStyle: '填充线条样式',
        hachureAngle: '填充线条角度',
        hachureGap: '填充线条间距',
        curveStepCount: '曲线程度',
        curveFitting: '曲线拟合',
      },
      editComponent: {
        style: {
          opacity: 1,
          width: 200,
          height: 200,
          fontSize: 14,
          fontWeight: 500,
          lineHeight: '',
          letterSpacing: 0,
          textAlign: 'center',
          color: '',
          backgroundColor: '',
          verticalAlign: 'middle',
        },
        svgStyle: {
          roughness: 1,
          bowing: 1,
          stroke: '#000',
          strokeWidth: 1,
          fill: '#bbdffa',
          fillStyle: 'hachure',
          fillWeight: '1',
          hachureAngle: 60, 
          hachureGap: 4,
          curveStepCount: 9,
          curveFitting: 0.95,
        },
      },
    };
  },
  computed: {
    styleKeys() {
      return this.$store.state.curComponent
        ? Object.keys(this.$store.state.curComponent.style).concat(Object.keys(this.$store.state.curComponent.svgStyle))
        : [];
    },
    curComponent() {
      return this.$store.state.curComponent;
    },
    curComponentIndex() {
      return this.$store.state.curComponentIndex;
    },
    componentData() {
      return this.$store.state.componentData;
    },
  },
  watch: {
    curComponent(val) {
      if (val) {
        this.editComponent = val;
      }
    },
  },
  mounted() {
    this.editComponent = this.curComponent;
  },
  methods: {
    changeAttr(value, prop, key) {
      const newCurComponent = {
        ...this.curComponent,
        [prop]: key ? { 
          ...this.curComponent[prop],
          [key]: value,
        } : value,
      };
      this.$store.commit('setCurComponent', {
        component: newCurComponent,
        index: this.curComponentIndex,
      });

      const componentData = deepCopy(this.componentData);
      componentData[this.curComponentIndex] = newCurComponent;
      this.$store.commit('setComponentData', componentData);
    },
  },
};
</script>

<style lang="scss" scoped>
.attr-list {
  overflow: auto;
  padding: 20px;
  padding-top: 0;
  height: 100%;
}
</style>