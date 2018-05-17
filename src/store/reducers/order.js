import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
    orders: [],
    loading: false,
    orderData: null,
    orderId: null,
    error: null,
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
            };
        case actionsTypes.PURCHASE_BURGER_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        default:
            return state;
    }
}

export default orderReducer;