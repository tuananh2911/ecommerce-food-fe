import React, {useEffect, useState, createContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './responsive.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

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
import {getCategoryData, getProductData} from "./api";

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

    const [cartTotalAmount, setCartTotalAmount] = useState();

    useEffect(() => {
        fetchData();
        getCategoriesData();

        // getData('http://localhost:5000/productData');
        getCartData("http://localhost:5000/cart");

        const is_Login = localStorage.getItem('isLogin');
        setIsLogin(is_Login);
    }, []);
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/products');
            setProductData(response.data);
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
    const getCartData = async (url = "http://localhost:5000/cart") => {
        try {
            await axios.get(url).then((response) => {
                setCartItems(response.data);
            })

        } catch (error) {
            console.log(error.message);
        }
    }

    const addToCart = async (item) => {
        item.quantity = 1;
        const data = {
            productId: item.id,
            quantity: item.quantity,
            customerId:1,
        }
        try {
            await axios.post("http://localhost:5000/cart", data).then((res) => {
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


    const removeItemsFromCart = async (id) => {
        const response = await axios.delete(`http://localhost:5000/cart/${id}`);
        if (response !== null) {
            getCartData("http://localhost:5000/cart");
        }
    }

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
        removeItemsFromCart,
        emptyCart,
        signOut,
        signIn,
        openFilters,
        isopenNavigation,
        setIsopenNavigation,
        setCartTotalAmount,
        cartTotalAmount,
        setCartItems,
    }

    return (

        data.productData.length !== 0 &&
        <BrowserRouter>
            <MyContext.Provider value={value}>
                {
                    isLoading === true && <div className='loader'><img src={Loader}/></div>
                }


                <Header data={categories}/>
                <Routes>
                    <Route exact={true} path="/" element={<Home data={productData}/>}/>
                    <Route exact={true} path="/cat/:id" element={<Listing data={data.productData} single={true}/>}/>
                    <Route exact={true} path="/cat/:id/:id"
                           element={<Listing data={data.productData} single={false}/>}/>
                    <Route exact={true} path="/product/:id" element={<DetailsPage data={data.productData}/>}/>
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
