import { cartActionTypes } from "../../actionsTypes/cart";

const cartReducer = (state, {type, payload}) =>{
    switch(type){
        case cartActionTypes.REFETCH_CART:
            return {
                ...state,
                cartItems: payload
            }
    }
}

export default cartReducer;