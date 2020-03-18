<template>
    <div class="container">

                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col"></th>
                        <th scope="col">Livro</th>
                        <th scope="col">Preço</th>
                        <th scope="col">Subtotal</th>
                        <th scope="col">Quantidade</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in this.$store.state.shoppingCart.itens" v-bind:key="item._id">
                        <th scope="row">{{index}}</th>
                        <td>{{item.title}}</td>
                        <td>R$ {{item.price}}</td>
                        <td v-text="'R$ ' + (item.price * item.quantity).toFixed(2)"></td>
                        <td id="quantity"><button class="btn btn-outline-danger float-left" @click="item.quantity === 1 ? removeItem(item) : removeOneFromQuantity(item)">-</button>{{item.quantity}}<button class="btn btn-outline-success float-right" @click="item.quantity === item.inStock ? alertFire() : addItem(item)">+</button> </td>
                        
                        </tr>
                        <tr>
                            <td>

                            </td>
                            <td>

                            </td>
                            <td>
                                
                            </td>
                            <td>
                                <div class="total">Total: R$ {{this.$store.state.shoppingCart.total.toFixed(2)}}</div>    
                            </td>
                            <td>
                                <button class="btn-sm  btn-primary buy" @click="completePurchase()">Finalizar</button>
                                <button class="btn-sm  btn-danger buy" @click="cancelBuy()">Cancelar Compra</button>
                            </td>
                            
                        </tr>
                    </tbody>
                </table>
                
    </div>
</template>

<script>
const Swal = require('sweetalert2')
const url = '/api'
const axios = require('axios')

export default {
    name: 'ShoppingCart',
    methods:{
        addItem: function(item) {
            this.$store.commit('addItemToCart', item, '')
            console.log(this.$store.state.currentBook)
            this.$forceUpdate()
        },
        removeItem: function(item){
            this.$store.commit('removeItem', item)
            this.$forceUpdate()
        },

        removeOneFromQuantity: function(item) {
            
            this.$store.commit('removeOneItemFromCart', item, '')
            this.$forceUpdate()
        },
        alertFire: function(){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Estoque Indisponível',
            })
        },

        cancelBuy: function(){
            this.$store.state.shoppingCart.itens = []
            this.$store.state.shoppingCart.total = 0
            this.$store.commit('setPageType', 'list')
        },

        completePurchase: async function(){
            await axios.post(`${url}/cart`, this.$store.state.shoppingCart)
                .then(
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Compra Efetuada',
                        showConfirmButton: false,
                        timer: 1500
                    }),
                    this.cancelBuy()
                )
                .catch(
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Erro na Compra',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    )
        }
    }
}
</script>

<style scoped>

.buy{
    width: 100%;
    text-align: center;
    font-size: 15px;
    font-weight: 700;
    margin-top: 7.5%;
}

.total{
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    margin-top: 15%;
}

tbody{
    text-align: center;
}
thead{
    text-align: center;
}

</style>