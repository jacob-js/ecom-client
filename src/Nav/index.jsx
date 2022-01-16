import React, { useEffect, useState } from 'react'
import logo from '../assets/images/min_logo.png'
import { HiOutlineLogin, HiOutlineLogout, HiOutlineShoppingBag, HiOutlineUser } from 'react-icons/hi';
import { MdCategory, MdOutlineBikeScooter, MdOutlineDevices, MdOutlineKeyboardArrowDown, MdOutlinePets } from 'react-icons/md';
import { Icon, Input, Dropdown as AtDropDown } from 'atomize';
import { Affix, Badge, Dropdown, Menu, Popover } from 'antd';
import { GiHealing, GiHomeGarage, GiMusicSpell, GiTravelDress } from 'react-icons/gi';
import { FaBaby } from 'react-icons/fa';
import { BiCategoryAlt } from 'react-icons/bi';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { usersActionTypes } from '../Redux/actionsTypes/users';
import { sendNotif } from '../Utils/notif';
import CartDrawer from './CartDrawer';

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
    const [cartVisible, setCartVisible] = useState(false);
    const [ container, setContainer ] = useState(null);
    const location = useLocation();
    const history = useHistory();
    const [popupVisible, setPopupVisible] = useState(location.pathname === '/' ? true: false)
    const [ userPopVisible, setUserPopVisible ] = useState(false);
    const { data, auth } = useSelector(({ users: { currUser } }) =>currUser);
    const { cartItems: items } = useSelector(({ cart }) => cart);
    const dispatch = useDispatch();
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            document.querySelector('.nav').classList.add('sticky')
        } else {
            document.querySelector('.nav').classList.remove('sticky')
        }
    });

    const handleLogout = () => {
        localStorage.removeItem('bweteta_token');
        sendNotif('Vous êtes déconnecté');
        dispatch({
            type: usersActionTypes.LOGOUT_SUCCESS
        });
    };

    useEffect(() => {
        if(location.pathname === '/') {
            setPopupVisible(true)
        }else{
            setPopupVisible(false)
        }
        return;
    }, [location.pathname]);
    
    return (
        <div className='page' ref={setContainer}>
            <div className="nav">
                <Affix style={{ backgroundColor: 'white', width: '100%' }}>
                    <div className="top">
                        <div className="logo">
                            <img src={logo} alt="logo" srcset="" onClick={() =>history.push('/')} />
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
                            <Popover visible={userPopVisible} onVisibleChange={setUserPopVisible} trigger='click' content={
                                <Menu>
                                    {
                                        auth ?
                                        <>
                                            <div style={{ textAlign: 'center', padding: 15 }}>{data.fullname}</div>
                                            <Menu.Item key="1" icon={ <HiOutlineUser /> }>Mon profil</Menu.Item>
                                            <Menu.Item key="2" icon={<RiMoneyDollarCircleLine />} onClick={() =>{history.push('/orders'); setUserPopVisible(false)}}>Mes commandes</Menu.Item>
                                            <Menu.Item key="3" onClick={() =>{handleLogout(); setUserPopVisible(false)}} icon={<HiOutlineLogout />}>Deconnexion</Menu.Item>
                                        </>:
                                        <Menu.Item key="4" onClick={() =>history.push('/login')}  icon={<HiOutlineLogin />}>Connexion</Menu.Item>
                                    }
                                </Menu>
                            } zIndex={9999} placement='bottom'>
                                <div className="user">
                                    <HiOutlineUser className='icon' />
                                </div>
                            </Popover>
                            <Badge count={items.length} color='#dd4900' className='cart-count' style={{ marginTop: 15, marginRight: 10 }}>
                                <div className="cart" onClick={() =>setCartVisible(true)}>
                                    <HiOutlineShoppingBag className='icon' />
                                </div>
                            </Badge>
                        </div>
                    </div>
                </Affix>
                <div className="bottom">
                    <div className="categ">
                        <Dropdown visible={location.pathname === '/' ? true: popupVisible} onVisibleChange={(vis) =>setPopupVisible(vis)} trigger={['click']} overlay={menu}>
                            <div className="btn-categ"> <BiCategoryAlt className='icon-categ' /> Catégories <MdOutlineKeyboardArrowDown className='icon' /> </div>
                        </Dropdown>
                    </div>
                    <div className="links">
                        <div className="link" onClick={() =>history.push('/')}>Accueil</div>
                        <div className="link">Compte vendeur</div>
                        <div className="link">Besoin d'aide</div>
                    </div>
                </div>
                <CartDrawer visible={cartVisible} onClose={() =>setCartVisible(false)} />
            </div>
            <div className="children">{children}</div>
        </div>
    )
}

export default Nav
