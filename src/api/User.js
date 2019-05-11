import requestHelper from './requestHelper.js';

const END_POINT = '/user';

export default {
    async fetchUserList(condition) {
        return requestHelper(END_POINT, 'get', condition);
    },

    async createUser(userData) {
        return requestHelper(END_POINT, 'post', userData);
    },
}