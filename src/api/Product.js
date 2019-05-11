import requestHelper from './requestHelper.js';

const END_POINT = '/product';

export default {
    async fetchProductList() {
        return requestHelper(END_POINT);
    },

    async createProduct(productData) {
        return requestHelper(END_POINT, 'post', productData);
    },

    async deleteProduct(id) {
        return requestHelper(`${END_POINT}/${id}`, 'delete');
    },

    async updateProduct(productData) {
        return requestHelper(`${END_POINT}/${productData._id}`, 'put', productData);
    }
}