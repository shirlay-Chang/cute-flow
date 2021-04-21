import Vue from 'vue'

const components = [
  'Picture',
  'VText',
  'VButton',
  'Group',
  'RectShape',
  'Diamond',
]

components.forEach(key => {
  Vue.component(key, () => import(`@/custom-component/${key}`))
})