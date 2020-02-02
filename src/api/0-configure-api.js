import * as axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    headers: {
        'API-KEY': '7dc52db3-0d14-44ab-80ee-40d908279e0f'
    },
});
