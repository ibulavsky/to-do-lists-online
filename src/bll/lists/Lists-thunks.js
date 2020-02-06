// THUNK CREATOR:
import {listsAPI} from "../../api/2-lists-api"
import {
    addListSuccess, addTaskSuccess,
    deleteListSuccess, deleteTaskSuccess,
    setErrorMessage,
    setLists,
    setListsLoading, setLoadingTasks,
    setTasks,
    updateListSuccess, updateTaskSuccess
} from "./ListsReducer"

export const getLists = () => async (dispatch) => {
    try {
        dispatch(setListsLoading(true))
        const data = await listsAPI.getLists()
        dispatch(setLists(data));
        dispatch(setListsLoading(false))
    } catch (error) {
        dispatch(setListsLoading(false))
        dispatch(setErrorMessage(error.message))
        console.log('error get Lists', error.message);
    }
}

export const addList = list => async dispatch => {
    try {
        dispatch(setListsLoading(true))
        const data = await listsAPI.addList(list)
        dispatch(addListSuccess(data));
        dispatch(setListsLoading(false))
    } catch (error) {
        dispatch(setListsLoading(false))
        dispatch(setErrorMessage(error.message))
        console.log('error add List', error.message);
    }
}

export const deleteList = listId => async dispatch => {
    try {
        dispatch(setListsLoading(true))
        const data = await listsAPI.deleteList(listId)
        if (data.resultCode === 0) {
            dispatch(deleteListSuccess(listId));
            dispatch(setListsLoading(false))
        } else {
            dispatch(setListsLoading(false))
            let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
            dispatch(setErrorMessage(message))
        }
    } catch (error) {
        dispatch(setListsLoading(false))
        dispatch(setErrorMessage(error.message))
        console.log('error delete List', error.message);
    }
}

export const updateList = (listId, payload) => async dispatch => {
    try {
        dispatch(setListsLoading(true))
        const data = await listsAPI.updateTitleList(listId, payload)
        if (data.resultCode === 0) {
            dispatch(updateListSuccess(listId, payload));
            dispatch(setListsLoading(false))
        } else {
            dispatch(setListsLoading(false))
            let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
            dispatch(setErrorMessage(message))
        }
    } catch (error) {
        dispatch(setListsLoading(false))
        dispatch(setErrorMessage(error.message))
        console.log('error update List', error.message);
    }
}

export const getTasks = (listId) => async (dispatch) => {
    try {
        dispatch(setLoadingTasks(listId, true))
        const data = await listsAPI.getTasks(listId)
        dispatch(setTasks(listId, data));
        dispatch(setLoadingTasks(listId, false))
    } catch (error) {
        dispatch(setLoadingTasks(listId, false))
        dispatch(setErrorMessage(error.message))
        console.log('error get Tasks', error.message);
    }
}

export const addTask = (newTask, listId) => async (dispatch) => {
    try {
        dispatch(setLoadingTasks(listId, true))
        const data = await listsAPI.addTask(listId, newTask)
        if (data.resultCode === 0) {
            dispatch(addTaskSuccess(data.data.item, listId));
            dispatch(setLoadingTasks(listId, false))
        } else {
            dispatch(setLoadingTasks(listId, false))
            let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
            dispatch(setErrorMessage(message))
        }
    } catch (error) {
        dispatch(setLoadingTasks(listId, false))
        dispatch(setErrorMessage(error.message))
        console.log('error add Task', error.message);
    }
}

export const deleteTask = (listId, taskId) => async (dispatch) => {
    try {
        dispatch(setLoadingTasks(listId, true))
        const data = await listsAPI.deleteTask(listId, taskId)
        if (data.resultCode === 0) {
            dispatch(deleteTaskSuccess(listId, taskId));
            dispatch(setLoadingTasks(listId, false))
        } else {
            dispatch(setLoadingTasks(listId, false))
            let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
            dispatch(setErrorMessage(message))
        }
    } catch (error) {
        dispatch(setLoadingTasks(listId, false))
        dispatch(setErrorMessage(error.message))
        console.log('error delete Task', error.message);
    }
}

export const updateTask = (listId, taskId, updatedTask) => async (dispatch) => {
    try {
        dispatch(setLoadingTasks(listId, true))
        const data = await listsAPI.updateTask(listId, taskId, updatedTask)
        if (data.resultCode === 0) {
            dispatch(updateTaskSuccess(listId, taskId, updatedTask));
            dispatch(setLoadingTasks(listId, false))
        } else {
            dispatch(setLoadingTasks(listId, false))
            let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
            dispatch(setErrorMessage(message))
        }
    } catch (error) {
        dispatch(setLoadingTasks(listId, false))
        dispatch(setErrorMessage(error.message))
        console.log('error delete Task', error.message);
    }
}
