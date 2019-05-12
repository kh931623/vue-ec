<template>
  <div>
    <v-layout row wrap mb-2>
      <v-flex xs12 md3 mr-0 v-for="(link, index) in links" :key="index">
        <v-btn color="info" @click="buttonClickHandler(link)">
            {{ link.display }}
        </v-btn>
      </v-flex>
    </v-layout>

    <router-view></router-view>
  </div>
</template>

<script>
import URL from '../router/URL.js';

export default {
    name: 'ControllerPanel',
    data() {
        return {
            links: [
                {
                    display: 'Category Management',
                    path: URL.CATEGORY_MANEGEMENT
                },
                {
                    display: 'Product Management',
                    path: URL.PRODUCT_MANAGEMENT
                },
            ]
        }
    },
    methods: {
        buttonClickHandler(link) {
            this.$router.push(link.path);
        }
    }
};
</script>

