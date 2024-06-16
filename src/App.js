import React, {useEffect, useState, createContext, useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './responsive.css';
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom';

import Header from './components/header/header';
import Footer from './components/footer/footer';
import Home from './pages/Home/index';
import About from './pages/About/index';
import Listing from './pages/Listing';
import NotFound from './pages/NotFound';
import DetailsPage from './pages/Details';
import Checkout from './pages/checkout';
import axios from 'axios';
import Cart from './pages/cart';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Loader from './assets/images/loading.gif';

import data from './data';
import useApi from "./api";
import Wishlist from "./components/wishlist";
import MyAccount from "./pages/MyAccount/MyAccount";
import OrderTracking from "./pages/OrderTracking/OrderTracking";
import {UserContext} from "./context/UserContext";

const MyContext = createContext();

function App() {

    const [productData, setProductData] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsloading] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [categories, setCategories] = useState([]);
    const [isopenNavigation, setIsopenNavigation] = useState(false);
    const [isLogin, setIsLogin] = useState();
    const [isOpenFilters, setIsopenFilters] = useState(false);
    const {user} = useContext(UserContext);
    const [cartTotalAmount, setCartTotalAmount] = useState();
    const [wishlist, setWishlist] = useState([]);
    const {getProductData, getCategoryData, getCart} = useApi();
    const context = useContext(MyContext);
    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const cartData = await getCart();
                setCartItems(cartData);
                context.setCartItems(cartData); // Sử dụng setCartItems từ context
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };

        if (user) {
            fetchCartData();
        }
    }, [user]);
    console.log('cartData',cartItems)
    useEffect(() => {

        fetchData();
        getCategoriesData();
        // getCart()



        const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlist(savedWishlist);
    }, []);

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);
    useEffect(() => {
        setIsLogin(localStorage.getItem('isLogin'));
    }, [localStorage.getItem('isLogin')]);
    const fetchData = async () => {
        try {
            const products = await getProductData();
            setProductData(products);
            setIsloading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsloading(false);
        }
    };

    const getCategoriesData = async () => {
        try {
            const categoriesData = await getCategoryData();
            setCategories(categoriesData);
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsloading(false);
        }
    };

    const addToCart = async (item) => {
        item.quantity = 1;
        if (!user) {
            window.location.href = '/signIn';
            return;
        }
        const data = {
            productId: item.id,
            quantity: item.quantity,
            customerId: user.id,
        }
        try {
            await axios.post("http://localhost:5000/api/carts", data).then((res) => {
                if (res.status === 201) {
                    return true;
                } else {
                    return false;
                }
            })
        } catch (error) {
            console.log(error)
        }

    }

    const addToWishlist = (item) => {
        setWishlist([...wishlist, item]);
    };

    const removeFromWishlist = async (id) => {
        try {
            await axios.delete(`API_ENDPOINT/${id}`); // Thay thế API_ENDPOINT bằng endpoint thực tế của bạn
            setWishlist(wishlist.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error removing item from wishlist:', error);
        }
    };


    const emptyCart = () => {
        setCartItems([])
    }

    const signIn = () => {
        const is_Login = localStorage.getItem('isLogin');
        setIsLogin(is_Login);
    }

    const signOut = () => {
        localStorage.removeItem('isLogin');
        setIsLogin(false);
    }

    const openFilters = () => {
        setIsopenFilters(!isOpenFilters)
    }

    const value = {
        cartItems,
        isLogin,
        windowWidth,
        isOpenFilters,
        addToCart,
        emptyCart,
        signOut,
        signIn,
        openFilters,
        isopenNavigation,
        setIsopenNavigation,
        setCartTotalAmount,
        cartTotalAmount,
        setCartItems,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        productData, // Thêm productData vào đây
    };

    return (
        data.productData.length !== 0 &&
        <BrowserRouter>
            <MyContext.Provider value={value}>
                {
                    isLoading === true && <div className='loader'><img src={Loader}/></div>
                }

                <Header data={categories}/>
                <Routes>
                    <Route exact={true} path="/" element={<Home data={productData} categories={categories}/>}/>
                    <Route exact={true} path="/cat/:id" element={<Listing categories={categories} data={productData} single={true}/>}/>
                    <Route exact={true} path="/cat/:id/:id"
                           element={<Listing data={data.productData} single={false}/>}/>
                    <Route exact={true} path="/wishlist" element={<Wishlist/>}/>
                    <Route exact={true} path="/account" element={<MyAccount/>}/>
                    <Route exact={true} path="/order-tracking" element={<OrderTracking/>}/>
                    <Route exact={true} path="/product/:id" element={<DetailsPage/>}/>
                    <Route exact={true} path="/cart" element={<Cart/>}/>
                    <Route exact={true} path="/signIn" element={<SignIn/>}/>
                    <Route exact={true} path="/signUp" element={<SignUp/>}/>
                    <Route exact={true} path="/checkout" element={<Checkout/>}/>
                    <Route exact={true} path="*" element={<NotFound/>}/>
                </Routes>
                <Footer/>
            </MyContext.Provider>
        </BrowserRouter>
    );
}

export default App;

export {MyContext}
