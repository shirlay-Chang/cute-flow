// 公共样式
export const commonStyle = {
  rotate: 0,
  opacity: 1,
};

export const commonAttr = {
  animations: [],
  events: {},
  groupStyle: {}, // 当一个组件成为 Group 的子组件时使用
  isLock: false, // 是否锁定组件
};

// 编辑器左侧组件列表
const list = [
  {
    component: 'v-text',
    label: '文字',
    propValue: '双击编辑文字',
    icon: 'text',
    canEdit: true,
    style: {
      width: 200,
      height: 22,
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '',
      letterSpacing: 0,
      textAlign: '',
      color: '',
      opacity: 1,
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
      curveFitting: 1,
    },
  },
  {
    component: 'v-button',
    label: '按钮',
    propValue: '按钮',
    icon: 'button',
    style: {
      width: 100,
      height: 34,
      borderWidth: '',
      borderColor: '',
      borderRadius: '',
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '',
      letterSpacing: 0,
      textAlign: '',
      color: '',
      opacity: 1,
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
      curveFitting: 1,
    },
  },
  {
    component: 'Picture',
    label: '图片',
    icon: 'picture',
    propValue: require('@/assets/title.jpg'),
    style: {
      width: 300,
      height: 200,
      borderRadius: '',
      opacity: 1,
    },
  },
  {
    component: 'rect-shape',
    label: '矩形',
    propValue: '&nbsp;',
    icon: 'rect',
    canEdit: true,
    style: {
      width: 200,
      height: 200,
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '',
      letterSpacing: 0,
      textAlign: 'center',
      color: '',
      verticalAlign: 'middle',
      opacity: 1,
    },
    svgStyle: {
      roughness: 1,
      bowing: 1,
      stroke: '#000',
      strokeWidth: 1,
      fill: '#c0e6ec',
      fillStyle: 'zigzag',
      fillWeight: '1',
      hachureAngle: 60, 
      hachureGap: 4,
      curveStepCount: 9,
      curveFitting: 1,
    },
  },
  {
    component: 'diamond-shape',
    label: '菱形',
    propValue: '&nbsp;',
    icon: 'diamond',
    canEdit: true,
    style: {
      width: 200,
      height: 200,
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '',
      letterSpacing: 0,
      textAlign: 'center',
      color: '',
      verticalAlign: 'middle',
      opacity: 1,
    },
    svgStyle: {
      roughness: 1,
      bowing: 1,
      stroke: '#000',
      strokeWidth: 1,
      fill: '#c0e6ec',
      fillStyle: 'zigzag',
      fillWeight: '1',
      hachureAngle: 60, 
      hachureGap: 4,
      curveStepCount: 9,
      curveFitting: 1,
    },
  },
  {
    component: 'circle-shape',
    label: '圆形',
    propValue: '&nbsp;',
    icon: 'circle',
    canEdit: true,
    style: {
      width: 200,
      height: 200,
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '',
      letterSpacing: 0,
      textAlign: 'center',
      color: '',
      verticalAlign: 'middle',
      opacity: 1,
    },
    svgStyle: {
      roughness: 1,
      bowing: 1,
      stroke: '#000',
      strokeWidth: 1,
      fill: '#fdb9b9',
      fillStyle: 'hachure',
      fillWeight: '1',
      hachureAngle: 60, 
      hachureGap: 4,
      curveStepCount: 9,
      curveFitting: 1,
    },
  },
  {
    component: 'arrow-shape',
    label: '箭头',
    propValue: '&nbsp;',
    icon: 'arrow-r',
    canEdit: true,
    style: {
      width: 200,
      height: 200,
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '',
      letterSpacing: 0,
      textAlign: 'center',
      color: '',
      verticalAlign: 'middle',
      opacity: 1,
    },
    svgStyle: {
      roughness: 1,
      bowing: 1,
      stroke: '#000',
      strokeWidth: 1,
      fill: '#c0e6ec',
      fillStyle: 'zigzag',
      fillWeight: '1',
      hachureAngle: 60, 
      hachureGap: 4,
      curveStepCount: 9,
      curveFitting: 1,
    },
  },
];

for (let i = 0, len = list.length; i < len; i++) {
  const item = list[i];
  item.style = { ...commonStyle, ...item.style };
  list[i] = { ...commonAttr, ...item };
}

export default list;