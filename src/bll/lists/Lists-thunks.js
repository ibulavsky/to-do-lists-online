// THUNK CREATOR:
import {listsAPI} from "../../api/2-lists-api"
import {addList, setErrorMessage, setLists, setListsLoading, setTasks} from "./ListsReducer"

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

export const getTasks = (listId) => async (dispatch) => {
    try {
        // dispatch(setListsLoading(true))
        const data = await listsAPI.getWishes(listId)
        // dispatch(setListsLoading(false))
        dispatch(setTasks(listId, data));
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
