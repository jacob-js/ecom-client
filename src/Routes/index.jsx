import Aos from 'aos';
import React, { useEffect } from 'react'
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import { getCurrUserApi } from '../apis/auth';
import Nav from '../Nav';
import { usersActionTypes } from '../Redux/actionsTypes/users';
import { authRoutes, notProtectedRoutesWithNav, protectedRoutesWithNav } from '../Utils/helpers';
import { PageLoader } from '../Utils/loaders';
import ProtectedRoute from './ProtectedRoute';

function App() {
    const dispatch = useDispatch();
    const loaction = useLocation();
    const { loading } = useSelector(({ users: { currUser } }) =>currUser);
    useEffect(() => {
        Aos.init({ duration: 500 });
    }, []);
    const mutation = useMutation(getCurrUserApi, {
        onSuccess: (res) => {
            dispatch({
                type: usersActionTypes.GET_CURRENT_USER_SUCCESS,
                payload: res.data.data
            })
        },
        onError: (error) => {
            const res = error.response;
            if (res) {
                dispatch({
                    type: usersActionTypes.GET_CURRENT_USER_FAILURE,
                    payload: res.data.message
                })
            } else {
                mutation.mutate();
            }
        },
        onMutate: () => {
            dispatch({
                type: usersActionTypes.GET_CURRENT_USER_REQUEST
            })
        }
    });

    useEffect(() =>{
        mutation.mutate();
    }, []);
    useEffect(() => {
        window.scrollTo(0, 0);
    } , [loaction.pathname]);

    return (
        loading ? <PageLoader />:
        <Switch>
            {
                authRoutes.map((route, index) =>(
                    <Route exact path={route.path} key={index} render={ () =><route.component /> } />
                ))
            }
            <Nav>
                {
                    notProtectedRoutesWithNav.map((route, index) =>(
                        <Route path={route.path} exact={route.exact} key={index} render={ () =><route.component /> } />
                    ))
                }
                {
                    protectedRoutesWithNav.map((route, index) =>(
                        <ProtectedRoute route={route} key={index} />
                    ))
                }
            </Nav>
        </Switch>
    )
}

const Routes = () => {
    return (
        <Router>
            <App />
        </Router>
    )
}

export default Routes
