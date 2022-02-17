import { Divider, Rate, Skeleton } from 'antd';
import React, { useState } from 'react'
import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useQuery, useQueryClient } from 'react-query';
import { useHistory, useParams } from 'react-router-dom'
import { getProducts } from '../apis/products';

function BestProducts() {
    const history = useHistory();
    const limit = 12;
    const [ offset, setOffset ] = useState(0);
    const { isLoading, data, refetch } = useQuery(['products', 'best'], () => getProducts(false, true), {
        enabled: false
    } )
    const [ products, setProducts ] = useState([]);
    const queryClient = useQueryClient()

    useEffect(() =>{
        (() =>{
            if(data?.rows){
                setProducts([...products, ...data?.rows])
            }
        })()
    }, [data]);

    useEffect(() =>{
        refetch()
    }, [offset])

    const loadMore = () =>{
        setOffset(value => value + limit);
        queryClient.invalidateQueries(['products', 'best'])
    };

    return (
        <div className='products-by-categ'>
            <div className="header">
                <div className="title"> Meilleurs produits </div>
            </div>
            <InfiniteScroll
                loader={
                    [0, 1, 2, 4].map((index) => (
                        <Skeleton.Input style={{ width: 290, margin: 10, height: 350 }} key={index} active loading={true} size='large' />
                    ))
                }
                endMessage={ <Divider>Vous avez tout vu</Divider> }
                dataLength={products.length}
                hasMore={products.length < data?.count}
                next={loadMore}
                className='products'
            >
                {
                    isLoading ?
                    [0, 1, 2, 4, 5, 6, 7, 8].map((index) => (
                        <Skeleton.Input style={{ width: 290, margin: 10, height: 350 }} key={index} active loading={true} size='large' />
                    ))
                    :
                    products.map(prod =>({ ...prod, sort: Math.random() })).map((product, index) => (
                        <div className="product elec" data-aos='fade-down' key={index}>
                            <div onClick={() =>history.push(`/products/${product.id}`)} className="cover"> <img src={product.cover} alt="" srcset="" /> </div>
                            <div className="info">
                                <div className="">
                                    <div className="name"> {product.name} </div>
                                    <Rate disabled defaultValue={product.Ratings?.reduce((total, rate) => total + rate.value, 0) / product.Ratings?.length} className='rate' />
                                    <div className="price">
                                        {product.currency === "USD" ? '$': "FC"}{product.price - (product.discount || 0)}
                                        { product.discount && <span className="discounted"> {product.currency === "USD" ? '$': "FC"}{product.price} </span> }
                                    </div>
                                </div>
                                <div className="stock"> <span>Stock : </span> { product.quantity ? `${product.quantity+product.quantityMetric}`: 'Indisponible' } </div>
                            </div>
                        </div>
                    ))
                }
            </InfiniteScroll>
        </div>
    )
}

export default BestProducts