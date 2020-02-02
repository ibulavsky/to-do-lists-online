const SET_USER_DATA = 'ListsAPP/AuthReducer/SET_USER_DATA';
const SET_AUTHENTICATION = 'ListsAPP/AuthReducer/SET_AUTHENTICATION';
const SET_LOADING = 'ListsAPP/AuthReducer/SET_LOADING';
const SET_ERROR = 'ListsAPP/AuthReducer/SET_ERROR';
const GET_CAPTCHA_URL_SUCCESS = 'ListsAPP/AuthReducer/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    isAuth: false,
    loading: false,
    email: '',
    errorMessage: ''
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
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
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                captchaUrl: action.captchaUrl,
            };
        case SET_ERROR:
            return {
                ...state,
                errorMessage: action.errorMessage,
            };
        default:
            return state;
    }
};

export default authReducer

export const setAuthentication = authentication => ({type: SET_AUTHENTICATION, authentication})
export const setLoading = loading => ({type: SET_LOADING, loading})
export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA, payload: {userId, email, login, isAuth}
});
export const setError = errorMessage => ({type: SET_ERROR, errorMessage})
export const getCaptchaUrlSuccess = (captchaUrl) => ({type: GET_CAPTCHA_URL_SUCCESS, captchaUrl});
