import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: '/api'
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

    let requestUrl = url;
    if (method === 'get' && data) {
        const queryString = Object.keys(data).reduce((prev, key) => {
            return `${prev}${key}=${data[key]}&`;
        }, '');
        requestUrl = `${url}?${queryString}`;
    }

    const response = await axiosInstance({
        url: requestUrl,
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