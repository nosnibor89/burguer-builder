import { put } from 'redux-saga/effects';

import OrdersApi from "../../api/orders";
import * as actions from "../actions";

export function* tryFetchOrdersSaga(action){
        yield put(actions.fetchOrdersStarted());

        const queryParams = `orderBy="userId"&equalTo="${action.userId}"`;

        try {
            const res = yield OrdersApi.getOrders(action.token, queryParams);
            yield put(actions.fetchOrdersSuccess(prepareOrders(res.data)));

        }catch (err) {
            yield put(actions.fetchOrdersFailed(err));
        }

}

export function* tryPurchaseBurgerSaga({order,token}){

        yield put(actions.purchaseBurgerStarted());

        try {
            const res = yield OrdersApi.saveOrder({ingredients: order.ingredients, price: order.price, orderData: order.formData, userId: order.userId }, token)
            yield put(actions.purchaceBurgerSuccess(res.data.name, order));
        }catch (err) {
            yield put(actions.purchaseBurgerFailed(err));
        }
}

function prepareOrders(data) {
    const orders = [];
    for (const i in data){
        const order = {
            ...data[i],
            id : i
        };

        orders.push(order);
    }
    return orders;
}