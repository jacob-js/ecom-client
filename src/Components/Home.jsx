import { Carousel, Rate } from 'antd';
import React from 'react'
import { MdArrowRight, MdCategory, MdFlashOn, MdOutlineAddShoppingCart } from 'react-icons/md';
import Slider from 'react-slick';
import c1 from '../assets/images/c1.jpg';
import c2 from '../assets/images/c2.jpg';
import c3 from '../assets/images/c3.jpg';
import { HiOutlineArrowLeft, HiOutlineArrowRight } from 'react-icons/hi';

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

const bestCategorys = [
    {
        name: 'Electronique',
        cover: 'https://bonik-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanners%2Fcategory-2.png&w=1920&q=75'
    },
    {
        name: 'Mode',
        cover: 'https://thewsh.globalblue.com/wp-content/uploads/2019/12/Fashion-Focus-IVisuels-RS_Blog-1-1110x450.png'
    },
    {
        name: 'Maison et Jardin',
        cover: 'https://tinuiti.com/wp-content/uploads/legacysitecontent/cpcs/posts_01/2019/04/16105532/kitchen.jpg'
    },
    {
        name: 'Maison et Jardin',
        cover: 'https://tinuiti.com/wp-content/uploads/legacysitecontent/cpcs/posts_01/2019/04/16105532/kitchen.jpg'
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
    
    const settings = {
        dots: false,
        infinite: true,
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
                                        <div className="product" key={index}>
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
                                    bestCategorys.map((category, index) => (
                                        <div className="category" key={index}>
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
                </div>
            </div>
        </div>
    )
}

export default Home
