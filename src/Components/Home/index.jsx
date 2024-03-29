import { Button, Carousel, Menu, Rate, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react'
import { MdArrowRight, MdCategory, MdDesktopMac, MdDevicesOther, MdFlashOn, MdOutlineAddShoppingCart, MdOutlineLaptopChromebook, MdOutlineLocalOffer, MdPhoneIphone } from 'react-icons/md';
import Slider from 'react-slick';
import c1 from '../../assets/images/c1.jpg';
import c2 from '../../assets/images/c2.jpg';
import c3 from '../../assets/images/c3.jpg';
import { HiOutlineArrowLeft, HiOutlineArrowRight } from 'react-icons/hi';
import { useQuery } from 'react-query';
import { getProducts, getProductsByCategoryApi, getTopCategorysApi } from '../../apis/products';
import newIcon from '../../assets/images/icons/new-product.svg';
import Aos from 'aos';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { QuestionCircleOutlined } from '@ant-design/icons';
import SuggestProduct from './Components/SuggestProduct';
import TopCategories from './Components/TopCategories';

const PrevArraow = (props) =>{
    const {style, onClick} = props;

    return(
        <div className='prev-arrow' style={style}>
            <div className="" onClick={onClick}><HiOutlineArrowLeft className='icon' /></div>
        </div>
    )
}

const NextArraow = (props) =>{
    const {style, onClick} = props;

    return(
        <div className='next-arrow' style={style}>
            <div className="" onClick={onClick}><HiOutlineArrowRight className='icon' /></div>
        </div>
    )
}

function Home() {
    const [electronicProducts, setelectronicProducts] = useState([]);
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const { isLoading, data } = useQuery(['categorys', 'top'], getTopCategorysApi, {
        staleTime: 300000,
    });
    const { isLoading: loadingLaptops, data: laptops } = useQuery(['products', 'laptops'], () =>getProductsByCategoryApi('laptop,laptops,Laptops,Laptop'), {
        staleTime: 300000
    });
    const { isLoading: loadingPhones, data: phones } = useQuery([ 'products', 'phones'], () => getProductsByCategoryApi(['mobile phone,phone,phones,Telephones mobiles,telephones mobiles'], 6, 0), {
        staleTime: 300000,
    });
    const { isLoading: loadingDesktops, data: desktops } = useQuery([ 'products', 'desktops'], () => getProductsByCategoryApi('desktop,desktops', 6, 0), { staleTime: 300000 });
    const { isLoading: loadingAccessorys, data: accessorys } = useQuery([ 'products', 'accessorys'], () => getProductsByCategoryApi('accessoire electronique', 6, 0), { staleTime: 300000 });
    const { isLoading: loadingBigDiscount, data: bigDiscountProducts } = useQuery([ 'products', 'discountProducts'], () => getProducts(true), { staleTime: 300000 });
    const { isLoading: loadingBestProducts, data: bestProds } = useQuery([ 'products', 'bestProds'], () => getProducts(false, true), { staleTime: 300000 });
    const { isLoading: loadingOtherProducts, data: otherProds } = useQuery([ 'products', 'others'], () => getProducts(null, null, null, 12, 0));
    const { isLoading: loadingNewProducts, data: newProds } = useQuery([ 'products', 'newProds'], () => getProducts(false, false, true, 5, 0), { staleTime: 300000 });
    const { isLoading: loadingElecProds, data: elecProds } = useQuery([ 'products', 'elecProds'], () => getProductsByCategoryApi([ 'electroniques,electronique,Electroniques,Electronique' ], 6, 0));

    useEffect(() =>{
        Aos.init({ duration: 1000 });
    }, []);
    useEffect(() =>{
        (() =>{
            if(elecProds?.rows){
                setelectronicProducts(elecProds?.rows);
            }
        })()
    }, [elecProds]);
    
    const settings = {
        dots: false,
        infinite: false,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <NextArraow />,
        prevArrow: <PrevArraow />
    };

    window.addEventListener('scroll', () =>{
        if(window.scrollY > 2000){
            document.querySelector('.miss-product').classList.add('show');
        }else{
            document.querySelector('.miss-product').classList.remove('show');
        }
    });

    const isLoadingElec = loadingLaptops || loadingPhones || loadingDesktops || loadingAccessorys || loadingElecProds;
  
    return (
        <div className='home'>
            <div className="div-carousel">
                <Carousel autoplay className='carousel' dots={{ className: 'dots' }}>
                    <div className="slide"> <img src={c1} alt="" srcset="" /> </div>
                    <div className="slide"> <img src={c2} alt="" srcset="" /> </div>
                    <div className="slide"> <img src={c3} alt="" srcset="" /> </div>
                </Carousel>
            </div>

            <div className="products">
                <div className="content">
                    <section className="section-flash">
                        <div className="header">
                            <div className="title"> <MdFlashOn className='icon' />Meilleurs produits</div>
                            <div className="view-all" onClick={() =>history.push('/products/type/best')}> Voir tout <MdArrowRight className='icon' /> </div>
                        </div>
                        <div className="data">
                            {
                                loadingBestProducts?
                                [1, 2, 3, 4].map((prod, index) => (
                                    <Skeleton.Input style={{ width: 275, margin: 20, height: 300,  borderRadius: 10 }} key={index} active loading={true} size='large' />
                                )):
                                <>
                                    <Slider {...settings} className='carousels'>
                                        {
                                            bestProds?.rows?.map((product, index) => (
                                                <div data-aos='fade-left' className="product" key={index}>
                                                    <div className="cover" onClick={() =>history.push(`/products/${product.id}`)}> <img src={product.cover} alt="" srcset="" /> </div>
                                                    <div className="info">
                                                        <div className="">
                                                            <div className="name"> {product.name} </div>
                                                            <Rate disabled defaultValue={product.Ratings?.reduce((total, rate) => total + rate.value, 0) / product.Ratings?.length} className='rate' />
                                                            <div className="price"> {product.currency === "USD" ? '$': "FC"}{product.price-(product.discount || 0)}
                                                                <span className="discounted"> {product.currency === "USD" ? '$': "FC"}{product.price} </span>
                                                            </div>
                                                        </div>
                                                        <div className="stock"> <span>Stock : </span> { product.quantity ? `${product.quantity+product.quantityMetric}`: 'Indisponible' } </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </Slider>
                                    <Slider {...settings} slidesToShow={1} className='carousel-mob'>
                                        {
                                            bestProds?.rows?.map((product, index) => (
                                                <div data-aos='fade-left' className="product" key={index}>
                                                    <div className="cover" onClick={() =>history.push(`/products/${product.id}`)}> <img src={product.cover} alt="" srcset="" /> </div>
                                                    <div className="info">
                                                        <div className="">
                                                            <div className="name"> {product.name} </div>
                                                            <Rate disabled defaultValue={product.Ratings?.reduce((total, rate) => total + rate.value, 0) / product.Ratings?.length} className='rate' />
                                                            <div className="price"> {product.currency === "USD" ? '$': "FC"}{product.price-(product.discount || 0)}
                                                                <span className="discounted"> {product.currency === "USD" ? '$': "FC"}{product.price} </span>
                                                            </div>
                                                        </div>
                                                        <div className="stock"> <span>Stock : </span> { product.quantity ? `${product.quantity+product.quantityMetric}`: 'Indisponible' } </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </Slider>
                                </>
                            }
                        </div>
                    </section>

                    <TopCategories data={data} carouselSettings={settings} />

                    <section className="section-arrival">
                        <div className="header">
                            <div className="title"> <img src={newIcon} alt="" srcset="" className='icon' /> Nouveauté</div>
                            <div className="view-all" onClick={() =>history.push(`/products-key?key=isNew`)}> Voir tout <MdArrowRight className='icon' /> </div>
                        </div>
                        <div className="data-new">
                            {
                                loadingNewProducts?
                                [1, 2, 3, 4, 5].map((prod, index) => (
                                    <Skeleton.Input style={{ width: 200, margin: 20, height: 200,  borderRadius: 10 }} key={index} active loading={true} size='large' />
                                )):
                                newProds?.rows?.map((prod, index) =>({ ...prod, sort: Math.random() }))
                                .sort((a, b) => a.sort-b.sort).map((prod, index) => (
                                    <div data-aos='fade-up' className="new-product" key={index}>
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
                    </section>

                    <section className="section-big-discount">
                        <div className="header">
                            <div className="title"> <MdOutlineLocalOffer className='icon' /> Réduction</div>
                            <div className="view-all" onClick={() =>history.push(`/products-key??key=bigDiscount`)}> Voir tout <MdArrowRight className='icon' /> </div>
                        </div>
                        <div className="data">
                            {
                                loadingBigDiscount ?
                                [1, 2, 3, 4, 5].map((prod, index) => (
                                    <Skeleton.Input style={{ width: 200, margin: 20, height: 200,  borderRadius: 10 }} key={index} active loading={true} size='large' />
                                )):
                                <>
                                    <Slider {...settings} slidesToShow={5} className='carousels'>
                                        {
                                            bigDiscountProducts?.rows?.map((prod, index) =>({ ...prod, sort: Math.random() }))
                                            .sort((a, b) => a.sort-b.sort).map((prod, index) => (
                                                <div data-aos='fade-right' className="product" key={index}>
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
                                    </Slider>
                                    <Slider {...settings} slidesToShow={1} className='carousel-mob'>
                                        {
                                            bigDiscountProducts?.rows?.map((prod, index) =>({ ...prod, sort: Math.random() }))
                                            .sort((a, b) => a.sort-b.sort).map((prod, index) => (
                                                <div data-aos='fade-right' className="product-discounted" key={index}>
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
                                    </Slider>
                                </>
                            }
                        </div>
                    </section>

                    <section className="electronic">
                        {
                            isLoadingElec ?
                            <Skeleton.Input style={{ width: 200, marginRight: 40, height: 400 }} className='menus-load' active loading={true} size='large' />:
                            <div className="menus">
                                <Menu className=''defaultSelectedKeys={'all'}>
                                    <Menu.Item onClick={() =>setelectronicProducts(laptops.rows)} key="laptop" icon={ <MdOutlineLaptopChromebook /> }>Ordinateurs portables</Menu.Item>
                                    <Menu.Item onClick={() =>setelectronicProducts(desktops.rows)} key="desktop" icon={ <MdDesktopMac /> }>Ordinateurs de bureau</Menu.Item>
                                    <Menu.Item onClick={() =>setelectronicProducts(phones.rows)} icon={<MdPhoneIphone />} key="phone">Telephones portables</Menu.Item>
                                    <Menu.Item onClick={() =>setelectronicProducts(accessorys.rows)} icon={ <MdDevicesOther /> } key="accessory">Accessoires</Menu.Item>
                                    <Menu.Item onClick={() =>{
                                        setelectronicProducts([...laptops.rows, ...phones.rows, ...desktops.rows, ...accessorys.rows ])
                                    }} key="all">Tous</Menu.Item>
                                </Menu>
                            </div>
                        }

                        <section className="section-flash">
                            <div className="header">
                                <div className="title">Elecroniques</div>
                                <div className="view-all" onClick={() =>history.push('/products/category/electroniques')}> Voir tout <MdArrowRight className='icon' /> </div>
                            </div>
                            <div className="data">
                                {
                                    isLoadingElec ?
                                    [0, 1, 2].map((index) => (
                                        <Skeleton.Input style={{ width: 300, margin: 10, height: 350 }} key={index} active loading={true} size='large' />
                                    ))
                                    :
                                    electronicProducts.map(prod =>({ ...prod, sort: Math.random() }))
                                    .sort((a, b) => a.sort-b.sort).map((product, index) => (
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
                            </div>
                        </section>
                    </section>
                    <section className="others">
                        <div className="header">
                            <div className="title">Autres suggestions</div>
                            <div className="view-all" onClick={() =>history.push('/products/type/all')}> Voir tout <MdArrowRight className='icon' /> </div>
                        </div>
                        <div className="data">
                            {
                                loadingOtherProducts ?
                                [0, 1, 2].map((index) => (
                                    <Skeleton.Input style={{ width: 300, margin: 10, height: 350 }} key={index} active loading={true} size='large' />
                                ))
                                :
                                otherProds?.rows?.map(prod =>({ ...prod, sort: Math.random() }))
                                .sort((a, b) => a.sort-b.sort).map((product, index) => (
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
                        </div>
                    </section>
                    <Button type='primary' className='btn miss-product' onClick={setIsOpen}> <QuestionCircleOutlined className='icon' /> <span className='text'>Avez-vous manqué un produit</span> </Button>
                    <SuggestProduct isOpen={isOpen} onClose={() =>setIsOpen(false)} />
                </div>
            </div>
        </div>
    )
}

export default Home
