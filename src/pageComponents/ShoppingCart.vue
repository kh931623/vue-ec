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
                            <v-icon class="pointer-cursor">
                                remove
                            </v-icon>
                            <span class="stock-input">
                                {{ props.item.quantity }}
                            </span>
                            <v-icon class="pointer-cursor">
                                add
                            </v-icon>
                        </td>
                        <td class="text-xs-center">
                            ${{ props.item.price * props.item.quantity }}
                        </td>
                        <td class="text-xs-center">
                            <v-btn>
                                <v-icon>
                                    delete
                                </v-icon>
                            </v-btn>
                        </td>
                    </template>
                </v-data-table>
            </template>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

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
            ]
        }
    },
    methods: {

    },
    computed: {
        ...mapState([
            'shoppingCart'
        ]),
        ...mapGetters([
            'shoppingCartLength'
        ]),
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
