import ConfirmAccount from "../Components/ConfirmAccount";
import Home from "../Components/Home";
import Login from "../Components/Login";
import Signup from "../Components/Signup";

const routes = [
    {
        path: "/",
        component: Home,
        protected: false,
        nav: true
    },
    {
        name: 'Login',
        path: '/login',
        component: Login,
        authRoute: true,
        protected: false,
        nav: false
    },
    {
        name: 'Signup',
        path: '/signup',
        component: Signup,
        authRoute: true,
        protected: false,
        nav: false
    },
    {
        path: '/confirm-account',
        component: ConfirmAccount,
        authRoute: true,
        protected: false,
        nav: false
    }
]

export default routes;