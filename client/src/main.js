import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'

Vue.use(Vuex)


import BootstrapVue from 'bootstrap-vue'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

const store = new Vuex.Store({
  state:{
    pageType: 'list',
    books: [],
    currentBook: Object,
    shoppingCart: {
      itens: [],
      total: 0
    }
  },
  mutations: {
    setBooks(state, bookArray) {
      state.books = bookArray
      for(var i = 0; i<state.books.length;i++)
        {
          state.books[i].price = state.books[i].price.toFixed(2)
        }
    },

    setPageType(state, type){
      state.pageType = type

      if(type !== 'bookData' && type !== 'bookEdit' && type !== 'shoppingCart')
        state.currentBook = Object
    },

    setCurrentBook(state, currentBook){
      state.currentBook = currentBook
    },

    addItemToCart(state, item){

      var pos = state.shoppingCart.itens.findIndex(x => x._id === item._id)
      

      var last
      if(pos === -1 ){
        state.shoppingCart.itens.push(item)

        last = state.shoppingCart.itens.length - 1

        state.shoppingCart.itens[last]['quantity'] = 1
      }
        

      else
        state.shoppingCart.itens[pos].quantity++

      this.commit('sumToTotal', item.price)

      
    },

    removeItem(state, item){

      var pos = state.shoppingCart.itens.findIndex(x => x._id === item._id)
      this.commit('subtractFromTotal',state.shoppingCart.itens[pos].price)
      state.shoppingCart.itens.splice(pos,1)

    },

    removeOneItemFromCart(state, item){

      var pos = state.shoppingCart.itens.findIndex(x => x._id === item._id)

      state.shoppingCart.itens[pos].quantity--
      this.commit('subtractFromTotal',item.price)
    },

    sumToTotal(state,price){
      state.shoppingCart.total += price
    },

    subtractFromTotal(state, price){
      state.shoppingCart.total -= price
    }

  }
})


new Vue({
  store,
  render: h => h(App),
}).$mount('#app')

