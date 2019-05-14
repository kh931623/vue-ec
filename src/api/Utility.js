import requestHelper from './requestHelper.js';

const END_POINT = '/utility';

export default {
    async login(userData) {
        return requestHelper(`${END_POINT}/login`, 'post', userData);
    },
    async fetchUserInfo() {
        return requestHelper(`${END_POINT}/userInfo`);
    },
    async logout() {
        return requestHelper(`${END_POINT}/logout`);
    },
    async updateShoppingCart(shoppingCart) {
        return requestHelper(`${END_POINT}/update-shopping-cart`, 'post', shoppingCart)
    },
    async fetchShoppingCart() {
        return requestHelper(`${END_POINT}/fetch-shopping-cart`);
    },
    increaseQuantity(postData) {
        return requestHelper(`${END_POINT}/increase-quantity`, 'post', postData);
    },
    decreaseQuantity(postData) {
        return requestHelper(`${END_POINT}/decrease-quantity`, 'post', postData);
    }
}