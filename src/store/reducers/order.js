import * as actionsTypes from '../actions/actionsTypes';
import { updateState } from '../reducer';

const initialState = {
    orders: [],
    loading: false,
    error: null,
    purchased: false
};

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = {
        ...action.orderData,
        id: action.orderId,
    };

    return updateState(state,
        {orders: state.orders.concat(newOrder), loading: false, purchased: true,});
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
        case actionsTypes.PURCHASE_BURGER_FAILED: return updateState(state, { error: action.error, loading: false,});
        case actionsTypes.PURCHASE_BURGER_STARTED: return updateState(state, {loading: true,});
        case actionsTypes.PURCHASE_BURGER_INIT: return updateState(state, {purchased: false,});
        case actionsTypes.FETCH_ORDERS_STARTED: return updateState(state, {loading: true,});
        case actionsTypes.FETCH_ORDERS_SUCCESS: return updateState(state, { orders: [...action.orders], loading: false,});
        case actionsTypes.FETCH_ORDERS_FAILED: return  updateState(state, { loading: false, error: action.error});
        default:
            return state;
    }
}

export default orderReducer;