import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import { nextTick } from 'q';

import axios from 'axios'

axios.defaults.baseURL='https://vue-pizza-shop.firebaseio.com/'
Vue.prototype.http = axios;
Vue.config.productionTip = false

//配置vue原型 (在任何组件中)
Vue.prototype.axios = axios



//全局守卫
// router.beforeEach((to,from,next) =>{
//   /* alert('还没有登陆，请先登录')
//   next() */

//   //判断store.gettes.isLogin === false
//   if(to.path == '/login' || to.path == '/register'){
//     next()
//   }else{
//     alert('还没有登陆，请先登陆')
//     next('/login')
//   }
// })

//后置钩子
// router.afterEach((to,from) =>{
//   alert('after each')
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
