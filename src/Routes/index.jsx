import Aos from 'aos';
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom';
import { authRoutes } from '../Utils/helpers';

function Routes() {
    useEffect(() => {
        Aos.init({ duration: 500 });
    }, []);
    
    return (
        <Router>
            <Switch>
                {
                    authRoutes.map((route, index) =>(
                        <Route path={route.path} key={index} element={<route.component />} />
                    ))
                }
            </Switch>
        </Router>
    )
}

export default Routes
