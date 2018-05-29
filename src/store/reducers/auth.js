import * as actionType from '../actions/actionsTypes';
import {updateState} from "../reducer";

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/',
}

const authStarted = (state, action) => {
    return updateState(state, { error: null, loading: true });
}


const authSuccess = (state, action) => {
    return updateState(state, {loading: false, token: action.idToken, userId: action.userId, error: null});
}


const authFailed = (state, action) => {
    return updateState(state, {loading: false, error: action.error});
}

const authLogout = (state, action) => {
    return updateState(state, {token: null, userId: null});
}

const setAuthRedirectPath = (state, action) => {
    return updateState(state, { authRedirectPath: action.path });
}

const authReducer = (state = initialState, action) => {
    switch (action.type){
        case actionType.AUTH_STARTED: return authStarted(state, action);
        case actionType.AUTH_SUCCESS: return authSuccess(state,action);
        case actionType.AUTH_FAILED: return authFailed(state,action);
        case actionType.AUTH_LOGOUT: return authLogout(state,action);
        case actionType.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state,action);
        default: return state;
    }
}

export default authReducer;