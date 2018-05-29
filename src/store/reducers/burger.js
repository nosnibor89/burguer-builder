import * as actionsTypes from '../actions/actionsTypes';
import {updateState} from "../reducer";

const initialState = {
    ingredients: null,
    ingredientsPrices: null,
    totalPrice: 4,
    hasError: false,
    loading: true,
    building: false,
};

const addIngredient = (state, action) => {
    const currentIngCount = state.ingredients && state.ingredients[action.ingredientName] ? state.ingredients[action.ingredientName] + 1 : 1;
    const updatedIngredients =  { ...state.ingredients, [action.ingredientName]: currentIngCount,};
    const updatedPrice = state.totalPrice + state.ingredientsPrices[action.ingredientName];

    return updateState(state, {ingredients: updatedIngredients, totalPrice: updatedPrice, building: true });
};

const removeIngredient = (state, action) => {
    const currentIngCount = state.ingredients && state.ingredients[action.ingredientName] && state.ingredients[action.ingredientName] > 0 ? state.ingredients[action.ingredientName] - 1 : 0;
    const updatedIngredients =  { ...state.ingredients, [action.ingredientName]: currentIngCount,};
    const updatedPrice = state.totalPrice - state.ingredientsPrices[action.ingredientName];

    return updateState(state, {ingredients: updatedIngredients, totalPrice: updatedPrice});
};

const setIngredientPrices = (state, action) => {
    const updatedIngredients =  { ...state.ingredients };

    return updateState(state, {
        ingredients: updatedIngredients,
        totalPrice: initialState.totalPrice,
        ingredientsPrices: action.ingredientsPrices,
        hasError: false,
        loading: false,
        building: false,
    });
};

const fetchIngredientPricesFailed = (state, action) => {
    const updatedIngredients =  { ...state.ingredients };
    return updateState(state, {ingredients: updatedIngredients, hasError: true, loading: false,});
};

const burgerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionsTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionsTypes.SET_INGREDIENTS_PRICES: return setIngredientPrices(state, action);
        case actionsTypes.FETCH_INGREDIENTS_PRICES_FAILED: return fetchIngredientPricesFailed(state, action);

        default:
            return state;
    }
}

export default burgerReducer;