import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    headers: {
        // 'API-KEY': '7dc52db3-0d14-44ab-80ee-40d908279e0f'
    },
});

export const listsAPI = {
    getLists() {
        return instance.get('/todo-lists',).then(response => response.data
            //array of lists ({id: 'asd', order: -1, title: 'title'})
        )
    },
    addList(title) {
        return instance.post('/todo-lists', {title: title}).then(response => response.data.data.item)
    }
}
