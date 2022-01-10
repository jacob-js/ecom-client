import { cartActionTypes } from "../Redux/actionsTypes/cart";
import { sendNotif } from "./notif";

let items = JSON.parse(localStorage.getItem('cartItems')) || [];
const checkSameItem = async(item1, item2) => {
    let results = [];
    return new Promise((resolve, reject) => {
        item1?.details?.forEach((elmt, index) => {
            results.push(elmt.key === item2.details[index].key && elmt.value === item2?.details[index].value)
        });
        if(item1?.details?.length > 0){
            if(results.length === item1.details?.length) {
                if(results.every(elmt => elmt === true)){
                    resolve(true);
                }else{
                    resolve(false);
                }
            }
        }else{
            resolve(false);
        }
    })
}
const Cart = {
    getCartItems(dispatch) {
        dispatch({
            type: cartActionTypes.REFETCH_CART,
            payload:  JSON.parse(localStorage.getItem('cartItems')) || []
        });
    },
    async addToCart(item, dispatch) {
        const prod =  items.find(i => i.id === item.id);
        const isSameItem = await checkSameItem(prod, item);
        if(prod && isSameItem){
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
    incrementItem(cartId, dispatch) {
        const prod = items.find(i => i.cartId === cartId);
        const prodIndex = items.findIndex(i => i.cartId === cartId);
        prod.quantity += 1;
        items[prodIndex] = prod;
        localStorage.setItem('cartItems', JSON.stringify(items));
        dispatch({
            type: cartActionTypes.REFETCH_CART,
            payload: items
        });
    },
    decrementItem(cartId, dispatch) {
        const prod = items.find(i => i.cartId === cartId);
        const prodIndex = items.findIndex(i => i.cartId === cartId);
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