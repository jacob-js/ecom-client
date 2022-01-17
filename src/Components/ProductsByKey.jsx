import React, { useState } from 'react'
import { MdOutlineLocalOffer } from 'react-icons/md';
import { useHistory, useLocation } from 'react-router-dom';
import { getProducts } from '../apis/products';
import { useQuery as useQueryUrl } from '../Utils/helpers';
import newIcon from '../assets/images/icons/new-product.svg';
import { Skeleton } from 'antd';
import { useQuery } from 'react-query';

function ProductsByKey() {
    const location = useLocation();
    const query = useQueryUrl(location);
    const history = useHistory();
    const key = query.get('key');
    const limit = 10;
    const [offset, setoffset] = useState(0);
    const { isLoading, data } = useQuery(['products', key],  () => key === 'isNew' ? getProducts(false, false, true, limit, offset): getProducts(true, false, false, limit, offset), { staleTime: 300000 });
    return (
        <div className='products-by-key'>
            <div className="header">
                <div className="title"> {
                    key === 'isNew' ?
                    <><img src={newIcon} alt="" srcset="" className='icon' /> Nouveautés</>:
                    <><MdOutlineLocalOffer className='icon' />Grosses réductions</>
                } </div>
            </div>
            <div className="products">
                {
                    isLoading ?
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((prod, index) => (
                        <Skeleton.Input style={{ width: 220, margin: 15, height: 200,  borderRadius: 10 }} key={index} active loading={true} size='large' />
                    )):
                    data?.rows?.map((prod, index) =>({ ...prod, sort: Math.random() }))
                    .sort((a, b) => a.sort-b.sort).map((prod, index) => (
                        <div data-aos='fade-up' className="product" key={index}>
                            <div className="cover" onClick={() =>history.push(`/products/${prod.id}`)}>
                                <img src={prod.cover} alt="" srcset="" />
                                <div className="bg"></div>
                            </div>
                            <div className="name">{ prod.name }</div>
                            <div className="price"> {prod.currency === "USD" ? '$': "FC"}{prod.price-(prod.discount || 0)}
                                <span className="discounted"> {prod.currency === "USD" ? '$': "FC"}{prod.price} </span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ProductsByKey
