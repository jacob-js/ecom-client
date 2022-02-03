import React, { useEffect, useState } from 'react'
import logo from '../assets/images/min_logo.png'
import { HiOutlineLogin, HiOutlineLogout, HiOutlineShoppingBag, HiOutlineUser } from 'react-icons/hi';
import { MdCategory, MdOutlineBikeScooter, MdOutlineDevices, MdOutlineKeyboardArrowDown, MdOutlinePets } from 'react-icons/md';
import { Icon, Input, Dropdown as AtDropDown } from 'atomize';
import { Affix, Badge, Dropdown, Menu, Popover } from 'antd';
import { GiHealing, GiHomeGarage, GiMusicSpell, GiTravelDress } from 'react-icons/gi';
import { BiHomeAlt } from 'react-icons/bi';
import { FaBaby } from 'react-icons/fa';
import { BiCategoryAlt } from 'react-icons/bi';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { usersActionTypes } from '../Redux/actionsTypes/users';
import { sendNotif } from '../Utils/notif';
import CartDrawer from './CartDrawer';
import { GrFacebookOption, GrInstagram, GrLinkedinOption, GrTwitter } from 'react-icons/gr';

function Nav({children}) {
    const [visible, setVisible] = useState(false);
    const [cartVisible, setCartVisible] = useState(false);
    const [ container, setContainer ] = useState(null);
    const [ searchTerm, setSearchTerm ] = useState();
    const location = useLocation();
    const history = useHistory();
    const [popupVisible, setPopupVisible] = useState(location.pathname === '/' ? true: false)
    const [ userPopVisible, setUserPopVisible ] = useState(false);
    const { data, auth } = useSelector(({ users: { currUser } }) =>currUser);
    const { cartItems: items } = useSelector(({ cart }) => cart);
    const dispatch = useDispatch();
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            document.querySelector('.nav').classList.add('sticky')
            document.querySelector('.bar').classList.add('sticky')
        } else {
            document.querySelector('.nav').classList.remove('sticky')
            document.querySelector('.bar').classList.remove('sticky')
        }
    });

    const menu = (
        <Menu className='categ-menus'>
            <Menu.Item key="1" onClick={() =>history.push('/products/category/mode')} icon={ <GiTravelDress /> }>Mode</Menu.Item>
            <Menu.Item key="2" onClick={() =>history.push('/products/category/electroniques')} icon={<MdOutlineDevices />}>Electonique</Menu.Item>
            <Menu.Item key="3" onClick={() =>history.push('/products/category/velos')} icon={<MdOutlineBikeScooter />}>Velos</Menu.Item>
            <Menu.Item key="4" onClick={() =>history.push('/products/category/maison et jardin')} icon={<GiHomeGarage />}>Maison et jardin</Menu.Item>
            <Menu.Item key="5" onClick={() =>history.push('/products/category/musique')} icon={<GiMusicSpell />}>Musique</Menu.Item>
            <Menu.Item key="3" icon={<GiHealing />}>Santé et beauté</Menu.Item>
            <Menu.Item key="3" icon={<FaBaby />}>Jouets pour bébé</Menu.Item>
            <Menu.Item key="3" icon={<MdOutlinePets />}>Animaux domestiques</Menu.Item>
        </Menu>
    );

    const stickyMenu = (
        <Menu className='sticky-categ-menus'>
            <Menu.Item key="1" onClick={() =>history.push('/products/category/mode')} icon={ <GiTravelDress /> }>Mode</Menu.Item>
            <Menu.Item key="2" onClick={() =>history.push('/products/category/electroniques')} icon={<MdOutlineDevices />}>Electonique</Menu.Item>
            <Menu.Item key="3" onClick={() =>history.push('/products/category/velos')} icon={<MdOutlineBikeScooter />}>Velos</Menu.Item>
            <Menu.Item key="4" onClick={() =>history.push('/products/category/maison et jardin')} icon={<GiHomeGarage />}>Maison et jardin</Menu.Item>
            <Menu.Item key="5" onClick={() =>history.push('/products/category/musique')} icon={<GiMusicSpell />}>Musique</Menu.Item>
            <Menu.Item key="6" icon={<GiHealing />}>Santé et beauté</Menu.Item>
            <Menu.Item key="7" icon={<FaBaby />}>Jouets pour bébé</Menu.Item>
            <Menu.Item key="8" icon={<MdOutlinePets />}>Animaux domestiques</Menu.Item>
        </Menu>
    );

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

    document.addEventListener('keypress', e =>{
        if(e.key === 'Enter') {
            if(searchTerm) {
                history.push(`/products/search/${searchTerm}`)
            }
        }
    })
    
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
                                placeholder="Rechercer... puis appuyer sur Entrée"
                                p={{ x: "2.5rem" }}
                                rounded="circle"
                                w="40rem"
                                h="3rem"
                                borderColor="gray500"
                                hoverBorderColor="#dd4900"
                                focusBorderColor="#dd4900"
                                textWeight="300"
                                onChange={(e) => setSearchTerm(e.target.value)}
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
                                            <Menu.Item key="1" icon={ <HiOutlineUser /> } onClick={() =>{ history.push('/profile'); setUserPopVisible(false) }}>Mon profile</Menu.Item>
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
            <div className="nav-mob">
                <div className="logo">Bweteta white logo</div>
                <div className="bar">
                    <div className="search">
                        <Input
                            placeholder="Rechercer... puis appuyer sur Entrée"
                            p={{ x: "2.5rem", y: "2px" }}
                            rounded="circle"
                            w="100%"
                            h="2.5rem"
                            borderColor="gray500"
                            hoverBorderColor="#dd4900"
                            focusBorderColor="#dd4900"
                            textWeight="300"
                            onChange={(e) => setSearchTerm(e.target.value)}
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
                        />
                    </div>
                </div>
            </div>
            <div className="children">{children}</div>
            <div className="bottom-bar">
                <div className={`link ${location.pathname === '/' ? 'active': ''}`} onClick={() =>history.push('/')}>
                    <div className="icon"> <BiHomeAlt /> </div>
                    <div className="text">Accueil</div>
                </div>
                <div className={`link ${location.pathname === '/mob/category' ? 'active': ''}`} onClick={() =>history.push('/mob/category')}>
                    <div className="icon"> <BiCategoryAlt /> </div>
                    <div className="text">Categories</div>
                </div>
                <div className={`link ${location.pathname === '/cart' ? 'active': ''}`} onClick={() =>history.push('/cart')}>
                    <Badge count={items.length} color='#dd4900' className='cart-count'>
                        <div className="cart">
                            <HiOutlineShoppingBag className='icon' />
                        </div>
                    </Badge>
                    <div className="text">Panier</div>
                </div>
                <div className={`link ${location.pathname === '/profile' ? 'active': ''}`} onClick={() =>history.push('/profile')}>
                    <div className="icon"> <HiOutlineUser /> </div>
                    <div className="text">Mon compte</div>
                </div>
            </div>
            <div className="footer">
                <div className="block">
                    <div className="logo"> <img src={logo} alt="" srcset="" /> </div>
                    <div className="text">
                    Bweteta est une entreprise basée à Goma, spécialisée dans le commerce éléctronique, connectant les petits commerçants et particuliers habitant dans les zones rurales ou milieux urbano-ruraux éloignés des centres commerciaux avec les fournisseurs internationaux et locaux pour un approvisionnement a distance et une livraison rapide.
                    </div>
                </div>
                <div className="block">
                    <div className="title">A propos de nous</div>
                    <div className="links">
                        <div className="link">Carrières</div>
                        <div className="link">Nos objectifs</div>
                        <div className="link">Conditions générales</div>
                        <div className="link">Politique de confidentialité</div>
                    </div>
                </div>
                <div className="block">
                    <div className="title">Suivi des clients</div>
                    <div className="links">
                        <div className="link">Centre d'aides</div>
                        <div className="link">Comment achéter</div>
                        <div className="link">Comment vendre</div>
                        <div className="link">Retours et remboursements</div>
                    </div>
                </div>
                <div className="block">
                    <div className="title">Nous contacter</div>
                    <div className="address">Ville de GOMA, 136 AV La Frontière au Quartier KATINDO (HUB Un Jour Nouveau)</div>
                    <div className="email">Email: bweteta@info.com</div>
                    <div className="phone">N° de téléphone: +243976349073</div>
                    <div className="socials">
                        <a className="social"> <GrFacebookOption className='icon' /> </a>
                        <a className="social"> <GrInstagram className='icon' /> </a>
                        <a className="social"> <GrLinkedinOption className='icon' /> </a>
                        <a className="social"> <GrTwitter className='icon' /> </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Nav
