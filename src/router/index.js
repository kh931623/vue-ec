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
        },
        {
            path: URL.CONTROLL_PANEL,
            component: ControllPanel,
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
    DataModel.Utility.fetchUserInfo()
        .then(res => {
            store.commit(MutationTypes.SET_USER, {
                user: res.user
            })
        });
    next();
});

export default router;
