import * as actionTypes from './actionsTypes';
import AuthApi from "../../api/auth";
import {AUTH_LOGOUT} from "./actionsTypes";


export const AuthStarted = (username, password) => ({
    type: actionTypes.AUTH_STARTED,
});

export const AuthSuccess = (idToken,localId) => ({
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    userId: localId,
});

export const AuthFailed = (error) => ({
    type: actionTypes.AUTH_FAILED,
    error: error,
});

const logOut = () => ({
    type: AUTH_LOGOUT,
})

const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logOut());
        }, +expirationTime * 1000)
    }
}


export const tryAuth = (username, password, signUp = false) => {
    return dispatch => {
        dispatch(AuthStarted());

        const operation = signUp ? AuthApi.signUp : AuthApi.signIn;

        operation({email: username, password})
            .then(res => {
                console.log(res);
                dispatch(AuthSuccess(res.data.idToken, res.data.localId));
                dispatch(checkAuthTimeout(res.data.expiresIn));
            })
            .catch(err => {
                console.log(err);
                dispatch(AuthFailed(err.response.data.error));
            })
    }
}