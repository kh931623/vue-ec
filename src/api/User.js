import requestHelper from './requestHelper.js';

const END_POINT = '/user';
const END_POINT_WITH_ID = `${END_POINT}/:id`;

export default {
    async fetchUserList() {
        return requestHelper(END_POINT);
    },

    async createUser(userData) {
        return requestHelper(END_POINT, 'post', userData);
    },
}