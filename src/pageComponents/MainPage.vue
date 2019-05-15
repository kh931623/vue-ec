<template>
  <v-layout row wrap>
    <!-- test area -->
    <v-flex xs12>
      <v-btn @click="loadingHandler()">Loading la!</v-btn>
    </v-flex>

    <!-- search bar -->
    <v-flex xs12>
      <v-form>
        <v-text-field  
          solo 
          v-model="searchText" 
          label="Search"
          append-icon="search"
          @click:append="searchProduct()"
          clearable
        ></v-text-field>
      </v-form>
    </v-flex>

    <!-- left quick menu -->
    <v-flex xs12 md4 v-for="category in categories" :key="category.name">
      <v-card >
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{ category.name }}</h3>
            <div>
                {{ category.description }}
            </div>
          </div>
        </v-card-title>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="info" @click="goToCategory(category)">
                Go Shopping
            </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapMutations } from 'vuex';
import MutationTypes from '../store/MutationTypes.js';
import DataModel from '../api';
import URL from '../router/URL';

export default {
    name: 'MainPage',
    data() {
        return {
            searchText: '',
            categories: []
        };
    },
    mounted() {
        this.fetchCategories();
    },
    methods: {
        ...mapMutations([
          MutationTypes.CHANGE_IS_LOADING,
          MutationTypes.CHANGE_ALERT_MESSAGE
        ]),
        async fetchCategories() {
            try {
                const result = await DataModel.Category.fetchCategoryList();
                this.categories = result.categories;
            } catch (error) {
                this[MutationTypes.CHANGE_ALERT_MESSAGE]({
                    text: error.message
                })
            }
        },
        loadingHandler() {
            this[MutationTypes.CHANGE_IS_LOADING]({
                flag: true,
            });

            setTimeout(() => {
                this[MutationTypes.CHANGE_IS_LOADING]({
                    flag: false,
                });
            }, 3 * 1000);
        },
        goToCategory(category) {
            this.$router.push({
                name: 'browsing-product-with-category',
                params: {
                    category_id: category._id
                }
            })
        },
        searchProduct() {
            this.$router.push({
                path: URL.BROWSING_PRODUCT,
                query: {
                    name: this.searchText,
                    // 'category.name': this.searchText
                }
            })
        }
    },
};
</script>

