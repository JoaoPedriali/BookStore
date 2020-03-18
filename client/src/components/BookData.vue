<template>
    <div class="container">
        <div class="row">
            <div class="col-md-4" id="photo">
                <img class="rounded img-align-center" id="cover" :src="this.$store.state.currentBook.imgUrl">
                <div id="authors">{{this.$store.state.currentBook.author}}</div>
                <div id="stock">Quantidade em estoque: {{this.$store.state.currentBook.inStock}}</div>
            </div>
            <div class="col-md-4" id="about">
                <div id="title">{{this.$store.state.currentBook.title}}</div>
                <div id="synopsis">{{this.$store.state.currentBook.synopsis}}</div>
                <div id="price">R$ {{this.$store.state.currentBook.price}}</div>
                <div id="buy justify-content-center"><button type="button" @click="addItem()" class="btn btn-primary btn-lg btn-block">Adicionar ao carrinho</button></div>
            </div>
        </div>
    </div>    
</template>

<script>


export default {
    name: 'bookData',

    methods:{

        addItem: function() {
            this.$store.commit('addItemToCart', this.$store.state.currentBook)
            this.$store.commit('setPageType', 'shoppingCart')
        },
    },
    
}
</script>

<style scoped>

#photo{
    padding-top: 4%;
    margin-left: 16%;
}

#about{
    padding-top: 4%;
}

#photo img{
    padding-bottom:2%;
    max-width:100%;
    min-width: 100%;
}

#authors{
    text-align: center;
    margin-bottom: 3%;
}
#stock{
    text-align: center;
}

#title{
    font-size: 20px;
    font-weight: 700;
    padding-bottom: 5%;
    text-align: left;
}

#synopsis{
    font-size: 16px;
    font-weight: 400;
    text-align: left;
    padding-bottom: 7%;
}

#price{
    font-size: 36px;
    font-weight: 600;
    text-align: center;
    padding-bottom: 7%;
}

#buy{
    padding-bottom: 100%;
}

#suggestionsColumn{
    padding-top: 4%;
    padding-right: 0;
}


.btn-primary{
    background: rgb(255,162,105);
}
.btn-primary:hover{
    background: rgb(255, 122, 39);
}

</style>