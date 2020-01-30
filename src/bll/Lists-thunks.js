// THUNK CREATOR:
import {listsAPI} from "../api/api"
import {setErrorMessage, setLists, setListsLoading, setWishes} from "./ListsReducer"

export const getLists = () => async (dispatch) => {
    try {
        dispatch(setListsLoading(true))
        const data = await listsAPI.getLists()
        dispatch(setLists(data));
        dispatch(setListsLoading(false))
    } catch (error) {
        dispatch(setErrorMessage(error.message))
        console.log('error', error.message
            // error.response.message ? error.response.message :
        );
    }
}

export const getWishes = (listId) => async (dispatch) => {
    try {
        // dispatch(setListsLoading(true))
        const data = await listsAPI.getWishes(listId)
        // dispatch(setListsLoading(false))
        dispatch(setWishes(listId, data));
    } catch (error) {
        dispatch(setErrorMessage(error.message))
        console.log('error', error.message);
    }
}
