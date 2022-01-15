import React from 'react'
import { BsFillHandbagFill } from 'react-icons/bs'
import { useQuery } from 'react-query';
import { useParams, useHistory } from 'react-router-dom'
import { getOrderApi } from '../apis/orders';
import moment from 'moment';
import { Tag } from 'atomize';

function OrderDetails() {
    const params = useParams();
    const history = useHistory();
    const { data, isLoading } = useQuery(['order', params.id], () => getOrderApi(params.id));
    const cdfItems = data?.data?.Items?.filter(item => item.currency === "FC") || [];
    const usdItems = data?.data?.Items?.filter(item => item.currency === "USD") || [];
    
    return (
        <div className='order-details'>
            <div className="title"><BsFillHandbagFill className='icon' /> Details de la commande</div>
            <div className="card">
                <div className="header">
                    <div className="order-ref"> Order ID: <span>{data?.data.ref}</span> </div>
                    <div className="order-date"> Commandé le: <span>{moment(data?.data?.createdAt).format('ll')}</span> </div>
                </div>
                <div className="items">
                    {
                        data?.data?.Items.map((item, index) => (
                            <div className="item" key={index}>
                                <div className="prod">
                                    <div className="pic">
                                        <img src={item?.Product.cover} alt={item.name} />
                                    </div>
                                    <div className="info">
                                        <div className="name">{item?.Product.name}</div>
                                        <div className="price"> {item.unitAmount}{ item.currency === 'USD' || item.currency === 'usd' ? '$': 'FC' }x{item.quantity} </div>
                                    </div>
                                </div>
                                <div className="propertys">
                                    {item?.specifications.map((prop, index) => (
                                        <Tag m={{ x: "10px" }} key={index}>{prop.key}: {prop.value}</Tag>
                                    ))}
                                </div>
                                <div className="action" onClick={() =>history.push(`/products/${item?.Product.id}`)}>Noter ce produit</div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="extra">
                <div className="shipping-address">
                    <div className="title">Adresse de livraison</div>
                    {data?.data.country}, {data?.data.city}, {data?.data.address}
                    <div className="phone">N° de téléphone : <span>{data?.data.phone}</span></div>
                </div>
                <div className="totals">
                    <div className="title">Resumé du total</div>
                    <div className="sub-total">
                        <div className="intro">Sous-total :</div>
                        <div className="price">${usdItems.reduce((acc, item) => acc + (item.unitAmount)*parseInt(item.quantity), 0)}, FC{cdfItems.reduce((acc, item) => acc + (item.unitAmount)*parseInt(item.quantity), 0)}</div>
                    </div>
                    <div className="shipping">
                        <div className="intro">Frais de livraison :</div>
                        <div className="price">-</div>
                    </div>
                    <div className="shipping">
                        <div className="intro">Tax :</div>
                        <div className="price">-</div>
                    </div>
                    <div className="total">
                        <div className="intro">Total :</div>
                        <div className="price">${usdItems?.reduce((acc, item) => acc + (item.unitAmount-(item.discount || 0))*parseInt(item.quantity), 0)}, FC{cdfItems?.reduce((acc, item) => acc + (item.unitAmount-(item.discount || 0))*parseInt(item.quantity), 0)}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails
