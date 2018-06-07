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

export const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');

    return {
        type: AUTH_LOGOUT,
    }
};

const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logOut());
        }, +expirationTime * 1000)
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logOut());
            return;
        }

        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if(expirationDate <= new Date()){
            dispatch(logOut());
            return;
        }

        const userId = localStorage.getItem('userId');
        dispatch(AuthSuccess(token, userId));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
    }
}


export const tryAuth = (username, password, signUp = false) => {
    return dispatch => {
        dispatch(AuthStarted());

        const operation = signUp ? AuthApi.signUp : AuthApi.signIn;

        operation({email: username, password})
            .then(res => {
                const idToken = res.data.idToken;
                const expirationDate = new Date(new Date().getTime() + +res.data.expiresIn * 1000);
                const userId = res.data.localId;

                localStorage.setItem('token', idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', userId);

                dispatch(AuthSuccess(idToken, userId));
                dispatch(checkAuthTimeout(res.data.expiresIn));
            })
            .catch(err => {
                dispatch(AuthFailed(err.response.data.error));
            })
    }
}

export const setAuthRedirectPath = (path) => ({
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
});