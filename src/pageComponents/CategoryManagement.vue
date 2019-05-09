<template>
    <div>
        <v-layout justify-end>
            <v-flex xs6 md3>
                <v-btn color="success" @click="showDialog()">
                    Create Category
                </v-btn>
            </v-flex>
        </v-layout>

        <template v-if="hasCategories">
            <v-data-table
                :headers="headers"
                :items="categories"
                class="elevation-1"
            >
                <template v-slot:items="props">
                    <td class="text-xs-center">{{ props.item.name }}</td>
                    <td class="text-xs-center">{{ props.item.description }}</td>
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
            <h3>We haven't found any categories, maybe you can come back later...?</h3>
        </template>

        <v-dialog 
            v-model="canShowDialog"
            max-width="600px"
            @input="closeCategoryForm()"
        >
            <v-card>
                <v-card-title class="headline">{{ formText }} Category</v-card-title>

                <v-card-text>
                    <v-form 
                        v-model="valid"
                        ref="categoryForm"
                    >
                        <v-container>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-text-field
                                        label="Name"
                                        v-model="categoryData.name"
                                        :rules="nameRules"
                                        required
                                    >
                                    </v-text-field>
                                </v-flex>

                                <v-flex xs12>
                                    <v-textarea
                                        label="Description"
                                        v-model="categoryData.description"
                                    >
                                    </v-textarea>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-form>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat="flat" @click="closeCategoryForm()">Close</v-btn>
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
    name: 'CategoryManagement',
    data() {
        return {
            categories: [],
            canShowDialog: false,
            isCreateMode: true,
            valid: false,
            categoryData: {
                name: '',
                description: ''
            },
            nameRules: [
                v => !!v || 'Name is required'
            ],
            headers: [
                {
                    text: 'Name',
                    value: 'name',
                    align: 'center',
                    sortable: false,
                },
                {
                    text: 'Description',
                    value: 'name',
                    align: 'description',
                    sortable: false,
                },
                {
                    text: 'Actions',
                    align: 'right',
                    sortable: false,
                }
            ]
        }
    },
    mounted() {
        this.fetchCategory();
    },
    methods: {
        ...mapMutations([
            MutationTypes.CHANGE_ALERT_MESSAGE
        ]),
        async fetchCategory() {
            const result = await DataModel.Category.fetchCategoryList();
            this.categories = result.categories;
        },
        showDialog() {
            this.canShowDialog = true;
        },
        closeCategoryForm() {
            this.canShowDialog = false;
            this.isCreateMode = true;
            this.$refs.categoryForm.reset();
        },
        async actionButtonClickHandler() {
            if (this.$refs.categoryForm.validate()) {
                try {
                    if (this.isCreateMode) {
                        await DataModel.Category.createCategory(this.categoryData);
                    }
                    else {
                        await DataModel.Category.updateCategory(this.categoryData);
                    }

                    this[MutationTypes.CHANGE_ALERT_MESSAGE]({
                        text: this.successText
                    });
                    this.closeCategoryForm();
                    this.fetchCategory();
                } catch (error) {
                    this[MutationTypes.CHANGE_ALERT_MESSAGE]({
                        text: error.message
                    });
                }
            }
        },
        editButtonClickHandler(category) {
            this.canShowDialog = true;
            this.isCreateMode = false;
            this.categoryData = Object.assign({}, category);
        },
        async deleteButtonClickHandler(category) {
            try {
                const result = await DataModel.Category.deleteCategory(category._id);

                this[MutationTypes.CHANGE_ALERT_MESSAGE]({
                    text: 'Successfully deleted a category'
                });
                this.fetchCategory();
            } catch (error) {
                this[MutationTypes.CHANGE_ALERT_MESSAGE]({
                    text: error.message
                });
            }
        },
    },
    computed: {
        hasCategories() {
            return !!this.categories.length;
        },
        successText() {
            return this.isCreateMode ? 'Successfully created category!' : 'Successfully updated category!'
        },
        formText() {
            return this.isCreateMode ? 'Create' : 'Edit'
        },
    }
}
</script>

