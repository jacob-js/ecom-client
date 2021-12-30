import React from 'react'
import logo from '../assets/images/min_logo.png'
import { HiOutlineShoppingBag, HiOutlineUser } from 'react-icons/hi';
import { MdOutlineCategory, MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { Icon, Input } from 'atomize';
import { Dropdown } from 'antd';

function Nav({children}) {
    return (
        <div className='page'>
            <div className="nav">
                <div className="top">
                    <div className="logo">
                        <img src={logo} alt="logo" srcset="" />
                    </div>
                    <div className="search">
                        <Input
                            placeholder="Rechercer"
                            p={{ x: "2.5rem" }}
                            rounded="circle"
                            w="40rem"
                            h="3rem"
                            borderColor="gray500"
                            hoverBorderColor="#dd4900"
                            focusBorderColor="#dd4900"
                            prefix={
                                <Icon
                                name="Search"
                                color="gray500"
                                size="20px"
                                pos="absolute"
                                top="28%"
                                left="0.75rem"
                                />
                            }
                            suffix={
                                <div className="search-drop"> Toutes les categories <MdOutlineKeyboardArrowDown className='icon' /> </div>
                            }
                        />
                    </div>
                    <div className="sessions">
                        <div className="user">
                            <HiOutlineUser className='icon' />
                        </div>
                        <div className="cart">
                            <HiOutlineShoppingBag className='icon' />
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <div className="categ">
                        <Dropdown trigger={['click']}>
                            <div className="btn-categ"> <MdOutlineCategory /> Catégories </div>
                        </Dropdown>
                    </div>
                    <div className="links">
                        <div className="link">Accueil</div>
                        <div className="link">Compte vendeur</div>
                        <div className="link">Besoin d'aide</div>
                    </div>
                </div>
            </div>
            {children}
        </div>
    )
}

export default Nav
