import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useContext, useState} from 'react';
import { UserContext } from './context/UserContext';

const BASE_URL = process.env.BASE_URL;
const localhost = 'http://localhost:5000/api';

const useApi = () => {
    const { user } = useContext(UserContext);
    const checkAuth = () => {
        return user && user.id;
    };
    const getOrders = async (customerId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/orders/customer?customerId=${customerId}`);
            const orders = response.data;

            // Sửa đổi URL hình ảnh cho từng sản phẩm
            return orders
        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }
    }
    const getProductData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/products");
            const products = response.data;

            // Sửa đổi URL hình ảnh cho từng sản phẩm
            const modifiedProducts = products.map((product) => ({
                ...product,
                image: product.image.map((img) => ({
                    ...img,
                    url: `https://lh3.googleusercontent.com/d/${img.url.split("?id=").pop()}`,
                })),
                vendor: {
                    ...product.vendor,
                    avatar: `https://lh3.googleusercontent.com/d/${product.vendor.avatar.split("?id=").pop()}`,
                },
            }));

            return modifiedProducts;
        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }
    };

    const getCategoryData = async (url = `${localhost}/categories`) => {

        try {
            let data;
            await axios.get(url).then((response) => {
                data = response.data;
            });

            return data;
        } catch (error) {
            console.log(error.message);
            return [];
        }
    };

    const getCart = async (url = `${localhost}/carts?customerId=${user ? user.id : ''}`) => {
        console.log('user cart',user)
        if(!checkAuth()){
            throw {statusCode:403,message:"Not signed in"};
        }

        try {
            let data;
            await axios.get(url).then((response) => {
                data = response.data;
            });
            return data;
        } catch (error) {
            console.log(error.message);
            if(error.statusCode === 403){
                throw {statusCode:403,message:"Not signed in"};
            }
            return [];
        }
    };

    return {
        getProductData,
        getCategoryData,
        getCart,
        getOrders
    };
};

export default useApi;
