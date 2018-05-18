import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
    // ingredients: {
    //     salad: 0,
    //     bacon: 0,
    //     cheese: 0,
    //     meat: 0,
    // },
    ingredients: null,
    ingredientsPrices: null,
    totalPrice: 4,
    hasError: false,
    loading: true,
};

// const INGREDIENT_PRICES = {
//     salad: 0.5,
//     cheese: 0.4,
//     meat: 1.3,
//     bacon: 0.6,
// };

const burgerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.ADD_INGREDIENT:{
            const currentIngCount = state.ingredients && state.ingredients[action.ingredientName] ? state.ingredients[action.ingredientName] + 1 : 1;

            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: currentIngCount,
                },
                totalPrice: state.totalPrice + state.ingredientsPrices[action.ingredientName],
            };
        }

        case actionsTypes.REMOVE_INGREDIENT:
            const currentIngCount = state.ingredients && state.ingredients[action.ingredientName] && state.ingredients[action.ingredientName] > 0 ? state.ingredients[action.ingredientName] - 1 : 0;
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: currentIngCount,
                },
                totalPrice: state.totalPrice - state.ingredientsPrices[action.ingredientName],
            };
        case actionsTypes.SET_INGREDIENTS_PRICES:
            return {
                ...state,
                ingredients: {
                    ...action.ingredients,
                },
                totalPrice: initialState.totalPrice,
                ingredientsPrices: action.ingredientsPrices,
                hasError: false,
                loading: false,
            };
        case actionsTypes.FETCH_INGREDIENTS_PRICES_FAILED:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                },
                hasError: true,
                loading: false,
            };
        default:
            return state;
    }
}

export default burgerReducer;