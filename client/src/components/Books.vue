<template>
  <div class="container-xg">
    <div id="row" class="row center">
      <div id="loop" v-for="(book,index) in this.$store.state.books" :key="index" class="col col-sm-2">
        <div class="card" @click="bookData(book._id)" style="width: 16rem;">
            <img class="card-img-top" :src="book.imgUrl">
            <div class="card-body d-flex flex-column">
              <h6 class="card-title">{{ book.title }}</h6>
            <div class="card-footer mt-auto" id="price">R$ {{ book.price }} <br/> <div class="card-footer text-muted" id="author">{{book.author}}</div> </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const url = '/api'
const axios = require('axios')

export default {
  name: 'Books',

  methods: {
    bookData: function(bookId){
      axios.get(`${url}/books/${bookId}`)
        .then((book) => {
          this.$store.commit('setCurrentBook', book.data.data)
          this.$store.commit('setPageType','bookData')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


#loop{
  margin: 1rem 2rem 1rem 2rem !important;
  
}

.card{
  
  width: 20%;
  height: 100%;
  padding: 10px 10px;
  text-align: center;
  transition: 0.3s;
}

.card:hover{
  -webkit-box-shadow: -1px 9px 40px -12px rgba(100, 100, 100, 0.158);
  -moz-box-shadow: -1px 9px 40px -12px rgba(100, 100, 100, 0.35);
  box-shadow: -1px 9px 40px -12px rgba(100, 100, 100, 0.35);

  cursor: pointer;
  transform: translate(-1px, -5px);
  transition: 0.3s;
}
.card-body{
  padding: 0 0 0 0;
}
.card-footer{
  padding: 0 0 0 0;
  width:100%; 
  background-color: transparent;
}

#author{
  width: 100%;
  font-size: 12px;
  text-align: center;
  padding: 5% 0 0 0;
}

#price{
  color: #598fff;
  font-size: 26px;
  font-weight: 600;
  
}

img{
  width:100%;
  max-width: 20vw;
  height: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
hr{
  margin: 2px 0;
}
p{
  font-size: 24px;
  color: #598fff;
  font-size: 26px;
  font-weight: 600;
  bottom: 4px !important;
}
</style>
