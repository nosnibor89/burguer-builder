import * as actionTypes from './actionsTypes';

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
});

export const tryPurchaseBurger = (order,token) => ({
    type: actionTypes.PURCHASE_BURGER_EFFECT_STARTED,
    order,
    token,
});

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

export const tryFetchOrders = (token, userId) => ({
    type: actionTypes.FETCH_ORDERS_EFFECT_STARTED,
    token,
    userId,
});

