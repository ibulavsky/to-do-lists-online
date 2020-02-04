import {authAPI, securityAPI} from "../../api/1-auth-api"
import {getCaptchaUrlSuccess, setAuthUserData, setError, setLoading} from "./AuthReducer"

// THUNK CREATOR:
export const getAuthUserData = () => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await authAPI.me()
        dispatch(setLoading(false))
        if (data.resultCode === 0) {
            let {id, email, login} = data.data;
            dispatch(setAuthUserData(id, email, login, true));
        } else {
            let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
            dispatch(setError(message));
        }
    } catch (error) {
        error.message &&
        dispatch(setError(error.message))
    }
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await authAPI.login(email, password, rememberMe, captcha)
        dispatch(setLoading(false))
        if (response.data.resultCode === 0) {
            // success
            dispatch(getAuthUserData())
        } else {
            if (response.data.resultCode === 10) {
                dispatch(getCaptchaUrl());
            }
            let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
            dispatch(setError(message));
        }
    } catch (error) {
        error.message &&
        dispatch(setError(error.message))
    }
}

export const logout = () => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await authAPI.logout()
        dispatch(setLoading(false))
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        } else {
            let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
            dispatch(setError(message));
        }
    } catch (error) {
        error.message &&
        dispatch(setError(error.message))
    }
}

export const getCaptchaUrl = () => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await securityAPI.getCaptchaUrl()
        dispatch(setLoading(false))
        const captchUrl = response.data.url
        dispatch(getCaptchaUrlSuccess(captchUrl));
    } catch (error) {
        console.error(error.response.message);
    }
}
