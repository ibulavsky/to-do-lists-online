// THUNK CREATOR:
import {listsAPI} from "../../api/2-lists-api"
import {addList, setErrorMessage, setLists, setListsLoading, setTasks, updateListSuccess} from "./ListsReducer"
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

export const addLists = list => async dispatch => {
    try {
        dispatch(setListsLoading(true))
        const data = await listsAPI.addList(list)
        dispatch(setListsLoading(false))
        dispatch(addList(data));
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
        // dispatch(setListsLoading(true))
        const data = await listsAPI.getTasks(listId)
        // dispatch(setListsLoading(false))
        dispatch(setTasks(listId, data));
    } catch (error) {
        dispatch(setErrorMessage(error.message))
        console.log('error', error.message);
    }
}
