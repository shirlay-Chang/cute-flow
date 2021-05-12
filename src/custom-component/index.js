import Vue from 'vue';

const components = [
  'Picture',
  'VText',
  'VButton',
  'Group',
  'RectShape',
  'DiamondShape',
  'CircleShape',
  'ArrowShape',
  'LineShape',
  'RoundedRectShape',
];

components.forEach(key => {
  Vue.component(key, () => import(`@/custom-component/${key}`));
});