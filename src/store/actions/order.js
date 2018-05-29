import * as actionTypes from './actionsTypes';
import OrdersApi from "../../api/orders";

export const purchaceBurgerSuccess = (orderId, orderData) => ({
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId,
    orderData,
});

export const purchaseBurgerFailed = error => ({
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error,
});

export const purchaseBurgerStarted = () => ({
    type: actionTypes.PURCHASE_BURGER_STARTED,
    loading: true,
});

export const tryPurchaseBurger = (order,token) => {
    return dispatch => {
        dispatch(purchaseBurgerStarted());

        OrdersApi.saveOrder({ingredients: order.ingredients, price: order.price, orderData: order.formData, userId: order.userId }, token)
            .then((res) => {
                console.log(res.data);
                dispatch(purchaceBurgerSuccess(res.data.name, order));
            })
            .catch((err) => {
                dispatch(purchaseBurgerFailed(err));
                console.log("error: ", err);
                // this.props.onError(err.message);
            });
    }
}

export const purchaseInit = () => ({
    type: actionTypes.PURCHASE_BURGER_INIT,
});


export const fetchOrdersSuccess = (orders) => ({
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    loading: false,
    orders,
});

export const fetchOrdersFailed = error => ({
    type: actionTypes.FETCH_ORDERS_FAILED,
    loading: false,
    error,
});

export const fetchOrdersStarted = () => ({
    type: actionTypes.FETCH_ORDERS_STARTED,
    loading: true,
});

export const tryFetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStarted());

        const queryParams = `orderBy="userId"&equalTo="${userId}"`;
        OrdersApi.getOrders(token, queryParams)
            .then((res) => {
                console.log(res.data);

                dispatch(fetchOrdersSuccess(prepareOrders(res.data)));
            })
            .catch((err) => {
                console.log(err);

                dispatch(fetchOrdersFailed(err));
            });
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