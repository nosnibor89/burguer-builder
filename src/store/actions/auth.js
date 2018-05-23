import * as actionTypes from './actionsTypes';
import AuthApi from "../../api/auth";


export const AuthStarted = (username, password) => ({
    type: actionTypes.AUTH_STARTED,
});

export const AuthSuccess = (data) => ({
    type: actionTypes.AUTH_SUCCESS,
    authData: data,
});

export const AuthFailed = (error) => ({
    type: actionTypes.AUTH_FAILED,
    error: error,
});


export const tryAuth = (username, password) => {
    return dispatch => {
        dispatch(AuthStarted());

        AuthApi.getToken({email: username, password})
            .then(res => {
                console.log(res);
                dispatch(AuthSuccess(res.data));
            })
            .catch(err => {
                console.log(err);
                dispatch(AuthFailed(err));
            })

    }
}