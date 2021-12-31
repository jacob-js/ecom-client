import Aos from 'aos';
import React, { useEffect } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from '../Nav';
import { authRoutes, notProtectedRoutesWithNav } from '../Utils/helpers';

function Routes() {
    useEffect(() => {
        Aos.init({ duration: 500 });
    }, []);

    return (
        <Router>
            <Switch>
                {
                    authRoutes.map((route, index) =>(
                        <Route exact path={route.path} key={index} render={ () =><route.component /> } />
                    ))
                }
                <Nav>
                    {
                        notProtectedRoutesWithNav.map((route, index) =>(
                            <Route path={route.path} key={index} render={ () =><route.component /> } />
                        ))
                    }
                </Nav>
            </Switch>
        </Router>
    )
}

export default Routes
