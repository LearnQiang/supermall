import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCart(state, payload) {
      let oldProduct = null
      for (let item of state.cartList){
        if(item.iid === payload.iid){
          oldProduct = item
        }
      }
      //判断oldProduct
      if (oldProduct!=null){
        oldProduct.count += 1
        payload.checked = true
      }else {
        payload.count = 1
        payload.checked = true
        state.cartList.push(payload)
      }
    }
  }
})

export default store