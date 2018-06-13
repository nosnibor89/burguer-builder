import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionsTypes';
import { logOutSaga, checkAuthTimeoutSaga, tryAuthSaga, authCheckStateSaga } from './auth';
import { tryFetchOrdersSaga, tryPurchaseBurgerSaga } from './order';

export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_INITIATED_LOGOUT, logOutSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
    yield takeEvery(actionTypes.AUTH_EFFECT_STARTED, tryAuthSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_EFFECT_STARTED, authCheckStateSaga);

    yield takeEvery(actionTypes.FETCH_ORDERS_EFFECT_STARTED, tryFetchOrdersSaga );
    yield takeEvery(actionTypes.PURCHASE_BURGER_EFFECT_STARTED, tryPurchaseBurgerSaga)
}

// export function* watchOrder() {
//     yield takeEvery(actionTypes.FETCH_ORDERS_EFFECT_STARTED, tryFetchOrdersSaga );
// }

