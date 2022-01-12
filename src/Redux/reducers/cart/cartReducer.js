import { cartActionTypes } from "../../actionsTypes/cart";

const cartReducer = (state, {type, payload}) =>{
    switch(type){
        case cartActionTypes.REFETCH_CART:
            return {
                ...state,
                cartItems: payload
            }
        case cartActionTypes.CLEAR_CART:
            return {
                ...state,
                cartItems: []
            }
    }
}

export default cartReducer;