import { delay } from 'redux-saga';
import { put } from 'redux-saga/effects';

import * as actions from "../actions";
import AuthApi from "../../api/auth";

export function* logOutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');

    yield put(actions.logOutSuccess());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(+action.expirationTime * 1000);
    yield put(actions.logOut());
}

export function* tryAuthSaga(action) {
    const { username, password, signUp } = action;

    yield put(actions.authStarted());
    const operation = signUp ? AuthApi.signUp : AuthApi.signIn;

    try {
        const res = yield operation({email: username, password});
        const { idToken, expiresIn, localId } = res.data;
        const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
        const userId = localId;
        yield localStorage.setItem('token', idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', userId);
        yield put(actions.authSuccess(idToken, userId));
        yield put(actions.checkAuthTimeout(expiresIn));

    }catch (err) {
        yield put(actions.authFailed(err.response.data.error));
    }
}

 export function* authCheckStateSaga(action){
        const token = localStorage.getItem('token');
        if(!token){
            yield put(actions.logOut());
            return;
        }

        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if(expirationDate <= new Date()){
            yield put(actions.logOut());
            return;
        }

        const userId = localStorage.getItem('userId');
        yield put(actions.authSuccess(token, userId));
        yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));

}