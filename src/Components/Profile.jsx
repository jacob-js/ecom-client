import { Avatar } from 'antd';
import React, { useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { AiOutlineEdit } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import moment from 'moment';
import ProfileForm from './ProfileForm';
import { useHistory } from 'react-router-dom';

function Profile() {
    const [ formVisible, setFormVisible ] = useState(false);
    const { data } = useSelector(({ users: { currUser } }) => currUser);
    const acronym = data?.fullname?.split(' ').map(name => name[0].toUpperCase()).join('');
    const history = useHistory();

    return <div className='profile'>
        <div className="header">
            <div className="title">
                <FaUserAlt className='icon' /> Mon profile
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
                <div className="card" onClick={() =>history.push('/orders')}>
                    <div className="stat">20</div>
                    <div className="stat-name">Toutes mes commandes</div>
                </div>
                <div className="card">
                    <div className="stat">2</div>
                    <div className="stat-name">Commandes en attente</div>
                </div>
                <div className="card">
                    <div className="stat">10</div>
                    <div className="stat-name">Commandes livrées</div>
                </div>
                <div className="card">
                    <div className="stat">8</div>
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
