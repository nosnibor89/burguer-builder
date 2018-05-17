import * as actionsTypes from './actionsTypes';
import OrdersApi from "../../api/orders";

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
    ingredientsPrices,
});

export const fetchIngredientsPricesFailed = () => ({
    type: actionsTypes.FETCH_INGREDIENTS_PRICES_FAILED,
});

export const initIngredientsPrices = () => {
    return dispatch => {
        OrdersApi.getIngredients()
            .then((res) =>{
                dispatch(setIngredientsPrices(res.data));
            })
            .catch((err) => {
                dispatch(fetchIngredientsPricesFailed());
            });
    };
}