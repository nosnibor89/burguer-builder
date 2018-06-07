import authReducer from './auth';
import * as actionTypes from '../actions/actionsTypes';

describe('auth reducer', () => {

    const initialState = {
        token: null,
        userId: null,
        error: null,
        loading: false,
        authRedirectPath: '/',
    };

    it('should return the inital state ', () => {
        expect(authReducer(undefined, {})).toEqual(initialState);
    });

    it('should store the token upon login', () => {
        const token = 'mysuperToken';
        const userId = 'myUserId';
        const state = authReducer(initialState, { type: actionTypes.AUTH_SUCCESS, idToken: token, userId: userId });

        expect(state.token).toEqual(token);
        expect(state.userId).toEqual(userId);
    });
})
