import React, { useEffect, useState } from 'react'
import logo from '../assets/images/min_logo.png'
import { HiOutlineLogin, HiOutlineLogout, HiOutlineShoppingBag, HiOutlineUser } from 'react-icons/hi';
import { MdCategory, MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { Icon, Input, Dropdown as AtDropDown } from 'atomize';
import { Affix, Avatar, Badge, Dropdown, Empty, Menu, Popover, Rate, Skeleton, Spin } from 'antd';
import { BiHomeAlt } from 'react-icons/bi';
import { BiCategoryAlt } from 'react-icons/bi';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { usersActionTypes } from '../Redux/actionsTypes/users';
import { sendNotif } from '../Utils/notif';
import CartDrawer from './CartDrawer';
import { GrFacebookOption, GrInstagram, GrLinkedinOption, GrTwitter } from 'react-icons/gr';
import { useMutation, useQuery } from 'react-query';
import { getCategorysApi, searchProductsApi } from '../apis/products';
import { getParentsCategApi } from '../apis/categorys';
import axios from 'axios';

const { SubMenu } = Menu;

function Nav({children}) {
    const [visible, setVisible] = useState(false);
    const [visibleCatg, setVisibleCateg] = useState(false);
    const [cartVisible, setCartVisible] = useState(false);
    const [ container, setContainer ] = useState(null);
    const [ searchTerm, setSearchTerm ] = useState();
    const [ selectedCateg, setCateg ] = useState({ key: 'all', name: 'Toutes les categories' })
    const location = useLocation();
    const history = useHistory();
    const [popupVisible, setPopupVisible] = useState(location.pathname === '/' ? true: false)
    const [ userPopVisible, setUserPopVisible ] = useState(false);
    const [ resultVisible, setResultVisible ] = useState(false);
    const { data, auth } = useSelector(({ users: { currUser } }) =>currUser);
    const { cartItems: items } = useSelector(({ cart }) => cart);
    const { isLoading: loadingCategs, data: categs } = useQuery('categorys', getCategorysApi, {
        staleTime: 300000,
    });
    const { isLoading: loadingParentsCategs, data: parentsCategs } = useQuery('parentsCategs', getParentsCategApi);
    const { data: searchData, isLoading, mutate: mutateSearch } = useMutation(data =>searchProductsApi(data, 5, 0, selectedCateg.key !== 'all' ? selectedCateg.key: null));
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
        <Menu className='categ-menus' mode='vertical'>
            {
                loadingParentsCategs ?
                <>
                    <Skeleton.Input active style={{ width: 280, height: 35, borderRadius: 10, marginBottom: 15 }} />
                    <Skeleton.Input active style={{ width: 280, height: 35, borderRadius: 10, marginBottom: 15 }} />
                    <Skeleton.Input active style={{ width: 280, height: 35, borderRadius: 10, marginBottom: 15 }} />
                    <Skeleton.Input active style={{ width: 280, height: 35, borderRadius: 10, marginBottom: 15 }} />
                </>:
                parentsCategs?.length <= 0 ?
                <Empty description='Aucune catégorie trouvée' image={Empty.PRESENTED_IMAGE_SIMPLE} />:
                parentsCategs.map((parent, index) => (
                    <SubMenu key={index} title={<span onClick={() =>history.push(`/products/category/${parent.name}`)}>{parent.name}</span>}
                    icon={ <Avatar size={20} src={parent.icon} /> } popupClassName='sub'>
                        {
                            parent.Categorys?.map((category, index) => (
                                <div className="categ-sub">
                                    <Menu.Item key={index} onClick={() =>history.push(`/products/category/${category.name}`)}>
                                        {category.name}
                                    </Menu.Item>
                                    {category.SubCategorys && category.SubCategorys?.map((sub, index) => (
                                        <div key={index} className="sub-item" onClick={() =>history.push(`/products/category/${sub.name}`)}>
                                            {sub.name}
                                        </div>
                                    ))}
                                </div>
                            ))
                        }
                    </SubMenu>
                ))
            }
        </Menu>
    );

    const searchCategsMenus = (
        <Menu className='search-categ-menus' selectedKeys={[selectedCateg.key]}>
            <Menu.Item key='all' onClick={() =>setCateg({key: 'all', name: 'Toutes les categories'})}>Toutes les categories</Menu.Item>
            {
                categs?.map((categ, index) =>(
                    <Menu.Item key={index} onClick={() =>setCateg({key: categ.id, name: categ.name})}>{categ.name}</Menu.Item>
                ))
            }
        </Menu>
    )

    const stickyMenu = (
        <Menu className='sticky-categ-menus'>
            {
                parentsCategs?.map((parent, index) => (
                    <Menu.Item key={index} onClick={() =>history.push(`/products/category/${parent.name}`)}
                    icon={ <Avatar size={20} src={parent.icon} /> }>{parent.name}</Menu.Item>
                ))
            }
        </Menu>
    );

    const handleLogout = () => {
        localStorage.removeItem('bweteta_token');
        sendNotif('Vous êtes déconnecté');
        dispatch({
            type: usersActionTypes.LOGOUT_SUCCESS
        });
        axios.defaults.headers.common['bweteta_token'] = null;
    };

    useEffect(() => {
        if(location.pathname === '/') {
            setPopupVisible(true)
        }else{
            setPopupVisible(false)
        }
        return;
    }, [location.pathname]);

    const debounce = (cb) => {
        let timer;
        return function (...args){
            if(timer) clearTimeout(timer);
            timer = setTimeout(() => {
                cb(...args);
            }, 1000);
        }
    }

    const handleSearchTermChange = debounce((e) =>{
        setSearchTerm(e.target.value); 
        mutateSearch(e.target.value)
    });

    const onSearch = (e) =>{
        if(e.key === 'Enter') {
            if(searchTerm) {
                history.push(`/search/products?query=${searchTerm}${selectedCateg.key !== 'all' ? `&category=${selectedCateg.key}`: ''}`)
            }
        }
    }
    
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
                        <div className="search" onMouseLeave={() =>setResultVisible(false)}>
                            <Input
                                placeholder="Rechercer... puis appuyer sur Entrée"
                                p={{ x: "2.5rem" }}
                                rounded="circle"
                                w="50rem"
                                h="3rem"
                                borderColor="gray500"
                                hoverBorderColor="#dd4900"
                                focusBorderColor="#dd4900"
                                textWeight="300"
                                onChange={handleSearchTermChange}
                                onKeyPress={onSearch}
                                onFocus={() =>setResultVisible(true)}
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
                                    <div className="search-drop">
                                            <AtDropDown textColor="gray500" isOpen={visibleCatg} onClick={() =>setVisibleCateg(!visibleCatg)} menu={searchCategsMenus} className='dropdown' border="none">
                                            <div className=""> {selectedCateg.name} </div>
                                        </AtDropDown>
                                </div>
                                }
                            />
                            {
                                resultVisible &&
                                <div className="result">
                                    {
                                        isLoading ?
                                        <div className="loading">
                                            <Spin />
                                        </div>:
                                        searchData?.count > 0 ?
                                        <div className="list">
                                            {
                                                searchData?.rows.map((product, index) => (
                                                    <div className="item" key={index} onClick={() =>history.push(`/products/${product.id}`)}>
                                                        <div className="first">
                                                            <div className="cover">
                                                                <img src={product.cover} alt="product" srcset="" />
                                                            </div>
                                                            <div className="info">
                                                                <div className="name">{product.name}</div>
                                                                <Rate disabled defaultValue={product.Ratings?.reduce((total, rate) => total + rate.value, 0) / product.Ratings?.length} className='rate' />
                                                            </div>
                                                        </div>
                                                        <div className="second">
                                                            <div className="price">
                                                                {product.currency === "USD" ? '$': "FC"}{product.price - (product.discount || 0)}
                                                                { product.discount && <span className="discounted"> {product.currency === "USD" ? '$': "FC"}{product.price} </span> }
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>:
                                        <div className="empty">
                                            <Empty description="Aucun résultat trouvé" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                        </div>
                                    }
                                </div>
                            }
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
                    <div className="search" onMouseLeave={() =>setResultVisible(false)}>
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
                            onChange={(e) => {setSearchTerm(e.target.value); e.target.value.length > 0 && mutateSearch(e.target.value)}}
                            onKeyPress={onSearch}
                            onFocus={() =>setResultVisible(true)}
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
                        {
                                resultVisible &&
                                <div className="result">
                                    {
                                        isLoading ?
                                        <div className="loading">
                                            <Spin />
                                        </div>:
                                        searchData?.count > 0 ?
                                        <div className="list">
                                            {
                                                searchData?.rows.map((product, index) => (
                                                    <div className="item" key={index} onClick={() =>history.push(`/products/${product.id}`)}>
                                                        <div className="first">
                                                            <div className="cover">
                                                                <img src={product.cover} alt="product" srcset="" />
                                                            </div>
                                                            <div className="info">
                                                                <div className="name">{product.name}</div>
                                                                <Rate disabled defaultValue={product.Ratings?.reduce((total, rate) => total + rate.value, 0) / product.Ratings?.length} className='rate' />
                                                            </div>
                                                        </div>
                                                        <div className="second">
                                                            <div className="price">
                                                                {product.currency === "USD" ? '$': "FC"}{product.price - (product.discount || 0)}
                                                                { product.discount && <span className="discounted"> {product.currency === "USD" ? '$': "FC"}{product.price} </span> }
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>:
                                        <div className="empty">
                                            <Empty description="Aucun résultat trouvé" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                        </div>
                                    }
                                </div>
                            }
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
            {
                location.pathname !== '/mob/category' &&
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
            }
        </div>
    )
}

export default Nav
