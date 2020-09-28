import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "@/store";
import toast from '@/components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from "vue-lazyload";

Vue.config.productionTip = false

//添加事件总线对象
Vue.prototype.$bus = new Vue()

//安装封装toast
Vue.use(toast)

//使用图片懒加载
Vue.use(VueLazyLoad,{
  loading: require('./assets/img/common/timg4.gif')
})

//解决移到端300ms延迟
FastClick.attach(document.body)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
