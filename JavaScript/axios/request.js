// CMD
// const axios = require('axios').default;

// ES Module
import axios from 'axios';

const instance = axios.create({
    baseURL: '',
    headers: {},
    timeout: 10 * 1000,
});

// request interception
instance.interceptors.request.use((res) => {
    return res;
}, (err) => {
    return Promise.reject(err);
});

// response interception
instance.interceptors.response.use((response) => {
    return response.data;
}, (err) => {
    return Promise.reject(err.response && err.response.data);
});


const get = (url, params = {}, headers = {}) => {
    return instance.get(url, {
      params,
      headers
    });
}

const post = (url, data = {}, headers = {}) => {
    return instance.post(url, data, {
      headers
    });
}

export { get, post };
export default { get, post};
