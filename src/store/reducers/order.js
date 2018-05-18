import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
    orders: [],
    loading: false,
    error: null,
    purchased: false
};


const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId,
            };
            return {
                ...state,
                orders: state.orders.concat(newOrder),
                loading: false,
                purchased: true,
            };
        case actionsTypes.PURCHASE_BURGER_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false,
            };

        case actionsTypes.PURCHASE_BURGER_STARTED:
            return {
                ...state,
                loading: action.loading,
            };
        case actionsTypes.PURCHASE_BURGER_INIT:
            return {
                ...state,
                purchased: false,
            };

        case actionsTypes.FETCH_ORDERS_STARTED:
            return {
                ...state,
                loading: true,
            };
        case actionsTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: [...action.orders],
                loading: false,
            };
        default:
            return state;
    }
}

export default orderReducer;