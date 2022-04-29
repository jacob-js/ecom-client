import { Avatar, Drawer, Menu } from 'antd';
import React, { useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { AiOutlineEdit, AiOutlineMenu } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import ProfileForm from './ProfileForm';
import { useHistory } from 'react-router-dom';
import { HiOutlineUser } from 'react-icons/hi';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { sendNotif } from '../Utils/notif';
import { usersActionTypes } from '../Redux/actionsTypes/users';
import { useQuery } from 'react-query';
import { getOrdersApi } from '../apis/orders';

function Profile() {
    const [ formVisible, setFormVisible ] = useState(false);
    const [ menuVisible, setMenuVisible ] = useState(false);
    const { data } = useSelector(({ users: { currUser } }) => currUser);
    const acronym = data?.fullname?.split(' ').map(name => name[0].toUpperCase()).join('');
    const history = useHistory();
    const dispatch = useDispatch();
    const { data: orders, isFetching, refetch } = useQuery('orders', () =>getOrdersApi(data.id, 2, 0) );
    const { data: pendingOrders } = useQuery(['orders', 'pending'], () =>getOrdersApi(data.id, 2, 0, 'pending') );
    const { data: delivered } = useQuery(['orders', 'delivered'], () =>getOrdersApi(data.id, 2, 0, 'delivered') );
    const { data: cancelledOrders } = useQuery(['orders', 'cancelled'], () =>getOrdersApi(data.id, 2, 0, 'cancelled') );

    const handleLogout = () => {
        localStorage.removeItem('bweteta_token');
        sendNotif('Vous êtes déconnecté');
        dispatch({
            type: usersActionTypes.LOGOUT_SUCCESS
        });
        history.push('/');
    };

    return <div className='profile'>
        <Drawer zIndex={99} className='drawer' placement='left' closable={false} visible={menuVisible} onClose={() =>setMenuVisible(false)} width='70%' >
            <Menu mode='inline' defaultSelectedKeys={['2']} className='menu'>
                <div className="title">Tableau de bord</div>
                <Menu.Item key='1' icon={<RiMoneyDollarCircleLine />} onClick={() =>history.push('/orders')}>Commandes</Menu.Item>
                <div className="title">Parametres du compte</div>
                <Menu.Item key='2' icon={ <HiOutlineUser /> } onClick={() =>history.push('/profile')}>Profile</Menu.Item>
                <Menu.Item key='3' icon={<BiLogOut />} onClick={() =>{handleLogout(); setMenuVisible(false)}}>Deconnexion</Menu.Item>
            </Menu>
        </Drawer>
        <div className="header">
            <div className="title">
                <FaUserAlt className='icon' /> Mon profile
            </div>
            <div className="menu" onClick={() =>setMenuVisible(true)}>
                <AiOutlineMenu className='icon' />
            </div>
        </div>
        <div className="user-cards">
            <div className="card user">
                <div className="pic">
                    <Avatar src={data?.cover && data.cover} size={60}> { !data.cover && acronym } </Avatar>
                </div>
                <div className="info">
                    <div className="fullname">{data.fullname}</div>
                    <div className="email">{data.email}</div>
                </div>
            </div>
            <div className="stats">
                <div className="card">
                    <div className="stat">{orders?.data.count || 0}</div>
                    <div className="stat-name">Toutes mes commandes</div>
                </div>
                <div className="card">
                    <div className="stat">{pendingOrders?.data.count || 0}</div>
                    <div className="stat-name">Commandes en attente</div>
                </div>
                <div className="card">
                    <div className="stat">{delivered?.data.count || 0}</div>
                    <div className="stat-name">Commandes livrées</div>
                </div>
                <div className="card">
                    <div className="stat">{cancelledOrders?.data.count || 0}</div>
                    <div className="stat-name">Commandes annulées</div>
                </div>
            </div>
        </div>
        <div className="user-infos">
            <div className="section">
                <div className="title">Nom complet</div>
                <div className="value">{data.fullname}</div>
            </div>
            <div className="section">
                <div className="title">Email</div>
                <div className="value">{data.email || 'Non definie'}</div>
            </div>
            <div className="section">
                <div className="title">Téléphone</div>
                <div className="value">{data.phone || 'Non definie'}</div>
            </div>
            <div className="section">
                <div className="title">Date de naissance</div>
                <div className="value">{ data.birthdate ? moment(data.birthdate).format('ll'): 'Non definie'}</div>
            </div>
            <div className="section">
                <div className="title">Sexe</div>
                <div className="value">{data.gender || 'Non definie'} </div>
            </div>
            <div className="section">
                <div className="title">Profession</div>
                <div className="value"> {data.profession || 'Non definie'} </div>
            </div>
            <div className="section">
                <div className="title">Pays</div>
                <div className="value"> {data.country || 'Non definie'} </div>
            </div>
            <div className="section">
                <div className="title">Province</div>
                <div className="value"> {data.state || 'Non definie'} </div>
            </div>
            <div className="section">
                <div className="title">Ville</div>
                <div className="value"> {data.city || 'Non definie'} </div>
            </div>
        </div>
        {
            !formVisible &&
            <div className="edit-btn" onClick={() =>setFormVisible(true)}> <AiOutlineEdit className='icon' /> Editer </div>
        }
        <ProfileForm user={data} formVisible={formVisible} setFormVisible={setFormVisible} />
    </div>;
}

export default Profile;
