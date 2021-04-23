import Vue from 'vue';

const components = [
  'Picture',
  'VText',
  'VButton',
  'Group',
  'RectShape',
  'Diamond',
  'CircleShape',
];

components.forEach(key => {
  Vue.component(key, () => import(`@/custom-component/${key}`));
});