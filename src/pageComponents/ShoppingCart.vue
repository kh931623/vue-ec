<template>
    <v-layout row wrap>
        <v-flex xs12>
            <template v-if="!shoppingCartLength">
                <h2>Nothing here, maybe you can go shopping...please?</h2>
            </template>

            <template v-else>
                <v-data-table
                    :headers="headers"
                    :items="shoppingCart"
                    class="elevation-1"
                >
                    <template v-slot:items="props">
                        <td class="text-xs-center">
                            <h3>
                                {{ props.item.name }}
                            </h3>
                            <p>
                                {{ props.item.description }}
                            </p>
                        </td>
                        <td class="text-xs-center">
                            ${{ props.item.price }}
                        </td>
                        <td class="text-xs-center">
                            <v-icon class="pointer-cursor" @click="decreaseQuantity(props.index)">
                                remove
                            </v-icon>
                            <span class="stock-input">
                                {{ props.item.quantity }}
                            </span>
                            <v-icon class="pointer-cursor" @click="increaseQuantity(props.index)">
                                add
                            </v-icon>
                        </td>
                        <td class="text-xs-center">
                            ${{ props.item.price * props.item.quantity }}
                        </td>
                        <td class="text-xs-center">
                            <v-btn @click="deleteItem(props.index)">
                                <v-icon>
                                    delete
                                </v-icon>
                            </v-btn>
                        </td>
                    </template>
                </v-data-table>
            </template>
        </v-flex>

        <v-flex xs12>
            <v-card>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <span class="mr-5">
                        Total：{{ totalAmount }}
                    </span>
                    <v-btn color="success" @click="submit()">
                        Submit
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import _ from 'lodash';

import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import MutationTypes from '../store/MutationTypes.js';
import DataModel from '../api/index.js';
import URL from '../router/URL.js';

export default {
    name: 'ShoppingCart',
    data() {
        return {
            headers: [
                {
                    text: 'Product',
                    value: 'product',
                    align: 'center',
                    sortable: false
                },
                {
                    text: 'Price',
                    value: 'price',
                    align: 'center',
                    sortable: false
                },
                {
                    text: 'Quatity',
                    value: 'quantity',
                    align: 'center',
                    sortable: false
                },
                {
                    text: 'Total Amount',
                    value: 'totalAmount',
                    align: 'center',
                    sortable: false
                },
                {
                    text: 'Delete',
                    value: 'delete',
                    align: 'center',
                    sortable: false
                }
            ],
            timeout: null
        }
    },
    methods: {
        ...mapActions([
            'triggerConfirm',
            'deleteFromCart',
            'increaseQuantity',
            'decreaseQuantity'
        ]),
        ...mapMutations([
            MutationTypes.CHANGE_IS_LOADING,
            MutationTypes.CHANGE_ALERT_MESSAGE,
            MutationTypes.CHANGE_IS_SIGN_UP,
            MutationTypes.CHANGE_SHOW_USER_FORM,
            MutationTypes.SET_SHOPPING_CART
        ]),
        async deleteItem(index) {
            console.log(index);
            const confirm = await this.triggerConfirm('Are you sure you want to delete this item?');
            
            if (confirm) {
                this[MutationTypes.CHANGE_IS_LOADING]({
                    flag: true
                });
                await this.deleteFromCart(index);
                this[MutationTypes.CHANGE_IS_LOADING]({
                    flag: false
                });
            }
        },
        checkIsLoggedIn() {
            if (!this.isLoggedIn) {
                this.timeout = setTimeout(this.checkIsLoggedIn, 500);
            }
            else {
                this.submit();
            }
        },
        async submit() {
            if (!this.isLoggedIn) {
                this[MutationTypes.CHANGE_IS_SIGN_UP]({
                    flag: false
                });
                this[MutationTypes.CHANGE_SHOW_USER_FORM]({
                    flag: true
                });
                setTimeout(this.checkIsLoggedIn, 500);
                return;
            }
            
            try {
                await DataModel.Order.createOrder({
                    user: this.user._id,
                    products: this.shoppingCart,
                    totalAmount: this.totalAmount
                });
                this[MutationTypes.CHANGE_ALERT_MESSAGE]({
                    text: 'Successfully created an order!'
                });
                this[MutationTypes.SET_SHOPPING_CART]([]);

                this.$router.push(URL.HOME);
            } catch (error) {
                this[MutationTypes.CHANGE_ALERT_MESSAGE]({
                    text: error.message
                });
            }
        }
    },
    computed: {
        ...mapState([
            'shoppingCart',
            'user'
        ]),
        ...mapGetters([
            'shoppingCartLength',
            'isLoggedIn'
        ]),
        totalAmount() {
            return this.shoppingCart.reduce((prev, product) => {
                prev += product.price * product.quantity;
                return prev;
            }, 0);
        }
    }
}
</script>

<style scoped>
    .stock-input {
        height: 25px;
        width: 40px;
        text-align: center;
        border-bottom: 1px solid black;
    }

    .pointer-cursor {
        cursor: pointer;
    }
</style>
