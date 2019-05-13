<template>
  <v-toolbar color="blue" dark pa-3>
    <v-toolbar-title color="white" class="pointer-cursor" @click="backToHome()">Shopping Time</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn class="pointer-cursor" flat @click="goToShoppingCart()">
      <v-badge color="black">
        <template v-slot:badge v-if="shoppingCartLength">
          <span>{{ shoppingCartLength }}</span>
        </template>
        <v-icon>shopping_cart</v-icon>
      </v-badge>
    </v-btn>
    <template v-if="!isLoggedIn">
      <v-btn flat @click="signInHandler()">SIGN IN</v-btn>
      <v-btn flat @click="signUpHandler()">JOIN</v-btn>
    </template>
    <template v-else>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn flat v-on="on">
            {{ user.username }}
            <v-icon>arrow_drop_down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-tile v-for="(item, index) in appendedMenu" :key="index" @click="menuClickHandler(item)">
            <v-list-tile-title>{{ item.display }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </template>
  </v-toolbar>
</template>

<script>
import { mapMutations, mapGetters, mapState } from 'vuex';
import MutationTypes from '../store/MutationTypes.js';

import DataModel from '../api/index.js';
import URL from '../router/URL.js';

export default {
    name: 'AppNavigation',
    data() {
        return {
            userMenu: [
                {
                    display: 'Order Management',
                    path: URL.ORDERS
                },
                {
                    display: 'Log Out',
                    isLogout: true
                }
            ]
        };
    },
    methods: {
        // map mutations from store
        ...mapMutations([
            MutationTypes.CHANGE_SHOW_USER_FORM,
            MutationTypes.CHANGE_IS_SIGN_UP,
            MutationTypes.SET_USER,
            MutationTypes.CHANGE_ALERT_MESSAGE
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
        },
        async menuClickHandler(item) {
            if (item.isLogout) {
                try {
                    const result = await DataModel.Utility.logout();
                    this[MutationTypes.SET_USER]({
                        user: null
                    });
                    this[MutationTypes.CHANGE_ALERT_MESSAGE]({
                        text: 'SuccessFully Logged Out'
                    });
                    this.backToHome();
                } catch (error) {
                    this[MutationTypes.CHANGE_ALERT_MESSAGE]({
                        text: error.message
                    });
                }
            }
            else {
                this.$router.push(item.path);
            }
        },
        backToHome() {
            this.$router.push(URL.HOME);
        },
        goToShoppingCart() {
            this.$router.push(URL.SHOPPING_CART);
        }
    },
    computed: {
        ...mapState([
            'user',
        ]),
        ...mapGetters([
            'shoppingCartLength', 
            'isLoggedIn', 
            'isAdmin'
        ]),
        appendedMenu() {
            if (this.isAdmin) {
                return [
                    {
                        display: 'Control Panel',
                        path: URL.CONTROLL_PANEL
                    },
                    ...this.userMenu
                ];
            }
            return this.userMenu;
        }
    }
};
</script>

<style>
.pointer-cursor {
    cursor: pointer;
}
</style>


