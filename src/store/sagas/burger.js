import { put } from 'redux-saga/effects';

import OrdersApi from "../../api/orders";
import * as actions from "../actions";


export function* initIngredientsPricesSaga() {

        try {
            const res = yield OrdersApi.getIngredients();
            yield put(actions.setIngredientsPrices(res.data));

        }catch (err) {
            yield put(actions.fetchIngredientsPricesFailed());
        }
}