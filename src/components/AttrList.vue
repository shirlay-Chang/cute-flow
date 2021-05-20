<template>
  <div class="attr-list">
    <el-form>
      <!-- 样式 -->
      <el-form-item
        v-for="(key) in styleKeys.filter((item) => item != 'rotate')"
        :key="key"
        :label="map[key]"
      >
        <el-color-picker
          v-if="key == 'color'"
          v-model="editComponent.style[key]"
          @change="changeAttr($event,'style',key)"
        ></el-color-picker>
        <el-select
          v-else-if="key == 'textAlign'"
          v-model="editComponent.style[key]"
          @change="changeAttr($event,'style',key)"
        >
          <el-option
            v-for="item in textAlignOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select
          v-else-if="key == 'verticalAlign'"
          v-model="editComponent.style[key]"
          @change="changeAttr($event,'style',key)"
        >
          <el-option
            v-for="item in verticalAlignOptions"
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

      <!-- svg样式 -->
      <el-form-item
        v-for="(key) in svgStyleKeys"
        :key="key"
        :label="map[key]"
      >
        <el-color-picker
          v-if="key == 'stroke'"
          v-model="editComponent.svgStyle[key]"
          @change="changeAttr($event,'svgStyle',key)"
        ></el-color-picker>
        <el-color-picker
          v-else-if="key == 'fill'"
          v-model="editComponent.svgStyle[key]"
          @change="changeAttr($event,'svgStyle',key)"
        ></el-color-picker>
        <el-select
          v-else-if="key == 'fillStyle'"
          v-model="editComponent.svgStyle[key]"
          @change="changeAttr($event,'svgStyle',key)"
        >
          <el-option
            v-for="item in fillStyleOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input 
        type="number" 
        @input="changeAttr($event,'svgStyle',key)" 
        :step="key == 'curveFitting' ? 0.1 : 1"
        :max="key == 'curveFitting' ? 1 : 800"
        v-else 
        v-model="editComponent.svgStyle[key]" />
      </el-form-item>

      <!-- 文本内容 -->
      <el-form-item
        label="内容"
        v-if="editComponent && editComponent.component!='Group' && editComponent.component!='Picture'"
      >
        <el-input 
        type="textarea" 
        @input="changeAttr($event,'propValue')" 
        v-model="editComponent.propValue" />
      </el-form-item>

      <!-- 图片内容 -->
      <el-form-item
        label="图片"
        v-else
      >
        <input 
        type="file" 
        @change="handleFileChange" 
        id="input" />
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { deepCopy } from '@/utils/utils';
import toast from '@/utils/toast';

export default {
  data() {
    return {
      textAlignOptions: [
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
      verticalAlignOptions: [
        {
          label: '上对齐',
          value: 'top',
        },
        {
          label: '居中',
          value: 'middle',
        },
        {
          label: '下对齐',
          value: 'botttom',
        },
      ],
      fillStyleOptions: [
        {
          label: '细线',
          value: 'hachure',
        },
        {
          label: '填充',
          value: 'solid',
        },
        {
          label: '之字线',
          value: 'zigzag',
        },
        {
          label: '交叉线',
          value: 'cross-hatch',
        },
        {
          label: '点',
          value: 'dots',
        },
        {
          label: '曲折线',
          value: 'zigzag-line',
        },
      ],
      map: {
        left: 'x 坐标',
        top: 'y 坐标',
        height: '高',
        width: '宽',
        color: '字体颜色',
        borderWidth: '边框宽度',
        borderColor: '边框颜色',
        borderRadius: '边框半径',
        fontSize: '字体大小',
        fontWeight: '字体粗细',
        lineHeight: '行高',
        letterSpacing: '字间距',
        textAlign: '水平对齐方式',
        verticalAlign: '垂直对齐方式',
        opacity: '透明度',
        roughness: '粗糙度',
        bowing: '线条弯曲',
        stroke: '边框线条颜色',
        strokeWidth: '边框线条宽度',
        fill: '填充线条颜色',
        fillWeight: '填充线条宽度',
        fillStyle: '背景样式',
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
        ? Object.keys(this.$store.state.curComponent.style)
        : [];
    },
    svgStyleKeys() {
      return this.$store.state.curComponent
        ? Object.keys(this.$store.state.curComponent.svgStyle)
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
    handleFileChange(e) {
      console.log(e);
      const file = e.target.files[0];
      if (!file.type.includes('image')) {
        toast('只能插入图片');
        return;
      }

      const reader = new FileReader();
      reader.onload = (res) => {
        const fileResult = res.target.result;
        const img = new Image();
        img.onload = () => {
          // let scaleImage = img.width > 400;
          this.changeAttr(fileResult, 'propValue');

          // this.$store.commit('addComponent', {
          //   component: {
          //     ...commonAttr,
          //     id: generateID(),
          //     component: 'Picture',
          //     label: '图片',
          //     icon: '',
          //     propValue: fileResult,
          //     style: {
          //       ...commonStyle,
          //       top: 0,
          //       left: 0,
          //       width: scaleImage ? img.width / 3 : img.width,
          //       height: scaleImage ? img.height / 3 : img.height,
          //     },
          //     svgStyle: {},
          //   },
          // });
          // this.$store.commit('recordSnapshot');
        };

        img.src = fileResult;
      };

      reader.readAsDataURL(file);
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