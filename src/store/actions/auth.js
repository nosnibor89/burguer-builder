import * as actionTypes from './actionsTypes';

export const authStarted = () => ({
    type: actionTypes.AUTH_STARTED,
});

export const authSuccess = (idToken,localId) => ({
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    userId: localId,
});

export const authFailed = (error) => ({
    type: actionTypes.AUTH_FAILED,
    error: error,
});

export const logOut = () => ({
        type: actionTypes.AUTH_INITIATED_LOGOUT,
});

export const logOutSuccess = () => ({
        type: actionTypes.AUTH_LOGOUT,
});

export const checkAuthTimeout = (expirationTime) => ({
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime,
})

export const authCheckState = () => ({
    type: actionTypes.AUTH_CHECK_EFFECT_STARTED,
})

export const tryAuth = (username, password, signUp = false) => ({
    type: actionTypes.AUTH_EFFECT_STARTED,
    username,
    password,
    signUp,
});

export const setAuthRedirectPath = (path) => ({
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
});