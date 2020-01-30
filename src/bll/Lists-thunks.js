// THUNK CREATOR:
import {listsAPI} from "../api/api"
import {setErrorMessage, setLists, setListsLoading} from "./ListsReducer"

export const getLists = () => async (dispatch) => {
    try {
        dispatch(setListsLoading(true))
        const data = await listsAPI.getLists()
        dispatch(setListsLoading(false))
        dispatch(setLists(data));
    } catch (error) {
        dispatch(setErrorMessage(error.message))
        console.log('error', error.message
            // error.response.message ? error.response.message :
        );
    }
}
