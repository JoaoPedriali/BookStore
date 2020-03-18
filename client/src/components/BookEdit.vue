<template>
    <div class="container">
        <div class="row">
            <div class="col-md-4 center" id="photo">
                <button class="btn btn-primary" @click="getPhoto()"  id="addImg">Adicionar imagem</button>
                <input id="file-input" type="file" name="name" accept="image/x-png,image/gif,image/jpeg" style="display: none;" />
                <img id="cover" v-if="this.imgUrl != ''" v-bind:src="this.imgUrl">
                <b-form-input id="authors" placeholder="Autor" v-model="author"></b-form-input>
                <b-form-input id="stock" placeholder="Quantidade em estoque" type="number" min="0" v-model="inStock"></b-form-input>
            </div>
            <div class="col-md-4" id="about">
                <b-form-input id="title" placeholder="Título" v-model="title"></b-form-input>
                <textarea id="synopsis" type="text" placeholder="Sinopse..." v-model="synopsis"></textarea>
                <b-form-input id="price" placeholder="Preço" v-model="price" type="number" min="0.01" step="0.01"></b-form-input>
                 <div id="buy"><button type="submit" @click="getCurrentBook() ? putBook() : postBook()" class="btn btn-success btn-lg btn-block">Salvar</button></div>
                 <div id="delete"><button type="submit" v-if="getCurrentBook()" @click="getCurrentBook() ? deleteBook() : undefined" class="btn btn-danger btn-lg btn-block">Excluir Livro</button></div>
            </div>
        </div>
    </div>    
</template>


<script>

const axios = require('axios')
const url = '/api'

export default {
    name: 'Book',
    data() {
        return{
            imgUrl: this.$store.state.currentBook.imgUrl,
            author: this.$store.state.currentBook.author,
            inStock: this.$store.state.currentBook.inStock,
            title: this.$store.state.currentBook.title,
            synopsis: this.$store.state.currentBook.synopsis,
            price: this.$store.state.currentBook.price,
        }
    },
    methods:{
        getPhoto(){
               var input = document.createElement('input');
                input.type = 'file';

                input.onchange = e => { 

                var file = e.target.files[0]; 

                var reader = new FileReader();
                reader.readAsDataURL(file);

                reader.onload = async() => {
                    await axios.post('https://api.imgur.com/3/image', file, {
                        headers: {
                            Authorization: 'Client-ID c0119f518e2f8d3',
                        }
                    })
                    .then((img) => {
                        this.imgUrl = img.data.data.link
                    })
                    .catch((err) =>{
                        console.log(err)
                    })
                }

                
                    
        
                }

                input.click(); 
        },

        getCurrentBook: function(){
            if(this.$store.state.currentBook == Object)
                return false

            else return true    
        },

        postBook: async function(){
            var book = {
                imgUrl: this.imgUrl,
                author: this.author,
                inStock: this.inStock,
                title: this.title,
                synopsis: this.synopsis,
                price: this.price,
            }
            
            await axios.post(`${url}/books`, book)
                .then(async () => {
                    
                    await axios.get(`${url}/books`)
                        .then((books) => {
                        this.$store.commit('setBooks',books.data.data)
                        })
                        .catch((err) => {
                            return err
                        })
                    
                    this.$store.state.pageType = 'list'
                    
                })
                .catch(err => {
                    console.log(err)
                })
        },
        
        putBook: async function(){
            var book = {
                id: this.$store.state.currentBook._id,
                imgUrl: this.imgUrl,
                author: this.author,
                inStock: this.inStock,
                title: this.title,
                synopsis: this.synopsis,
                price: this.price,
            }
            await axios.put(`${url}/books/${this.$store.state.currentBook._id}`, book)
                .then(async () => {
                    
                    await axios.get(`${url}/books`)
                        .then((books) => {
                        this.$store.commit('setBooks',books.data.data)
                        })
                        .catch((err) => {
                            return err
                        })

                    this.$store.state.pageType = 'list'
                })
                .catch(err => {
                    console.log(err)
                })
        },

        deleteBook: async function(){
            await axios.delete(`${url}/books/${this.$store.state.currentBook._id}`)
                .then(async () => {
                    
                    await axios.get(`${url}/books`)
                        .then((books) => {
                        this.$store.commit('setBooks',books.data.data)
                        })
                        .catch((err) => {
                            return err
                        })

                    this.$store.state.pageType = 'list'
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
}

</script>

<style scoped>

#photo{
    width: 100%;
    height: 100%;
    padding-top: 4%;
    margin-left: 16%;
}

#about{
    padding-top: 4%;
}

#photo img{
    padding-bottom:2%;
}
#cover{
    max-width: 100%;
    max-height: 100%;
}

#authors{
    text-align: center;
    font-size: 14px;
    width: 100%;
    margin-bottom: 3%;
}

#stock{
    text-align: center;
    font-size: 14px;
    width: 100%
}

#addImg{
    margin-bottom: 5%;
}

#title{

    margin-bottom: 5%;

}

#synopsis{
    padding-top: 20px;
    width:100%;
    font-size: 16px;
    text-align: left;
    margin-bottom: 5%;
    padding-bottom: 80%;
    resize: none;
}

#price{
    text-align: center;
    margin-bottom: 7%;
}

#buy{
    padding-bottom: 5%;
}

#suggestionsColumn{
    padding-top: 4%;
    padding-right: 0;
}


</style>
