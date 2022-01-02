import React, { useState } from 'react'
import logo from '../assets/images/min_logo.png'
import { HiOutlineLogin, HiOutlineLogout, HiOutlineShoppingBag, HiOutlineUser } from 'react-icons/hi';
import { MdCategory, MdOutlineBikeScooter, MdOutlineDevices, MdOutlineKeyboardArrowDown, MdOutlinePets } from 'react-icons/md';
import { Icon, Input, Dropdown as AtDropDown } from 'atomize';
import { Dropdown, Menu, Popover } from 'antd';
import { GiHealing, GiHomeGarage, GiMusicSpell, GiTravelDress } from 'react-icons/gi';
import { FaBaby } from 'react-icons/fa';
import { BiCategoryAlt } from 'react-icons/bi';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { useHistory } from 'react-router-dom';

const menu = (
    <Menu className='categ-menus'>
      <Menu.Item key="1" icon={ <GiTravelDress /> }>Mode</Menu.Item>
      <Menu.Item key="2" icon={<MdOutlineDevices />}>Electonique</Menu.Item>
      <Menu.Item key="3" icon={<MdOutlineBikeScooter />}>Velos</Menu.Item>
      <Menu.Item key="3" icon={<GiHomeGarage />}>Maison et jardin</Menu.Item>
      <Menu.Item key="3" icon={<GiMusicSpell />}>Musique</Menu.Item>
      <Menu.Item key="3" icon={<GiHealing />}>Santé et beauté</Menu.Item>
      <Menu.Item key="3" icon={<FaBaby />}>Jouets pour bébé</Menu.Item>
      <Menu.Item key="3" icon={<MdOutlinePets />}>Animaux domestiques</Menu.Item>
    </Menu>
  );

const stickyMenu = (
<Menu className='sticky-categ-menus'>
    <Menu.Item key="1" icon={ <GiTravelDress /> }>Mode</Menu.Item>
    <Menu.Item key="2" icon={<MdOutlineDevices />}>Electonique</Menu.Item>
    <Menu.Item key="3" icon={<MdOutlineBikeScooter />}>Velos</Menu.Item>
    <Menu.Item key="4" icon={<GiHomeGarage />}>Maison et jardin</Menu.Item>
    <Menu.Item key="5" icon={<GiMusicSpell />}>Musique</Menu.Item>
    <Menu.Item key="6" icon={<GiHealing />}>Santé et beauté</Menu.Item>
    <Menu.Item key="7" icon={<FaBaby />}>Jouets pour bébé</Menu.Item>
    <Menu.Item key="8" icon={<MdOutlinePets />}>Animaux domestiques</Menu.Item>
</Menu>
);

function Nav({children}) {
    const [visible, setVisible] = useState(false);
    const history = useHistory();
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            document.querySelector('.nav').classList.add('sticky')
        } else {
            document.querySelector('.nav').classList.remove('sticky')
        }
    });
    
    return (
        <div className='page'>
            <div className="nav">
                <div className="top">
                    <div className="logo">
                        <img src={logo} alt="logo" srcset="" />
                        <div className="sticky-categ">
                            <AtDropDown textColor="gray500" isOpen={visible} onClick={() =>setVisible(!visible)} menu={stickyMenu} className='dropdown' border="none">
                                <div className="btn-categ"> <MdCategory className='icon-categ' /> </div>
                            </AtDropDown>
                        </div>
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
                                top="29%"
                                left="1rem"
                                />
                            }
                            suffix={
                                <div className="search-drop"> Toutes les categories <MdOutlineKeyboardArrowDown className='icon' /> </div>
                            }
                        />
                    </div>
                    <div className="sessions">
                        <Popover trigger='click' content={
                            <Menu>
                                {
                                    false ?
                                    <>
                                        <div style={{ textAlign: 'center', padding: 15 }}>Merci Jacob</div>
                                        <Menu.Item key="1" icon={ <HiOutlineUser /> }>Mon profil</Menu.Item>
                                        <Menu.Item key="2" icon={<RiMoneyDollarCircleLine />}>Mes commandes</Menu.Item>
                                        <Menu.Item key="3" icon={<HiOutlineLogout />}>Deconnexion</Menu.Item>
                                    </>:
                                    <Menu.Item key="4" onClick={() =>history.push('/login')}  icon={<HiOutlineLogin />}>Connexion</Menu.Item>
                                }
                            </Menu>
                        } zIndex={9999} placement='bottom'>
                            <div className="user">
                                <HiOutlineUser className='icon' />
                            </div>
                        </Popover>
                        <div className="cart">
                            <HiOutlineShoppingBag className='icon' />
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <div className="categ">
                        <Dropdown visible trigger={['click']} overlay={menu}>
                            <div className="btn-categ"> <BiCategoryAlt className='icon-categ' /> Catégories <MdOutlineKeyboardArrowDown className='icon' /> </div>
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
