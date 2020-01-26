const RESTORE_STATE = 'wishesListsAPP/ListsReducer/RESTORE_STATE';
const ADD_WISHLIST = 'wishesListsAPP/ListsReducer/ADD_WISHLIST';
const DELETE_WISHLIST = 'wishesListsAPP/ListsReducer/DELETE_WISHLIST';
const UPDATE_WISHLIST = 'wishesListsAPP/ListsReducer/UPDATE_WISHLIST';
const ADD_WISH = 'wishesListsAPP/ListsReducer/ADD_WISH';
const DELETE_WISH = 'wishesListsAPP/ListsReducer/DELETE_WISH';
const UPDATE_WISH = 'wishesListsAPP/ListsReducer/UPDATE_WISH';


let initialState = {
    wishesLists: [
        //     {
        //     name: 'ListTOP',
        //     id: 1,
        //     wishes: [{title: 'Wish', priority: 2, status: false, id: 1}
        //     ]
        // }
    ],
}

const listsReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESTORE_STATE:
            return {
                ...state,
                wishesLists: [...action.restoredWishesList, ...state.wishesLists],
            };
        case ADD_WISHLIST:
            return {
                ...state,
                wishesLists: [action.newWishesList, ...state.wishesLists],
            };
        case DELETE_WISHLIST:
            return {
                ...state,
                wishesLists: state.wishesLists.filter(wl => {
                    if (wl.id !== action.wishesListId) {
                        return true
                    } else {
                        return false
                    }
                })
            };
        case UPDATE_WISHLIST:
            return {
                ...state,
                wishesLists: state.wishesLists.map(wl => {
                    if (wl.id === action.wishesListId) {
                        return {...wl, ...action.payload}
                    }
                    return wl
                })
            };
        case ADD_WISH:
            return {
                ...state,
                wishesLists: state.wishesLists.map(l => {
                    if (l.id === action.listId) {
                        return {
                            ...l, wishes: [action.newWish, ...l.wishes]
                        }
                    } else {
                        return l
                    }
                }),
            };
        case DELETE_WISH:
            return {
                ...state,
                wishesLists: state.wishesLists.map(l => {
                    if (l.id === action.listId) {
                        return {
                            ...l, wishes: l.wishes.filter(w => {
                                if (w.id !== action.wishId) {
                                    return true
                                }
                                return false
                            })
                        }
                    }
                    return l
                })
            };
        case UPDATE_WISH:
            return {
                ...state,
                wishesLists: state.wishesLists.map(l => {
                        if (l.id === action.listId) {
                            return {
                                ...l, wishes: l.wishes.map(w => {
                                    if (w.id === action.wishId) {
                                        return {...w, ...action.payload}
                                    }
                                    return w
                                })
                            }
                        }
                        return l
                    }
                )
            }
        default:
            return state;
    }
};

export default listsReducer

export const restoreStateList = restoredWishesList => ({type: RESTORE_STATE, restoredWishesList})
export const addWishesList = newWishesList => ({type: ADD_WISHLIST, newWishesList})
export const deleteWishesList = wishesListId => ({type: DELETE_WISHLIST, wishesListId})
export const updateWishesList = (wishesListId, payload) => ({type: UPDATE_WISHLIST, wishesListId, payload})
export const addWish = (newWish, listId) => ({type: ADD_WISH, newWish, listId})
export const deleteWish = (listId, wishId) => ({type: DELETE_WISH, listId, wishId})
export const updateWish = (listId, wishId, payload) => ({type: UPDATE_WISH, listId, wishId, payload})
