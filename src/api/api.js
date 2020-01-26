import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    // здесь будет базовая часть url
    baseURL: '',
    headers: {
        // здесь будет мой api key
        'API-KEY': ''
    },
});
