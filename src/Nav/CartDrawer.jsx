import { Drawer } from 'antd'
import React, { useEffect, useState } from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { HiOutlineMinusSm, HiOutlinePlusSm } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import Cart from '../Utils/cart.utils'

function CartDrawer({visible, onClose}) {
    const dispatch = useDispatch();
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
    return (
        <Drawer title={
            <div className='header'>
                <FiShoppingCart className='icon' /> {items.length} article{`${items.length > 1 ? 's': ''}`}
            </div>
        } placement="right" visible={visible} onClose={onClose} closable={false} zIndex={99999} className='cart-drawer'>

            <div className="cart">
                { items.map(item => <div key={item.id} className='item'>
                    <div className="qty-manag">
                        <button className="plus" onClick={() =>onIncrement(item.id)}> <HiOutlinePlusSm className='icon' /> </button>
                        <div className="qty"> { item.quantity } </div>
                        <button onClick={() =>onDecrement(item.id)} className="minus" disabled={item.quantity < 2}> <HiOutlineMinusSm className='icon' /> </button>
                    </div>
                    <div className="prod">
                        <div className="info">
                            <img src={item.cover} alt="" className='cover' />
                            <div className="sub">
                                <div className="name"> {item.name} </div>
                                <div className="sub-price"> {item.currency === "USD" ? '$': "FC"}{ item.price } <span className="sign">x</span> { item.quantity } </div>
                                <div className="price"> {item.currency === "USD" ? '$': "FC"}{ item.price*parseInt(item.quantity) }</div>
                            </div>
                        </div>
                        <div className="action" onClick={() =>onDelete(item.id)}> <MdClose className='icon' /> </div>
                    </div>
                </div>) }
            </div>
        </Drawer>
    )
}

export default CartDrawer
