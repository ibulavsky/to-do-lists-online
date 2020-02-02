import {authAPI, securityAPI} from "../../api/1-auth-api"
import {getCaptchaUrlSuccess, setAuthUserData, setError} from "./AuthReducer"

// THUNK CREATOR:
export const getAuthUserData = () => async (dispatch) => {
    try {
        const data = await authAPI.me()
        if (data.resultCode !== 0) {
        } else if (data.resultCode === 0) {
            let {id, email, login} = data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }
    } catch (error) {
        error.message &&
        dispatch(setError(error.message))
    }
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    try {
        const response = await authAPI.login(email, password, rememberMe, captcha)
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
        console.error(error.message);
    }
}

export const logout = () => async (dispatch) => {
    try {
        const response = await authAPI.logout()
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        } else {
            console.error("Fail logout", response);
        }
    } catch (error) {
        console.error(error.message);
    }
}

export const getCaptchaUrl = () => async (dispatch) => {
    try {
        const response = await securityAPI.getCaptchaUrl()
        const captchUrl = response.data.url
        dispatch(getCaptchaUrlSuccess(captchUrl));
    } catch (error) {
        console.error(error.response.message);
    }
}
