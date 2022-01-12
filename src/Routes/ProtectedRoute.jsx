import React from 'react'
import { useSelector } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
import { sendNotif } from '../Utils/notif';

function ProtectedRoute({ route }) {
    const { auth } = useSelector(({ users: { currUser } }) =>currUser);
    const history = useHistory();
    return (
        <Route path={route.path} exact={route.exact} render={ () =>(
            auth === false ?
            // sendNotif('Vous devez vous connecter pour accéder à cette page', 'error', 'top');
            history.push({ pathname: '/login', state: { from: history.location.pathname } })
            :<route.component />
         ) } />
    )
}

export default ProtectedRoute
