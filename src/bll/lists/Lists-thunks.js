// THUNK CREATOR:
import {listsAPI} from "../../api/2-lists-api"
import {
    addListSuccess, addTaskSuccess,
    deleteListSuccess,
    setErrorMessage,
    setLists,
    setListsLoading, setLoadingTasks,
    setTasks,
    updateListSuccess
} from "./ListsReducer"
import {setError} from "../auth/AuthReducer"

export const getLists = () => async (dispatch) => {
    try {
        dispatch(setListsLoading(true))
        const data = await listsAPI.getLists()
        dispatch(setLists(data));
        dispatch(setListsLoading(false))
    } catch (error) {
        dispatch(setErrorMessage(error.message))
        console.log('error', error.message);
    }
}

export const addList = list => async dispatch => {
    try {
        dispatch(setListsLoading(true))
        const data = await listsAPI.addList(list)
        dispatch(setListsLoading(false))
        dispatch(addListSuccess(data));
    } catch (error) {
        dispatch(setErrorMessage(error.message))
        console.log('error', error.message);
    }
}

export const deleteList = listId => async dispatch => {
    try {
        dispatch(setListsLoading(true))
        const data = await listsAPI.deleteList(listId)
        dispatch(setListsLoading(false))
        if (data.resultCode === 0) {
            dispatch(deleteListSuccess(listId));
        } else {
            let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
            dispatch(setErrorMessage(message))
        }
    } catch (error) {
        dispatch(setErrorMessage(error.message))
        console.log('error', error.message);
    }
}

export const updateList = (listId, payload) => async dispatch => {
    try {
        dispatch(setListsLoading(true))
        const data = await listsAPI.updateTitleList(listId, payload)
        dispatch(setListsLoading(false))
        if (data.resultCode === 0) {
            dispatch(updateListSuccess(listId, payload));
        } else {
            let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
            dispatch(setErrorMessage(message))
        }
    } catch (error) {
        dispatch(setErrorMessage(error.message))
        console.log('error', error.message);
    }
}

export const getTasks = (listId) => async (dispatch) => {
    try {
        dispatch(setLoadingTasks(listId,true))
        const data = await listsAPI.getTasks(listId)
        dispatch(setLoadingTasks(listId,false))
        dispatch(setTasks(listId, data));
    } catch (error) {
        dispatch(setErrorMessage(error.message))
        console.log('error', error.message);
    }
}

export const addTask = (newTask, listId) => async (dispatch) => {
    try {
        dispatch(setLoadingTasks(listId, true))
        const data = await listsAPI.addTask(listId, newTask)
        dispatch(setLoadingTasks(listId,false))
        if (data.resultCode === 0) {
            dispatch(addTaskSuccess(data.data.item, listId));
        } else {
            let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
            dispatch(setErrorMessage(message))
        }
    } catch (error) {
        dispatch(setErrorMessage(error.message))
        console.log('error', error.message);
    }
}
