import { Avatar, Button, Rate, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react'
import { HiOutlineUser } from 'react-icons/hi';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductById, getProductRatings, rateProducApi } from '../../apis/products';
import Cart from '../../Utils/cart.utils';
import { sendNotif } from '../../Utils/notif';
import moment from 'moment';
import { FieldContainer, Label, TextArea } from '../../Utils/common';
import Reviews from './Reviews';

function ProductDetail() {
    const params = useParams();
    const queryClient = useQueryClient();
    const { isLoading, data: res, error } = useQuery(['product', params.id], () => getProductById(params.id));
    const { data: ratings } = useQuery(['ratings', params.id], () => getProductRatings(params.id));
    const product = res?.data?.data || {};
    const images = (product?.Colors?.length > 0 && product?.Colors?.map(color => ({url: color.image, id: color.id}))) || [];
    images.unshift({ url: product?.cover });
    const [cover, setCover] = useState({ index: 0, image: product.cover, id: '' });
    const [selectedSize, setSelectedSize] = useState();
    const dispatch = useDispatch();
    const [active, setActive] = useState(1);
    const [rate, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const { data: currUser } = useSelector(({ users: { currUser } }) =>currUser);
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

    const imgContainer = document.querySelector('.cover');
    const [img, setImg] = useState(document.querySelector('#image'));
    const [imgRect, setImgRect] = useState(img?.getBoundingClientRect());
    const lens = document.querySelector('.lens');
    const result = document.querySelector('.result');
    const resultContainer = document.querySelector('.res-container');

    useEffect(() =>{
        (() =>{
            setImg(document.querySelector('#image'));
            setImgRect(img?.getBoundingClientRect());
        })();
    }, [cover])

    if(imgContainer && img && lens && result){
        const imgContainerRect = imgContainer.getBoundingClientRect();
        const lensRect = lens.getBoundingClientRect();
        const resultRect = result.getBoundingClientRect();

        const getMousePos = (e) => {
            let minX = 0;
            let minY = 0;
            let maxX = imgContainerRect.width - (lensRect.width * 2);
            let maxY = imgContainerRect.height - (lensRect.height);
            let x = e.clientX - imgContainerRect.left - lensRect.width / 2;
            let y = e.clientY - imgContainerRect.top - lensRect.height / 2;

            if(x <= minX) x = minX;
            if(x >= maxX) x = maxX;
            if(y <= minY) y = minY;
            if(y >= maxY) y = maxY;
            return { x, y };
        }

        const zoomImage = (e) => {
            const { x, y } = getMousePos(e);
            lens.style.left = x + 'px';
            lens.style.top = y + 'px';

            let fx = imgRect.width / lensRect.width;
            let fy = imgRect.height / lensRect.height;

            resultContainer.style.width = imgRect.width + 'px';
            resultContainer.style.height = imgRect.height + 'px';
            resultContainer.style.left = (imgContainerRect.width - imgRect.width) / 2 + 'px';
            result.style.backgroundImage = `url(${img.src})`;
            result.style.backgroundSize = `${imgRect.width * fx}px ${imgRect.height * fy}px`;
            result.style.backgroundPosition = `-${x * fx}px -${y * fy}px`;
        }

        imgContainer.addEventListener('mousemove', zoomImage);
        imgContainer.addEventListener('mouseleave', (e) => {
            lens.style.left = '0%';
            result.style.backgroundImage = `none`;
        });
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
                            <>
                                <img src={cover.image} id='image' alt="product" srcset="" />
                                <div className="lens"></div>
                                <div className="res-container">
                                    <div className="result"></div>
                                </div>
                            </>
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
            <div className="other-infos">
                <div className="titles">
                    <div className={`title ${active === 1 ? 'active': ''}`} onClick={() =>setActive(1)}>Description</div>
                    <div className={`title ${active === 2 ? 'active': ''}`} onClick={() =>setActive(2)}>Avis</div>
                </div>
                <div className="content">
                    {
                        active === 1 ?
                        <>
                            <div className="title">Caracteristiques</div>
                            <div className="items">
                                {
                                    product?.specifications?.map((spec, index) => (
                                        <div className="item" key={index}>
                                            {spec.key} : {spec.value}
                                        </div>
                                    ))
                                }
                            </div>
                        </>:
                        <>
                            <Reviews ratings={ratings} />
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductDetail