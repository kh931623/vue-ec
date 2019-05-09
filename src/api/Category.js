import requestHelper from './requestHelper.js';

const END_POINT = '/category';

export default {
    async fetchCategoryList() {
        return requestHelper(END_POINT);
    },

    async createCategory(categoryData) {
        return requestHelper(END_POINT, 'post', categoryData);
    },

    async deleteCategory(id) {
        return requestHelper(`${END_POINT}/${id}`, 'delete');
    },

    async updateCategory(category) {
        return requestHelper(`${END_POINT}/${category._id}`, 'put', category);
    }
}