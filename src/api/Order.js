import requestHelper from './requestHelper.js';

const END_POINT = '/order';

export default {
    async fetchOrderList(condition) {
        return requestHelper(END_POINT, 'get', condition);
    },

    async createOrder(orderData) {
        return requestHelper(END_POINT, 'post', orderData);
    },
}