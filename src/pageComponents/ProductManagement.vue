<template>
    <div>
        <v-layout justify-end>
            <v-flex xs6 md3>
                <v-btn color="success" @click="showDialog()">
                    Create Product
                </v-btn>
            </v-flex>
        </v-layout>

        <template v-if="hasProducts">
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
                        <v-btn color="gray" @click="editButtonClickHandler(props.item)">
                            <v-icon>
                                edit
                            </v-icon>
                        </v-btn>
                        <v-btn color="gray" @click="deleteButtonClickHandler(props.item)">
                            <v-icon>
                                delete
                            </v-icon>
                        </v-btn>
                    </td>
                </template>
            </v-data-table>
        </template>
        <template v-else>
            <h3>We haven't found any product, maybe you can come back later...?</h3>
        </template>

        <v-dialog 
            v-model="canShowDialog"
            max-width="600px"
            @input="closeProductForm()"
        >
            <v-card>
                <v-card-title class="headline">{{ formText }} Product</v-card-title>

                <v-card-text>
                    <v-form 
                        v-model="valid"
                        ref="productForm"
                    >
                        <v-container>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-text-field
                                        label="Name"
                                        v-model="productData.name"
                                        :rules="formRules.name"
                                        required
                                    >
                                    </v-text-field>
                                </v-flex>

                                <v-flex xs12>
                                    <v-textarea
                                        label="Description"
                                        v-model="productData.description"
                                    >
                                    </v-textarea>
                                </v-flex>

                                <v-flex xs12>
                                    <v-select
                                        :items="categoryOptions"
                                        label="Category"
                                        :rules="formRules.category"
                                        v-model="productData.category"
                                    ></v-select>
                                </v-flex>

                                <v-flex xs12>
                                    <v-text-field
                                        label="Price"
                                        type="number"
                                        v-model="productData.price"
                                        :rules="formRules.price"
                                        required
                                    >
                                    </v-text-field>
                                </v-flex>

                                <v-flex xs12>
                                    <v-text-field
                                        label="Stock"
                                        type="number"
                                        v-model="productData.stock"
                                        :rules="formRules.stock"
                                        required
                                    >
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-form>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat="flat" @click="closeProductForm()">Close</v-btn>
                    <v-btn color="green darken-1" flat="flat" @click="actionButtonClickHandler()">{{ formText }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import DataModel from '../api/index.js';

import { mapMutations } from 'vuex';
import MutationTypes from '../store/MutationTypes.js';

export default {
    name: 'ProductManagement',
    data() {
        return {
            products: [],
            categories: [],
            canShowDialog: false,
            isCreateMode: true,
            valid: false,
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
                    sortable: false
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
                }
            ],
            nameRules: [
                v => !!v || 'Name is required'
            ],
            formRules: {
                name: [
                    v => !!v || 'Name is required'
                ],
                category: [
                    v => !!v || 'Category is required'
                ],
                price: [
                    v => !!v || 'Price is required'
                ],
                stock: [
                    v => !!v || 'Stock is required'
                ]
            },
            productData: {
                name: '',
                description: '',
                price: null,
                stock: null,
                category: null,
            }
        }
    },
    mounted() {
        this.fetchProducts();
        this.fetchCategories();
    },
    methods: {
        ...mapMutations([
            MutationTypes.CHANGE_ALERT_MESSAGE
        ]),
        async fetchProducts() {
            try {
                const result = await DataModel.Product.fetchProductList();
                this.products = result.products;
            } catch (error) {
                this[MutationTypes.CHANGE_ALERT_MESSAGE]({
                    text: error.message
                });
            }
        },
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
        showDialog() {
            this.canShowDialog = true;
        },
        closeProductForm() {
            this.canShowDialog = false;
            this.isCreateMode = true;
            this.$refs.productForm.reset();
        },
        editButtonClickHandler(product) {
            try {
                this.productData = Object.assign({}, product);
                this.isCreateMode = false;
                this.showDialog();
            } catch (error) {
                this[MutationTypes.CHANGE_ALERT_MESSAGE]({
                    text: error.message
                });
            }
        },
        async deleteButtonClickHandler(product) {
            try {
                await DataModel.Product.deleteProduct(product._id);
                this[MutationTypes.CHANGE_ALERT_MESSAGE]({
                    text: 'Successfully deleted product!'
                });
                this.fetchProducts();
            } catch (error) {
                this[MutationTypes.CHANGE_ALERT_MESSAGE]({
                    text: error.message
                });                
            }
        },
        async actionButtonClickHandler() {
            if (this.$refs.productForm.validate()) {
                try {
                    if (this.isCreateMode) {
                        await DataModel.Product.createProduct(this.productData);
                    }
                    else {
                        await DataModel.Product.updateProduct(this.productData);
                    }

                    this.fetchProducts();
                    this.closeProductForm();
                    this[MutationTypes.CHANGE_ALERT_MESSAGE]({
                        text: this.successText
                    });
                } catch (error) {
                    this[MutationTypes.CHANGE_ALERT_MESSAGE]({
                        text: error.message
                    });
                }
            }
        }
    },
    computed: {
        formText() {
            return this.isCreateMode ? 'Create' : 'Edit'
        },
        hasProducts() {
            return !!this.products.length;
        },
        categoryOptions() {
            if (!this.categories.length) {
                return [];
            }
            return this.categories.map(category => {
                return {
                    text: category.name,
                    value: category._id
                }
            });
        },
        successText() {
            const actionPhrase =  this.isCreateMode ? 'created' : 'updated';
            return `Successfully ${actionPhrase} product`;
        }
    }
}
</script>

