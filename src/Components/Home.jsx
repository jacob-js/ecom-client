import { Carousel } from 'antd';
import React from 'react'
import { MdArrowRight, MdFlashOn } from 'react-icons/md';
import Slider from 'react-slick';
import c1 from '../assets/images/c1.jpg';
import c2 from '../assets/images/c2.jpg';
import c3 from '../assets/images/c3.jpg';

function Home() {
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
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Home
