const state = {
  menuItems: {},
}
const getters = {
  getMenuItems: state => state.menuItems,

}
const mutations = {
    //改变属性状态
  setMenuItems(state, data){
    state.menuItems = data
  },
  
  //将匹配到得对象，在menuItems数组中伤处
  removeMenuItems(state, data){
    state.menuItems.forEach((item, index) => {
      if (item == data) {
        state.menuItems.splice(index, 1)
      }
    })
  },
  //将新添加得pizza push到属性menuItems中
  pushToMenuItems(state, data){
    state.menuItems.push(data)
  },
}
const actions = {

}

export default {
  state,
  getters,
  mutations,
  actions
}