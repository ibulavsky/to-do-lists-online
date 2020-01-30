const SET_USERNAME = 'wishesListsAPP/AuthReducer/SET_USERNAME';
const SET_AUTHENTICATION = 'wishesListsAPP/AuthReducer/SET_AUTHENTICATION';
const SET_LOADING = 'wishesListsAPP/AuthReducer/SET_LOADING';


let initialState = {
    isAuth: true,
    loading: false,
    username: 'igor'
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERNAME:
            return {
                ...state,
                username: action.username,
            };
            case SET_AUTHENTICATION:
            return {
                ...state,
                isAuth: action.authentication,
            };
        case SET_LOADING:
            return {
                ...state,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export default authReducer

export const setUsername = username => ({type: SET_USERNAME, username})
export const setAuthentication = authentication => ({type: SET_AUTHENTICATION, authentication})
export const setLoading = loading => ({type: SET_LOADING, loading})

