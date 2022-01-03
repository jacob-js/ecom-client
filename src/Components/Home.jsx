import { Carousel, Menu, Rate } from 'antd';
import React, { useEffect } from 'react'
import { MdArrowRight, MdCategory, MdFlashOn, MdOutlineAddShoppingCart, MdOutlineLocalOffer } from 'react-icons/md';
import Slider from 'react-slick';
import c1 from '../assets/images/c1.jpg';
import c2 from '../assets/images/c2.jpg';
import c3 from '../assets/images/c3.jpg';
import { HiOutlineArrowLeft, HiOutlineArrowRight } from 'react-icons/hi';
import { useQuery } from 'react-query';
import { getTopCategorysApi } from '../apis/products';
import newIcon from '../assets/images/icons/new-product.svg';
import Aos from 'aos';

const bestProducts = [
    {
        id: 1,
        name: 'Chaussure Nike ',
        price: '$15',
        discount: '10%',
        cover: 'https://bonik-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fflash-1.png&w=1920&q=75'
    },
    {
        id: 2,
        name: 'Smart watch',
        price: '$110',
        discount: '5%',
        cover: 'https://bonik-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fflash-2.png&w=1920&q=75'
    },
    {
        id: 3,
        name: 'Smartphone Tecno',
        price: '$90',
        discount: '0%',
        cover: 'https://bonik-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fflash-3.png&w=1920&q=75'
    },
    {
        id: 4,
        name: 'Smart watch',
        price: '$110',
        discount: '5%',
        cover: 'https://bonik-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fflash-4.png&w=1920&q=75'
    },
    {
        id: 4,
        name: 'Smart watch',
        price: '$110',
        discount: '5%',
        cover: 'https://bonik-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fflash-4.png&w=1920&q=75'
    }
];

const newProducts = [
    {
        name: 'sunglass',
        cover: 'https://bonik-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fimagegoggles.png&w=1920&q=75',
        price: '$25',
    },
    {
        name: 'Makeup',
        cover: 'https://bonik-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Flipstick%20(2).png&w=1920&q=75',
        price: '$35',
    },
    {
        name: 'smartwatch',
        cover: 'https://bonik-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fbgwatch.png&w=1920&q=75',
        price: '$120',
    },
    {
        name: 'Lipstick',
        cover: 'https://bonik-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Flipstick%20(1).png&w=1920&q=75',
        price: '$5',
    },
    {
        name: 'Green plant',
        cover: 'https://bonik-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Flipstick%20(4).png&w=1920&q=75',
        price: '$20',
    },
    {
        name: 'Bonsai tree',
        cover: 'https://bonik-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Flipstick%20(3).png&w=1920&q=75',
        price: '$30',
    }
]

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
    const { isLoading, data } = useQuery('categorys', getTopCategorysApi, {
        staleTime: 300000,
    });

    useEffect(() =>{
        Aos.init({ duration: 1000 });
    }, [])
    
    const settings = {
        dots: false,
        infinite: false,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <NextArraow />,
        prevArrow: <PrevArraow />
    };
  
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
                            <div className="view-all"> Voir tout <MdArrowRight className='icon' /> </div>
                        </div>
                        <div className="data">
                            <Slider {...settings} className='carousel'>
                                {
                                    bestProducts.map((product, index) => (
                                        <div data-aos='fade-left' className="product" key={index}>
                                            <div className="cover"> <img src={product.cover} alt="" srcset="" /> </div>
                                            <div className="info">
                                                <div className="">
                                                    <div className="name"> {product.name} </div>
                                                    <Rate disabled defaultValue={4} className='rate' />
                                                    <div className="price"> {product.price} </div>
                                                </div>
                                                <div className="add-to-cart"> <MdOutlineAddShoppingCart className='icon' /> </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </Slider>
                        </div>
                    </section>

                    <section className="section-top-categ">
                        <div className="header">
                            <div className="title"> <MdCategory className='icon' />Top catégories</div>
                            <div className="view-all"> Voir tout <MdArrowRight className='icon' /> </div>
                        </div>
                        <div className="data">
                            <Slider {...settings} slidesToShow={3} className='carousel'>
                                {
                                    data?.map((categ, index) =>({ name: categ.name, cover: categ.cover, sort: Math.random() }))
                                    .sort((a, b) => a.sort-b.sort).map((category, index) => (
                                        <div data-aos='fade-right' className="category" key={index}>
                                            <div className="name">{ category.name }</div>
                                            <div className="cover">
                                                <img src={category.cover} alt="" srcset="" />
                                                <div className="bg"></div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </Slider>
                        </div>
                    </section>

                    <section className="section-arrival">
                        <div className="header">
                            <div className="title"> <img src={newIcon} alt="" srcset="" className='icon' /> Nouveauté</div>
                            <div className="view-all"> Voir tout <MdArrowRight className='icon' /> </div>
                        </div>
                        <div className="data">
                            {
                                newProducts?.map((prod, index) =>({ name: prod.name, cover: prod.cover, price: prod.price, sort: Math.random() }))
                                .sort((a, b) => a.sort-b.sort).map((prod, index) => (
                                    <div data-aos='fade-up' className="product" key={index}>
                                        <div className="cover">
                                            <img src={prod.cover} alt="" srcset="" />
                                            <div className="bg"></div>
                                        </div>
                                        <div className="name">{ prod.name }</div>
                                        <div className="price"> {prod.price} </div>
                                    </div>
                                ))
                            }
                        </div>
                    </section>

                    <section className="section-big-discount">
                        <div className="header">
                            <div className="title"> <MdOutlineLocalOffer className='icon' /> Réduction</div>
                            <div className="view-all"> Voir tout <MdArrowRight className='icon' /> </div>
                        </div>
                        <div className="data">
                            <Slider {...settings} slidesToShow={5} className='carousel'>
                                {
                                    newProducts?.map((prod, index) =>({ name: prod.name, cover: prod.cover, price: prod.price, sort: Math.random() }))
                                    .sort((a, b) => a.sort-b.sort).map((prod, index) => (
                                        <div data-aos='fade-right' className="product" key={index}>
                                            <div className="cover">
                                                <img src={prod.cover} alt="" srcset="" />
                                                <div className="bg"></div>
                                            </div>
                                            <div className="name">{ prod.name }</div>
                                            <div className="price"> {prod.price} <span className="discounted"> {prod.price} </span> </div>
                                        </div>
                                    ))
                                }
                            </Slider>
                        </div>
                    </section>

                    <section className="electronic">
                        <div className="menus">
                            <Menu className=''defaultSelectedKeys={'all'}>
                                <Menu.Item key="laptop">Ordinateurs portables</Menu.Item>
                                <Menu.Item key="desktop">Ordinateurs de bureau</Menu.Item>
                                <Menu.Item key="phone">Telephones portables</Menu.Item>
                                <Menu.Item key="all">Tous</Menu.Item>
                            </Menu>
                        </div>

                        <section className="section-flash">
                            <div className="header">
                                <div className="title">Elecroniques</div>
                                <div className="view-all"> Voir tout <MdArrowRight className='icon' /> </div>
                            </div>
                            <div className="data">
                                {
                                    [...bestProducts, bestProducts[1]].map((product, index) => (
                                        <div className="product elec" data-aos='fade-down' key={index}>
                                            <div className="cover"> <img src={product.cover} alt="" srcset="" /> </div>
                                            <div className="info">
                                                <div className="">
                                                    <div className="name"> {product.name} </div>
                                                    <Rate disabled defaultValue={2.5} className='rate' />
                                                    <div className="price"> {product.price} </div>
                                                </div>
                                                <div className="add-to-cart"> <MdOutlineAddShoppingCart className='icon' /> </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </section>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Home
