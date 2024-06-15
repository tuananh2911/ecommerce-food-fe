import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../../App';
import { UserContext } from '../../context/UserContext'; // Đảm bảo đường dẫn đúng với nơi bạn lưu UserContext
import axios from 'axios';
import './style.css';
import { Link, useNavigate } from "react-router-dom";

const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const context = useContext(MyContext);
    const { removeFromWishlist, addToCart } = useContext(MyContext);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/signIn');
        } else {
            const fetchWishlistItems = async () => {
                try {
                    const response = await axios.get('http://localhost:5000/api/products'); // Thay thế API_ENDPOINT bằng endpoint thực tế của bạn
                    setWishlistItems(response.data);
                } catch (error) {
                    console.error('Error fetching wishlist items:', error);
                }
            };

            fetchWishlistItems();
        }
    }, [user, navigate]);

    return (
        <>
            {context.windowWidth > 992 && (
                <div className="breadcrumbWrapper">
                    <div className="container-fluid">
                        <ul className="breadcrumb breadcrumb2 mb-0">
                            <li>
                                <Link to={'/'}>Home</Link>
                            </li>
                            <li>Wishlist</li>
                        </ul>
                    </div>
                </div>
            )}
            <div className="wishlist-container">
                <h2>My Wishlist</h2>
                <ul className="wishlist">
                    {wishlistItems.map(item => (
                        <li key={item.id} className="wishlist-item">
                            <button className="remove-btn" onClick={() => removeFromWishlist(item.id)}>×</button>
                            <img src={item.productAvatar} alt={item.name} className="wishlist-img" />
                            <div className="wishlist-details">
                                <span className="wishlist-name">{item.name}</span>
                                <span className="wishlist-price">
                                    <span className="original-price">${item.originalPrice}</span>
                                    <span className="discounted-price">${item.price}</span>
                                </span>
                                <span className="wishlist-date">{new Date(item.createAt).toLocaleDateString()}</span>
                                <span className="wishlist-quantity">{item.quantity} in stock</span>
                            </div>
                            <button className="add-to-cart-btn" onClick={() => addToCart(item)}>Add to cart</button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Wishlist;