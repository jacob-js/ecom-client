import { Divider, Empty, Rate, Skeleton } from 'antd';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useQuery, useQueryClient } from 'react-query'
import { useHistory, useLocation } from 'react-router-dom';
import { searchProductsApi } from '../apis/products';
import { useQuery as useUrlQuery } from '../Utils/helpers';

function Search() {
    const location = useLocation();
    const history = useHistory();
    const query = useUrlQuery(location).get('query');
    const category = useUrlQuery(location).get('category');
    const limit = 12;
    const [offset, setOffset] = useState(0);
    const { data, isLoading, refetch } = useQuery(['products', query], () => searchProductsApi(query, limit, offset, category), {
        enabled: false
    });
    const [ products, setProducts ] = useState([]);
    const queryClient = useQueryClient()

    useEffect(() =>{
        (() =>{
            if(data?.rows){
                setProducts(thisData => [...thisData, ...data?.rows])
            }
        })()
    }, [data]);

    useEffect(() =>{
        (() =>{
            setProducts(data?.rows || []);
            setOffset(0);
        })()
    }, [query])

    useEffect(() =>{
        refetch()
    }, [offset, query])

    const loadMore = () =>{
        setOffset(value => value + limit);
        queryClient.invalidateQueries(['products', query])
        console.log('offset', offset);
    };

    return (
        <div className='search-component'>
            <div className="header">
                <div className="title"> {
                    <>Resultats pour "{query}"</>
                } </div>
            </div>
            <InfiniteScroll
                loader={
                    [0, 1, 2, 4].map((index) => (
                        <Skeleton.Input style={{ width: 290, margin: 10, height: 350 }} key={index} active loading={true} size='large' />
                    ))
                }
                endMessage={ <Divider>Vous avez tout vu</Divider> }
                dataLength={products?.length}
                hasMore={products?.length < data?.count}
                next={loadMore}
                className='products'
            >
                {
                    isLoading ?
                    [0, 1, 2, 4, 5, 6, 7, 8].map((index) => (
                        <Skeleton.Input style={{ width: 290, margin: 10, height: 350 }} key={index} active loading={true} size='large' />
                    ))
                    :
                    data?.count < 1 ?
                    <div className="empty">
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={ <span>Aucun resultat</span> } />
                    </div>:
                    products?.map(prod =>({ ...prod, sort: Math.random() })).map((product, index) => (
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

export default Search