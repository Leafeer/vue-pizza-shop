import Vue from 'vue'
import Vuex from 'vuex'

// import * as actions from './store/actions'
// import * as getters from './store/getters'
// import * as mutations from './store/mutations'

import menu from './store/module/menu'
import users from './store/module/users'
import status from './store/module/status'

Vue.use(Vuex)

export default new Vuex.Store({
  // state: {
  //   //设置属性  
  // },
  // getters,
  // mutations,
  // actions
  modules: {
    menu,
    users,
    status
  }

})
