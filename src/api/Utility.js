import requestHelper from './requestHelper.js';

const END_POINT = '/utility';

export default {
    login(userData) {
        return requestHelper(`${END_POINT}/login`, 'post', userData);
    }
}