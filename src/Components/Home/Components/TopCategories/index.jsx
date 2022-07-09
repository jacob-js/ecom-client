import React from 'react'
import Slider from 'react-slick'
import { MdCategory } from 'react-icons/md'
import { useHistory } from 'react-router-dom';

const TopCategories = ({data, carouselSettings}) => {
    const history = useHistory();

  return (
    <section className="section-top-categ">
        <div className="header">
            <div className="title"> <MdCategory className='icon' />Top catégories</div>
        </div>
        <div className="data">
            <Slider {...carouselSettings} slidesToShow={3} className='carousels'>
                {
                    data?.map((categ, index) =>({ name: categ.name, cover: categ.cover, sort: Math.random() }))
                    .sort((a, b) => a.sort-b.sort).map((category, index) => (
                        <div data-aos='fade-right' className="category" key={index} onClick={() =>history.push(`/products/category/${category.name}`)}>
                            <div className="name">{ category.name }</div>
                            <div className="cover">
                                <img src={category.cover} alt="" srcset="" />
                                <div className="bg"></div>
                            </div>
                        </div>
                    ))
                }
            </Slider>
            <Slider {...carouselSettings} slidesToShow={1} className='carousel-mob'>
                {
                    data?.map((categ, index) =>({ name: categ.name, cover: categ.cover, sort: Math.random() }))
                    .sort((a, b) => a.sort-b.sort).map((category, index) => (
                        <div data-aos='fade-right' className="category" key={index} onClick={() =>history.push(`/products/category/${category.name}`)}>
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
  )
}

export default TopCategories