const SET_LISTS = 'ListsAPP/ListsReducer/SET_LISTS';
const SET_LISTS_LIMITATION = 'ListsAPP/ListsReducer/SET_LISTS_LIMITATION';
const SET_LISTS_LOADING = 'ListsAPP/ListsReducer/SET_LISTS_LOADING';
const SET_ERROR_MESSAGE = 'ListsAPP/ListsReducer/SET_ERROR_MESSAGE';
const SET_TASKS = 'ListsAPP/ListsReducer/SET_TASKS';
const SET_LOADING_TASKS = 'ListsAPP/ListsReducer/SET_LOADING_TASKS';


const ADD_LIST = 'ListsAPP/ListsReducer/ADD_LIST';
const DELETE_LIST = 'ListsAPP/ListsReducer/DELETE_LIST';
const UPDATE_LIST = 'ListsAPP/ListsReducer/UPDATE_LIST';
const ADD_TASK = 'ListsAPP/ListsReducer/ADD_TASK';
const DELETE_TASK = 'ListsAPP/ListsReducer/DELETE_TASK';
const UPDATE_TASK = 'ListsAPP/ListsReducer/UPDATE_TASK';


let initialState = {
    lists: [
        // {
        //     name: 'ListTOP',
        //     id: '98e8465e-894f-4491-905a-2111f823b728',
        //     tasks: [
        //         {
        //             id: '515f5f49-0a8b-4fd3-a298-b96426c062cc',
        //             title: 'ads',
        //             description: null,
        //             completed: false,
        //             todoListId: '98e8465e-894f-4491-905a-2111f823b728',
        //             order: 0,
        //             status: 0,
        //             priority: 1,
        //             startDate: null,
        //             deadline: null,
        //             addedDate: '2019-12-11T18:20:58.023'
        //         }
        //     ]
        // }
    ],
    isListsLoading: false,
    errorMessage: '',
}

const listsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LISTS:
            return {
                ...state,
                lists: [...action.lists],
            };
            case SET_LISTS_LIMITATION:
            return {
                ...state,
                isListsLimit: action.isLimitation,
            };
        case SET_LISTS_LOADING:
            return {
                ...state,
                isListsLoading: action.listsLoading,
            };
        case SET_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.errorMessage,
            };
        case SET_TASKS:
            return {
                ...state,
                lists: state.lists.map(l => {
                    if (l.id === action.listId) {
                        return {
                            ...l, tasks: [...action.tasks]
                        }
                    } else {
                        return l
                    }
                }),
            };
        case SET_LOADING_TASKS:
            return {
                ...state,
                lists: state.lists.map(l => {
                    if (l.id === action.listId) {
                        return {
                            ...l, taskLoading: action.taskLoading
                        }
                    } else {
                        return l
                    }
                }),
            };
        case ADD_LIST:
            return {
                ...state,
                lists: [action.newList, ...state.lists],
            };
        case DELETE_LIST:
            return {
                ...state,
                lists: state.lists.filter(wl => {
                    if (wl.id !== action.listId) {
                        return true
                    } else {
                        return false
                    }
                })
            };
        case UPDATE_LIST:
            return {
                ...state,
                lists: state.lists.map(l => {
                    if (l.id === action.listId) {
                        return {...l, ...action.payload}
                    }
                    return l
                })
            };
        case ADD_TASK:
            return {
                ...state,
                lists: state.lists.map(l => {
                    if (l.id === action.listId) {
                        return {
                            ...l, tasks: [action.newTask, ...l.tasks]
                        }
                    } else {
                        return l
                    }
                }),
            };
        case DELETE_TASK:
            return {
                ...state,
                lists: state.lists.map(l => {
                    if (l.id === action.listId) {
                        return {
                            ...l, tasks: l.tasks.filter(w => {
                                if (w.id !== action.taskId) {
                                    return true
                                }
                                return false
                            })
                        }
                    }
                    return l
                })
            };
        case UPDATE_TASK:
            return {
                ...state,
                lists: state.lists.map(l => {
                        if (l.id === action.listId) {
                            return {
                                ...l, tasks: l.tasks.map(w => {
                                    if (w.id === action.taskId) {
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

export const setLists = lists => ({type: SET_LISTS, lists})
export const setListsLimitation = isLimitation => ({type: SET_LISTS_LIMITATION, isLimitation})
export const setListsLoading = listsLoading => ({type: SET_LISTS_LOADING, listsLoading})
export const setErrorMessage = errorMessage => ({type: SET_ERROR_MESSAGE, errorMessage})
export const setTasks = (listId, tasks) => ({type: SET_TASKS, listId, tasks})
export const setLoadingTasks = (listId, taskLoading) => ({type: SET_LOADING_TASKS, listId, taskLoading})


export const addListSuccess = newList => ({type: ADD_LIST, newList})
export const deleteListSuccess = listId => ({type: DELETE_LIST, listId})
export const updateListSuccess = (listId, payload) => ({type: UPDATE_LIST, listId, payload})
export const addTaskSuccess = (newTask, listId) => ({type: ADD_TASK, newTask, listId})
export const deleteTaskSuccess = (listId, taskId) => ({type: DELETE_TASK, listId, taskId})
export const updateTaskSuccess = (listId, taskId, payload) => ({type: UPDATE_TASK, listId, taskId, payload})
