import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

import App from "./App.vue";
import storeConfig from "./store";

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Vuetify);

const store = new Vuex.Store(storeConfig);

const app = new Vue({
    render: h => h(App),
    store
}).$mount("#app");

window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app.constructor;
