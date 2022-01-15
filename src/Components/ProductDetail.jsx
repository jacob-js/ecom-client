import { Button, Rate, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductById } from '../apis/products';
import Cart from '../Utils/cart.utils';
import { sendNotif } from '../Utils/notif';

function ProductDetail() {
    const params = useParams();
    const { isLoading, data: res, error } = useQuery(['product', params.id], () => getProductById(params.id));
    const product = res?.data?.data || {};
    const images = product?.Colors?.length > 0 && product?.Colors?.map(color => ({url: color.image, id: color.id})) || [];
    images.unshift({ url: product?.cover });
    const [cover, setCover] = useState({ index: 0, image: product.cover, id: '' });
    const [selectedSize, setSelectedSize] = useState();
    const dispatch = useDispatch();
    useEffect(() => {
        (() =>{
            setCover({ index: 0, image: product.cover });
        })()
    }, [product])

    const checkValidOptions = () =>{
        if(product.sizes && product.sizes?.length > 0){
            if(!selectedSize){
                sendNotif('Veuillez choisir une taille', 'warn');
                return false;
            }
        }
        return true;
    }
    const getProductColor = () => {
        const color = product.Colors?.find(color => color.id === cover.id);
        return color?.name;
    }

    const addToCart = () => {
        if(checkValidOptions()){
            Cart.addToCart({ ...product, cartId: Math.random()*10, quantity: 1, details: [ selectedSize &&{ key: 'size', value: selectedSize }, { key: 'color', value: getProductColor() || 'couleur principale' } ] }, dispatch);
        }
    }

    if(error) return <div>Error</div>;

    return (
        <div className='product-detail'>
            <div className="top">
                <div className="image">
                    <div className="cover">
                        {
                            isLoading ?
                            <Skeleton.Input style={{ width: 500, height: 400 }} active loading={true} size='large' />:
                            <img src={cover.image} alt="product" srcset="" />
                        }
                    </div>
                    <div className="color-images">
                        {
                            isLoading ?
                            <Skeleton.Input style={{ width: 500, height: 40 }} active loading={true} size='large' />:
                            images?.map((image, index) => (
                                image && <img src={image.url} className={cover.index === index ? 'selected': ''} key={index} onClick={() =>setCover({ image: image.url, index, id: image.id })} />
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
                        isLoading ?
                        <Skeleton.Input style={{ width: 200, height: 40 }} active loading={true} size='large' />:
                        product.sizes && product.sizes.length > 0 &&
                        <div className="sizes">
                            <div className="title">Tailles : </div>
                            {product.sizes?.map(size => (
                                <div className={`size ${selectedSize === size ? 'selected': ''}`} key={size} onClick={() =>setSelectedSize(size)}>{size}</div>
                            ))}
                        </div>
                    }
                    {
                        !isLoading &&
                        <div className="stock">
                            <div className="title">Stock : </div>
                            { product.quantity ? `${product.quantity+product.quantityMetric}`: 'Indisponible' }
                        </div>
                    }
                    {
                        !isLoading &&
                        <>
                            <div className="rated"><Rate disabled defaultValue={
                                product.Ratings?.reduce((total, rate) => total + rate.value, 0) / product.Ratings?.length
                            } className='rate' /></div>
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
                            <Button className='btn' onClick={addToCart}>Ajouter au panier</Button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
