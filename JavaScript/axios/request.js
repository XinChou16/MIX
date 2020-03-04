// CMD
// const axios = require('axios').default;

// ES Module
import axios from 'axios';

const instance = axios.create({
    baseUrl: '',
    headers: {},
    timeout: 0,
});

// request interception
instance.interceptors.request.use((res) => {
    return res;
}, (err) => {
    return Promise.reject(err);
});

// response interception
instance.interceptors.response.use((res) => {
    return res;
}, (err) => {
    return Promise.reject(err);
});


const get = (url, data, config) => {
    return instance.get(url, config);
}

const post = (url, data, config) => {
    return instance.post(url, data, config);
}

export { get, post };
export default { get, post};
