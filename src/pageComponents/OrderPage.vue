<template>
    <v-layout row wrap>
        <template v-if="hasOrders">
            <v-flex xs12 v-for="(order, index) in orders" :key="order._id">
                <v-card>
                    <v-card-title>
                        <h3>
                            Order #{{ index }}
                        </h3>
                    </v-card-title>

                    <v-card-text>
                        <v-data-table
                            :headers="headers"
                            :items="order.products"
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
                                    <span class="stock-input">
                                        {{ props.item.quantity }}
                                    </span>
                                </td>
                                <td class="text-xs-center">
                                    ${{ props.item.price * props.item.quantity }}
                                </td>
                            </template>
                        </v-data-table>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <span>
                            Total：{{ order.totalAmount }}
                        </span>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </template>

        <template v-else>
            <h3>
                Nothing here, please buy something and come back later...?
            </h3>
        </template>
    </v-layout>
</template>

<script>
import MutationTypes from '../store/MutationTypes';
import { mapMutations, mapState } from 'vuex';
import DataModel from '../api';

export default {
    name: 'OrderPage',
    data() {
        return {
            orders: [],
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
            ],
        }
    },
    mounted() {
        this.fetchOrders();
    },
    methods: {
        ...mapMutations([
            MutationTypes.CHANGE_ALERT_MESSAGE
        ]),
        async fetchOrders() {
            try {
                const result = await DataModel.Order.fetchOrderList({
                    user: this.user._id
                });
                this.orders = result.orders;
            } catch (error) {
                this[MutationTypes.CHANGE_ALERT_MESSAGE]({
                    text: error.message
                });
            }
        }
    },
    computed: {
        ...mapState([
            'user'
        ]),
        hasOrders() {
            return !!this.orders.length;
        }
    }
}
</script>

