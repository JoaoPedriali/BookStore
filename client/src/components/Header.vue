<template>
    <b-container fluid >
        <b-row class="header">
            <b-col cols="2" align-self="start" id="logo">
                    <img id="logoimg" @click="homePage()" class="img-fluid" src="../assets/logo.svg">
            </b-col>
            <b-col align-self="end" cols="5" id="search" class="">
                <b-form-input v-on:keyup="search(searchString)" v-model="searchString" type="text" placeholder="Pesquisar..." size="lg"></b-form-input>
            </b-col>
            <b-col id="addBookCol">
                <button id="addBook" 
                    class="btn btn-success float-right" 
                    v-text="this.$store.state.pageType === 'bookData' ? 'Alterar Livro' : 'Adicionar Livro'"
                    @click="setPageType('bookEdit')"
                    v-if="this.$store.state.pageType !== 'shoppingCart'"><a href="#"></a>
                </button>
            </b-col>
            <b-col cols="1" id="cartCol">
                <h6 id="cart" class="float-right"><a href="#" @click="setPageType('shoppingCart')">CARRINHO</a></h6>
            </b-col>    
        </b-row>
    </b-container>
</template>

<script>

const axios = require('axios')
const url = '/api'

export default {
    name: 'Header',

    data(){
        return {
            searchString: ''
        }
    },
    methods:{
        search: async function(search){
            if(search === ''){
                this.searchAllBooks()
            }
            else{
                await axios.get(`${url}/books/search/${search}`)
                .then((books) => {
                    if(books.data.data.length == 0){
                        this.searchByAuthor(search)
                    }
                    else{
                        this.commitBooks(books)
                    }
                        
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        },

        setPageType: function(type){
            this.$store.commit('setPageType', type)
        },
        
        homePage: function(){
            this.$store.commit('setPageType', 'list')
            this.searchString = ''
            this.searchAllBooks()
        },

        searchAllBooks: async function(){
            await axios.get(`${url}/books`)
            .then((books) => { this.commitBooks(books)})
            .catch((err) => { console.log(err) })
        },

        searchByAuthor: async function(search){
            await axios.get(`${url}/books/searchauthor/${search}`)
            .then((books) => { this.commitBooks(books) })
            .catch((err) => { console.log(err) })
        },

        commitBooks: function(books){
             this.$store.commit('setBooks',books.data.data)
             this.$store.commit('setPageType','list')
        }
    }
}
</script>

<style scoped>


a{
    color: white;
}

a:hover{
    color: white;
    text-decoration: none;;
}
#logo{
    height:82%;
    margin-left: 0.5vw;
    margin-top: 1vh;
}

#logoimg{
    height: 100%;
}

#logoimg:hover{
    cursor: pointer;
}

#addBookCol{
    padding: 0 0 0 0 !important;
}

#addBook{
    margin-top: 1%
}

#cartCol{
    padding-left: 0;
}

#cart{
    margin: 6% 1% 0 0;
    color: #ffffff;
    font-size: 16px;
    font-weight: 700;
    line-height: 33px;
}

.header{
    background-color: #598fff;
    height: 15vh;
}


#search{

    bottom: 20%;
    left: 3%;
}
b-col{
    padding: 0 0 0 0;
}


</style>