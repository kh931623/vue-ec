import Vue from 'vue';
import Vuex from 'vuex';

import MutationTypes from './MutationTypes.js';

Vue.config.devtools = process.env.NODE_ENV === 'development'
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        // if shows loading screen
        isLoading: false,

        // if shows user form
        showUserForm: false,

        // if shows sign-up form in user form
        isSignUp: false,

        shoppingCart: [],
    },
    mutations: {

        [MutationTypes.CHANGE_IS_LOADING] (state, payload) {
            state.isLoading = payload.flag;
        },

        [MutationTypes.CHANGE_SHOW_USER_FORM] (state, payload) {
            state.showUserForm = payload.flag;
        },

        [MutationTypes.CHANGE_IS_SIGN_UP] (state, payload) {
            state.isSignUp = payload.flag;
        }
    },
    actions: {

    },
    getters: {
        userFormTitle: state => {
            return state.isSignUp ? 'Sign Up' : 'Sign In';
        },
        shoppingCartLength: state => state.shoppingCart.length,
    }
})

export default store;