import BestProducts from "../Components/BestProducts";
import Carts from "../Components/Cart";
import Checkout from "../Components/Checkout";
import ConfirmAccount from "../Components/ConfirmAccount";
import Home from "../Components/Home";
import OrderDetails from "../Components/OrderDetails";
import OrdersList from "../Components/OrdersList";
import OthersProducts from "../Components/OthersProds";
import ProductDetail from "../Components/ProductDetail";
import ProductsByCateg from "../Components/ProductsByCateg";
import ProductsByKey from "../Components/ProductsByKey";
import Profile from "../Components/Profile";
import Search from "../Components/Search";
import Signup from "../Components/Signup";
import MobCateg from '../Nav/MobCateg';
import { ResetPwdUsernameForm, Login, ResetPwdOtpForm } from "../Pages";

export const routes = [
    {
        path: "/",
        component: Home,
        protected: false,
        nav: true,
        exact: true
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
    },
    {
        path: '/check-username',
        component: ResetPwdUsernameForm,
        authRoute: true,
        protected: false,
        nav: false
    },
    {
        path: '/enter-otp',
        component: ResetPwdOtpForm,
        authRoute: true,
        protected: false,
        nav: false
    },
    {
        path: '/products/:id',
        component: ProductDetail,
        protected: false,
        nav: true,
        exact: true
    },
    {
        path: '/search/products',
        component: Search,
        protected: false,
        nav: true,
        exact: true
    },
    {
        path: '/products/category/:category',
        component: ProductsByCateg,
        protected: false,
        nav: true,
        exact: true
    },
    {
        path: '/products-key',
        component: ProductsByKey,
        protected: false,
        nav: true,
        exact: true
    },
    {
        path: '/products/type/best',
        component: BestProducts,
        protected: false,
        nav: true,
        exact: true
    },
    {
        path: '/products/type/all',
        component: OthersProducts,
        protected: false,
        nav: true,
        exact: true
    },
    {
        path: '/cart',
        component: Carts,
        protected: false,
        nav: true,
        exact: true
    },
    {
        path: '/checkout',
        component: Checkout,
        protected: true,
        nav: true,
        exact: true
    },
    {
        path: '/orders',
        component: OrdersList,
        protected: true,
        nav: true,
        exact: true
    },
    {
        path: '/orders/:id',
        component: OrderDetails,
        protected: true,
        nav: true,
        exact: true
    },
    {
        path: '/profile',
        component: Profile,
        protected: true,
        nav: true,
        exact: true
    },
    {
        path: '/mob/category',
        component: MobCateg,
        protected: false,
        nav: true,
        exact: true
    }
];