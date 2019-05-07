import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:3000/api'
});

/**
 * @description base request sender
 * @param {String} url - url
 * @param {String} [method=get] - http method
 * @param {Object} [data=null] - data sent to the server
 * @param {Object} [configs={}] - other options
 */
export default async function requestHelper(url, method = 'get', data = null, configs = {}) {
    if (!url) {
        throw new Error('url should be provided!');
    }
    if (method === 'get' && data) {
        throw new Error('get method should use with query string instead of data!');
    }

    const response = await axiosInstance({
        url,
        method,
        data,
        ...configs
    });
    console.log(response);

    if (response.data.reload) {
        window.location.reload();
    }

    if (!response.data.success) {
        throw new Error(response.data.errorMessage);
    }

    return response.data;
}