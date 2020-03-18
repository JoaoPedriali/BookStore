<template class="container-fluid">
  <div id="app">
    <Header />
    <Books v-if="this.$store.state.pageType === 'list'" />
    <BookData v-else-if="this.$store.state.pageType === 'bookData'"/>
    <BookEdit v-else-if="this.$store.state.pageType === 'bookEdit'" />
    <ShoppingCart v-else-if="this.$store.state.pageType === 'shoppingCart'" />
    <Footer />
  </div>
</template>

<script>

import Header from './components/Header.vue'
import Books from './components/Books.vue'
import BookData from './components/BookData.vue'
import BookEdit from './components/BookEdit'
import ShoppingCart from './components/ShoppingCart.vue'
import Footer from './components/Footer.vue'

const url = '/api'
const axios = require('axios')


export default {
  name: 'App',
  components: {
    Header,
    Books,
    BookData,
    BookEdit,
    ShoppingCart,
    Footer
  },

  async created() {
    await axios.get(`${url}/books`)
      .then((books) => {
        this.$store.commit('setBooks',books.data.data)
        console.log(books)
      })
      .catch((err) => {
          return err
      })
  },
}


</script>
<style>
template{
    background-color: #f0f0f0;
}
</style>
