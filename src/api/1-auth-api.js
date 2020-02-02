import * as axios from "axios"

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    headers: {
        'API-KEY': '7dc52db3-0d14-44ab-80ee-40d908279e0f'
    },
});

export const authAPI = {
    async me() {
        const response = await instance.get(`auth/me`)
        return response.data
    },
    login(email, password, rememberMe = false, captcha = null) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete(`auth/login`);
    }
};

export const securityAPI = {
    async getCaptchaUrl() {
        return await instance.get(`security/get-captcha-url`)
    },
};
