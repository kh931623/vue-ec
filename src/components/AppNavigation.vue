<template>
  <v-toolbar color="blue" dark pa-3>
    <v-toolbar-title color="white" class="pointer-cursor">Shopping Time</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn class="pointer-cursor" flat>
      
      <v-badge color="black">
        <template v-slot:badge>
          <span>{{ shoppingCartLength }}</span>
        </template>
        <v-icon>shopping_cart</v-icon>
      </v-badge>
    </v-btn>
    <template>
      <v-btn flat @click="signInHandler()">SIGN IN</v-btn>
      <v-btn flat @click="signUpHandler()">JOIN</v-btn>
    </template>
  </v-toolbar>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';

import MutationTypes from '../store/MutationTypes.js';

export default {
    name: 'AppNavigation',
    date() {
        return {};
    },
    methods: {
        // map mutations from store
        ...mapMutations([
            MutationTypes.CHANGE_SHOW_USER_FORM,
            MutationTypes.CHANGE_IS_SIGN_UP
        ]),

        signUpHandler() {
            this[MutationTypes.CHANGE_SHOW_USER_FORM]({
                flag: true
            });
            this[MutationTypes.CHANGE_IS_SIGN_UP]({
                flag: true
            });
        },
        signInHandler() {
            this[MutationTypes.CHANGE_SHOW_USER_FORM]({
                flag: true
            });
            this[MutationTypes.CHANGE_IS_SIGN_UP]({
                flag: false
            });
        }
    },
    computed: {
        ...mapGetters(['shoppingCartLength'])
    }
};
</script>

<style>
.pointer-cursor {
    cursor: pointer;
}
</style>


