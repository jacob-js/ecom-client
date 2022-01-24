import { Button, Drawer } from 'antd'
import React, { useEffect } from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { HiOutlineMinusSm, HiOutlinePlusSm } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Cart from '../Utils/cart.utils'

function CartDrawer({visible, onClose}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { cartItems: items } = useSelector(({ cart }) => cart);

    useEffect(() =>{
        Cart.getCartItems(dispatch);
    }, []);
    const onDelete = (id) => {
        Cart.removeItem(id, dispatch);
    };
    const onIncrement = (id) => {
        Cart.incrementItem(id, dispatch);
    }
    const onDecrement = (id) => {
        Cart.decrementItem(id, dispatch);
    }
    const getColorImage = (item, colorName) => {
        return item.Colors?.find(color => color.name === colorName)?.image;
    }
    const getColorName = (item) => {
        return item.details?.find(detail => detail?.key === 'color' && detail?.value !== 'couleur principale')?.value;
    }
    return (
        <Drawer title={
            <div className='header'>
                <FiShoppingCart className='icon' /> {items.length} article{`${items.length > 1 ? 's': ''}`}
            </div>
        } placement="right" visible={visible} onClose={onClose} closable={false} zIndex={99999} className='cart-drawer'
            footer={
                <div className="footer">
                    <Button type="primary" className='btn checkout'>Passer à la caisse</Button>
                    <Button type="primary" className='btn view-cart' onClick={() =>{history.push('/cart'); onClose()}}>Voir le panier</Button>
                </div>
            }
        >

            <div className="cart">
                { items.map(item => <div key={item.cartId} className='item'>
                    <div className="qty-manag">
                        <button className="plus" onClick={() =>onIncrement(item.cartId)}> <HiOutlinePlusSm className='icon' /> </button>
                        <div className="qty"> { item.quantity } </div>
                        <button onClick={() =>onDecrement(item.cartId)} className="minus" disabled={item.quantity < 2}> <HiOutlineMinusSm className='icon' /> </button>
                    </div>
                    <div className="prod">
                        <div className="info">
                            <img src={getColorName(item) ? getColorImage(item, getColorName(item)): item.cover} alt="" className='cover' />
                            <div className="sub">
                                <div className="name"> {item.name} </div>
                                <div className="sub-price"> {item.currency === "USD" ? '$': "FC"}{ (item.price-(item.discount || 0))*parseInt(item.quantity) } <span className="sign">x</span> { item.quantity } </div>
                                <div className="price"> {item.currency === "USD" ? '$': "FC"}{ (item.price-(item.discount || 0))*parseInt(item.quantity) }</div>
                            </div>
                        </div>
                        <div className="action" onClick={() =>onDelete(item.cartId)}> <MdClose className='icon' /> </div>
                    </div>
                </div>) }
            </div>
        </Drawer>
    )
}

export default CartDrawer
