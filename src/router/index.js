import Vue from 'vue';
import VueRouter from 'vue-router';

import URL from './URL.js';
import MainPage from '../pageComponents/MainPage.vue';
import OrderPage from '../pageComponents/OrderPage.vue';
import ControllPanel from '../pageComponents/ControllPanel.vue';
import CategoryManagement from '../pageComponents/CategoryManagement.vue';
import ProductManagement from '../pageComponents/ProductManagement.vue';

import store from '../store/index.js';
import MutationTypes from '../store/MutationTypes.js';
import DataModel from '../api/index.js';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: URL.HOME,
            component: MainPage,
        },
        {
            path: URL.ORDERS,
            component: OrderPage,
            meta: {
                requiredLoggedIn: true
            }
        },
        {
            path: URL.CONTROLL_PANEL,
            component: ControllPanel,
            meta: {
                requiredLoggedIn: true
            },
            children: [
                {
                    path: URL.CATEGORY_MANEGEMENT,
                    component: CategoryManagement,
                },
                {
                    path: URL.PRODUCT_MANAGEMENT,
                    component: ProductManagement,
                },
            ],
        },
    ],
});

router.beforeEach((to, from, next) => {
    console.log(to, from);
    
    store.dispatch('updateUser');

    // if the some of the matched route can only be accessed by logged in user
    if (to.matched.some(record => record.meta.requiredLoggedIn)) {
        // fetch user info. from server
        DataModel.Utility.fetchUserInfo()
            .then(res => {
                // there is user info on server
                if (res.user) {
                    next();
                }

                // no user info. from server
                else {
                    next({
                        path: URL.HOME
                    });
                }
            })
    }
    else {
        next();
    }
});

export default router;
