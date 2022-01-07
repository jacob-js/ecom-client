import initialStates from "../../initialStates";
import cartReducer from "./cartReducer";

const cart = (state=initialStates.cart, action={}) => ({
    ...state,
    ...cartReducer(state, action)
});

export default cart;