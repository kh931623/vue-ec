<template>
    <v-layout row wrap>
        <!-- search bar -->
        <v-flex xs12>
            <v-form>
                <v-text-field solo v-model="searchText" label="Search" append-icon="search" clearable></v-text-field>
            </v-form>
        </v-flex>

        <v-flex xs12 md2>
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

        <v-flex xs12 md10>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12 md4 v-for="product in products" :key="product._id">
                        <v-card>
                            <v-card-title class="headline">
                                {{ product.name }}
                            </v-card-title>

                            <v-card-text class="h100">
                                <div>
                                    {{ product.description }}
                                </div>
                            </v-card-text>

                            <v-card-actions>
                                <span>
                                    ${{product.price}}
                                </span>
                                <v-spacer></v-spacer>
                                <template>
                                    <v-icon class="pointer-cursor" @click="decreaseQuantity(product)">
                                        remove
                                    </v-icon>
                                    <span class="stock-input">
                                        {{ product.quantity }}
                                    </span>
                                    <v-icon class="pointer-cursor" @click="increaseQuantity(product)">
                                        add
                                    </v-icon>
                                </template>
                                <small class="ml-3">
                                    {{ product.stock }} remaining
                                </small>
                                <v-btn flat @click="addToCart(product)">
                                    <v-icon>
                                        add_shopping_cart
                                    </v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
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
        ...mapActions([
            'addToCart'
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
                this.products = this.addQuantityToArrayObject(result.products);
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
        addQuantityToArrayObject(objects) {
            return objects.map(obj => {
                const newObject = Object.assign({}, obj);
                newObject.quantity = 1;
                return newObject;
            });
        },
        increaseQuantity(product) {
            if (product.quantity < product.stock) {
                product.quantity++;
            }
        },
        decreaseQuantity(product) {
            if (product.quantity > 1) {
                product.quantity--;
            }
        }
    },
    computed: {
    }
}
</script>

<style scoped>
    .h100 {
        height: 100px;
    }

    .icon-button {
        height: 25px;
        width: 25px;
    }

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

