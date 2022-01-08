import React, { useEffect } from 'react'
import { HiOutlineMinusSm, HiOutlinePlusSm } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import Cart from '../Utils/cart.utils';
import { FieldContainer, FormContainer, Input, TextArea } from '../Utils/common';
import { Tag } from 'atomize';
import { Button } from 'antd';

function Carts() {
    const dispatch = useDispatch();
    const { cartItems: items } = useSelector(({ cart }) => cart);
    const cdfItems = items.filter(item => item.currency === "FC");
    const usdItems = items.filter(item => item.currency === "USD");

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
        <div className='cart-component'>
            <div className="items">
                {
                    items.map((item, key) =>(
                        <div className="item" key={key}>
                            <div className="prod">
                                <img src={item.cover} alt="" />
                                <div className="info">
                                    <div className="name"> {item.name} </div>
                                    <div className="prices">
                                        <div className="sub">{item.currency === "USD" ? '$': "FC"}{ item.price-(item.discount || 0)} x {item.quantity}</div>
                                        <div className="price"> {item.currency === "USD" ? '$': "FC"}{ (item.price-(item.discount || 0))*parseInt(item.quantity) }</div>
                                    </div>
                                </div>
                            </div>
                            <div className="actions">
                                <div className="delete" onClick={() =>onDelete(item.id)}><MdClose className='icon' /></div>
                                <div className="qty-manag">
                                    <button onClick={() =>onDecrement(item.id)} className="minus" disabled={item.quantity < 2}>                     <HiOutlineMinusSm   className='icon' /> 
                                    </button>
                                    <div className="qty"> { item.quantity } </div>
                                    <button className="plus" onClick={() =>onIncrement(item.id)}> <HiOutlinePlusSm className='icon' /> </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="rigth">
                <div className="total">
                    <div className="title">Total :</div>
                    <div className="price">${usdItems.reduce((acc, item) => acc + (item.price-(item.discount || 0))*parseInt(item.quantity), 0)}, FC{cdfItems.reduce((acc, item) => acc + (item.price-(item.discount || 0))*parseInt(item.quantity), 0)}</div>
                </div>
                <FieldContainer>
                    <div className="label">Commentaire <Tag bg='warning200' textColor='warning700'>Note</Tag> </div>
                    <TextArea />
                </FieldContainer>
                <FieldContainer>
                    <Input type="text" placeholder="Code prompo" />
                </FieldContainer>
                <Button type="primary" className='btn apply-promo'>Appliquer le code promo</Button>
                <Button type="primary" className='btn checkout'>Passer à la caisse</Button>
            </div>
        </div>
    )
}

export default Carts
