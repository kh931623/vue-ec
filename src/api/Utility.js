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
    }
}