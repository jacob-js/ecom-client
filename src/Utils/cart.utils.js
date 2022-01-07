import { cartActionTypes } from "../Redux/actionsTypes/cart";
import { sendNotif } from "./notif";

let items = JSON.parse(localStorage.getItem('cartItems')) || [];
const Cart = {
    getCartItems(dispatch) {
        dispatch({
            type: cartActionTypes.REFETCH_CART,
            payload:  JSON.parse(localStorage.getItem('cartItems')) || []
        });
    },
    addToCart(item, dispatch) {
        const prod =  items.find(i => i.id === item.id);
        if(prod){
            const prodIndex = items.findIndex(i => i.id === item.id);
            prod.quantity += 1;
            items[prodIndex] = prod;
            localStorage.setItem('cartItems', JSON.stringify(items));
        }else{
            items.push(item);
            localStorage.setItem('cartItems', JSON.stringify(items));
        }
        dispatch({
            type: cartActionTypes.REFETCH_CART,
            payload:  JSON.parse(localStorage.getItem('cartItems')) || []
        });
        sendNotif(`${item.name} ajouté au panier`, 'success');
    },
    removeItem(id, dispatch) {
        const products = items.filter(i => i.id !== id);
        items = products;
        localStorage.setItem('cartItems', JSON.stringify(products));
        dispatch({
            type: cartActionTypes.REFETCH_CART,
            payload: products
        });
    },
    incrementItem(id, dispatch) {
        const prod = items.find(i => i.id === id);
        const prodIndex = items.findIndex(i => i.id === id);
        prod.quantity += 1;
        items[prodIndex] = prod;
        localStorage.setItem('cartItems', JSON.stringify(items));
        dispatch({
            type: cartActionTypes.REFETCH_CART,
            payload: items
        });
    },
    decrementItem(id, dispatch) {
        const prod = items.find(i => i.id === id);
        const prodIndex = items.findIndex(i => i.id === id);
        prod.quantity -= 1;
        items[prodIndex] =prod;
        localStorage.setItem('cartItems', JSON.stringify(items));
        dispatch({
            type: cartActionTypes.REFETCH_CART,
            payload:  items
        });
    }
}

export default Cart;