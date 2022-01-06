import { Button, Rate, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getProductById } from '../apis/products';

function ProductDetail() {
    const params = useParams();
    const { isLoading, data: res, error } = useQuery(['product', params.id], () => getProductById(params.id));
    const product = res?.data?.data || {};
    const images = [ product.cover, product?.Colors?.length > 0 && product?.Colors?.map(color => color.image) ];
    const [cover, setCover] = useState(product.cover);
    useEffect(() => {
        (() =>{
            setCover(product.cover);
        })()
    }, [product])

    if(error) return <div>Error</div>;

    return (
        <div className='product-detail'>
            <div className="top">
                <div className="image">
                    <div className="cover">
                        {
                            isLoading ?
                            <Skeleton.Input style={{ width: 500, height: 400 }} active loading={true} size='large' />:
                            <img src={cover} alt="product" srcset="" />
                        }
                    </div>
                    <div className="color-images">
                        {
                            isLoading ?
                            <Skeleton.Input style={{ width: 500, height: 40 }} active loading={true} size='large' />:
                            images?.map((image, index) => (
                                image && <img src={image} className={cover === image ? 'selected': ''} key={index} onClick={() =>setCover(image)} />
                            ))
                        }
                    </div>
                </div>
                <div className="info">
                    {
                        isLoading ?
                        <Skeleton.Input style={{ width: 200, marginBottom: '1rem', height: 40 }} active loading={true} size='large' />:
                        <div className="name">{product.name}</div>
                    }
                    {
                        isLoading ?
                        <Skeleton style={{ width: 600, marginBottom: '1rem', height: 40 }} active loading={true} size='large' />:
                        <div className="descript">{product.description}</div>
                    }
                    {
                        !isLoading &&
                        <>
                            <div className="rated"><Rate disabled defaultValue={4} className='rate' /></div>
                            <div className="price">
                                {product.currency === "USD" ? '$': "FC"}{product.price-(product.discount || 0)}
                                { product.discount && <span className="discounted">{product.currency === "USD" ? '$': "FC"}{product.price}</span> }
                            </div>
                        </>
                    }
                    <div className="add-to-cart">
                        {
                            isLoading ?
                            <Skeleton.Input style={{ width: 150, height: 40, borderRadius: 20 }} active loading={true} size='large' />:
                            <Button className='btn'>Ajouter au panier</Button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
