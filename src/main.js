// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import VueAwesomeSwiper from "vue-awesome-swiper"
import "swiper/dist/css/swiper.css"
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import "../src/style/reset.css"
import store from "./store"
import 'animate.css'
import VideoPlayer from 'vue-video-player'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false
Vue.use(VueLazyLoad)
Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
Vue.use(VideoPlayer)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
