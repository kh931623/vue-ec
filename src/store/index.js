import Vue from 'vue';
import Vuex from 'vuex';

import MutationTypes from './MutationTypes.js';
import DataModel from '../api/index.js';

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

        alertMessage: '',

        confirmMessage: '',
        confirmHandler: () => {},
        cancelHandler: () => {},

        user: null,
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
        },

        [MutationTypes.CHANGE_ALERT_MESSAGE] (state, payload) {
            state.alertMessage = payload.text;
        },

        [MutationTypes.SET_USER] (state, payload) {
            state.user = payload.user;
        },

        [MutationTypes.CHANGE_CONFIRM_MESSAGE] (state, payload) {
            state.confirmMessage = payload.text;
        },

        [MutationTypes.SET_CONFIRM_HANDLER] (state, func) {
            state.confirmHandler = func;
        },

        [MutationTypes.SET_CANCEL_HANDLER] (state, func) {
            state.cancelHandler = func;
        }
    },
    actions: {
        async updateUser({ commit }) {
            const result = await DataModel.Utility.fetchUserInfo();
            commit(MutationTypes.SET_USER, {
                user: result.user
            });
        },
        async triggerConfirm({ commit }, confirmMessage) {
            commit(MutationTypes.CHANGE_CONFIRM_MESSAGE, {
                text: confirmMessage
            });
            const result = await new Promise((resolve) => {
                commit(MutationTypes.SET_CONFIRM_HANDLER, () => resolve(true));
                commit(MutationTypes.SET_CANCEL_HANDLER, () => resolve(false));
            });
            commit(MutationTypes.CHANGE_CONFIRM_MESSAGE, {
                text: ''
            });

            return result;
        }
    },
    getters: {
        userFormTitle: state => {
            return state.isSignUp ? 'Sign Up' : 'Sign In';
        },

        shoppingCartLength: state => state.shoppingCart.length,
        
        canDisplayAlert: state => Boolean(state.alertMessage),

        canDisplayConfirm: state => Boolean(state.confirmMessage),

        isLoggedIn: state => Boolean(state.user),

        isAdmin: state => {
            if (state.user) {
                return state.user.role === 'admin'
            }
            return false;
        },
    }
})

export default store;