import Vue from 'vue'
import App from './App.vue'
import VueI18n from 'vue-i18n'
import vnMessage from './lang/vn.json'
import enMessage from './lang/en.json'

Vue.use(VueI18n)

const messages = {
  vn: vnMessage,
  en: enMessage,
}

const i18n = new VueI18n({
  locale: 'vn', // set locale
  messages,
  fallbackLocale: 'vn',
})


new Vue({
  el: '#app',
  i18n,
  render: h => h(App)
})
