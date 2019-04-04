import * as actionsTypes from './actionsTypes';

export const addIngredient = (ingName) => ({
    type: actionsTypes.ADD_INGREDIENT,
    ingredientName: ingName,
});

export const removeIngredient = (ingName) => ({
    type: actionsTypes.REMOVE_INGREDIENT,
    ingredientName: ingName,
});

export const setIngredientsPrices = (ingredientsPrices) => ({
    type: actionsTypes.SET_INGREDIENTS_PRICES,
    loading: false,
    ingredients: null,
    ingredientsPrices,
});

export const fetchIngredientsPricesFailed = () => ({
    type: actionsTypes.FETCH_INGREDIENTS_PRICES_FAILED,
});

export const initIngredientsPrices = () => ({
    type: actionsTypes.FETCH_INGREDIENTS_PRICES_EFFECT,
});