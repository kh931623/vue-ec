<template>
    <v-layout row wrap>
        <!-- search bar -->
        <v-flex xs12>
            <v-form>
                <v-text-field solo v-model="searchText" label="Search" append-icon="search" clearable></v-text-field>
            </v-form>
        </v-flex>

        <v-flex xs12 md4>
            <v-navigation-drawer permanent>
                <v-list>
                    <v-list-tile
                        v-for="category in categories"
                        :key="category.name"
                        @click="goToCategory(category)"
                    >
                        <v-list-tile-content>
                            <v-list-tile-title>{{ category.name }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-navigation-drawer>
        </v-flex>

        <v-flex xs12 md8>
            <v-data-table
                :headers="headers"
                :items="products"
                class="elevation-1"
            >
                <template v-slot:items="props">
                    <td class="text-xs-center">{{ props.item.name }}</td>
                    <td class="text-xs-center">{{ props.item.description }}</td>
                    <td class="text-xs-center">{{ props.item.category.name }}</td>
                    <td class="text-xs-center">{{ props.item.price }}</td>
                    <td class="text-xs-center">{{ props.item.stock }}</td>
                    <td class="text-xs-right">
                        <v-btn color="gray" @click="">
                            Add to Cart
                        </v-btn>
                    </td>
                </template>
            </v-data-table>            
        </v-flex>
    </v-layout>
</template>

<script>
import { mapMutations } from 'vuex';
import MutationTypes from '../store/MutationTypes.js';
import DataModel from '../api/index.js';
import URL from '../router/URL.js';

export default {
    name: 'BrowsingProduct',
    data() {
        return {
            searchText: '',
            categories: [],
            headers: [
                {
                    text: 'Name',
                    value: 'name',
                    align: 'center',
                    sortable: false
                },
                {
                    text: 'Description',
                    value: 'description',
                    align: 'center',
                    sortable: false
                },
                {
                    text: 'Category',
                    value: 'category',
                    align: 'center',
                },
                {
                    text: 'Price',
                    value: 'price',
                    align: 'center',
                },
                {
                    text: 'Stock',
                    value: 'stock',
                    align: 'center'
                },
                {
                    text: 'Actions',
                    value: 'action',
                    align: 'center'
                }
            ],
            products: []
        }
    },
    mounted() {
        this.fetchCategories();
        this.fetchProducts();
    },
    beforeRouteUpdate(to, from, next) {
        next();
        this.fetchCategories();
        this.fetchProducts();
    },
    methods: {
        ...mapMutations([
            MutationTypes.CHANGE_ALERT_MESSAGE
        ]),
        async fetchCategories() {
            try {
                const result = await DataModel.Category.fetchCategoryList();
                this.categories = result.categories;
            } catch (error) {
                this[MutationTypes.CHANGE_ALERT_MESSAGE]({
                    text: error.message
                });
            }
        },
        async fetchProducts() {
            try {
                const conditions = {};
                if (this.$route.params.category_id) {
                    conditions.category = this.$route.params.category_id;
                }

                const result = await DataModel.Product.fetchProductList(conditions);
                this.products = result.products;
            } catch (error) {
                console.error(error);
                this[MutationTypes.CHANGE_ALERT_MESSAGE]({
                    text: error.message
                });
            }
        },
        goToCategory(category) {
            this.$router.push(`${URL.BROWSING_PRODUCT}/${category._id}`);
        },
        addToCart() {

        }
    }
}
</script>

