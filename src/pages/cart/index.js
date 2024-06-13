import React, {useContext, useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './style.css';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Rating from '@mui/material/Rating';
import {Button} from '@mui/material';
import QuantityBox from '../../components/quantityBox';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {MyContext} from '../../App';
import axios from 'axios';
import useApi from "../../api";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();
    const {
        getCart,
    } = useApi(navigate);
    const context = useContext(MyContext);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const cartItems = await getCart();
                setCartItems(cartItems);
            } catch (e) {
                console.log(e)
                if (e.statusCode === 403) {
                    navigate('/signIn')
                }

            }
        };

        fetchData();
        window.scrollTo(0, 0);

    }, [context.cartItems]);

    const updateCart = (items) => {
        setCartItems(items);
    };

    const calculateTotalAmount = () => {
        return cartItems.length !== 0
            ? cartItems.map(cart => cart.products.map(product => parseInt(product.price) * cart.quantity))
                .flat()
                .reduce((total, value) => total + value, 0)
            : 0;
    };

    const totalAmount = calculateTotalAmount();

    const handleCheckout = () => {
        navigate('/checkout', {state: {cartItems, cartTotalAmount: totalAmount}});
    };

    return (
        <>
            {context.windowWidth > 992 && (
                <div className="breadcrumbWrapper">
                    <div className="container-fluid">
                        <ul className="breadcrumb breadcrumb2 mb-0">
                            <li>
                                <Link to={'/'}>Home</Link>
                            </li>
                            <li>
                                Cart
                            </li>
                        </ul>
                    </div>
                </div>
            )}

            <section className='cartSection mb-5'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-8'>
                            <div className='d-flex align-items-center w-100'>
                                <div className='left'>
                                    <h1 className='hd mb-0'>Your Cart</h1>
                                    <p>There are <span className='text-g'>{cartItems.length}</span> products in your
                                        cart</p>
                                </div>
                            </div>

                            <div className='cartWrapper mt-4'>
                                <div className='table-responsive'>
                                    <table className='table'>
                                        <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Unit Price</th>
                                            <th>Quantity</th>
                                            <th>Subtotal</th>
                                            <th>Remove</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {cartItems.length !== 0 &&
                                            cartItems.map((cart, cartIndex) => {
                                                return cart.products.map((product, productIndex) => {
                                                    const totalPrice = parseInt(product.price) * parseInt(cart.quantity);
                                                    const averageRating = product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length;

                                                    return (
                                                        <tr key={`cart-${cartIndex}-product-${productIndex}`}>
                                                            <td width={"50%"}>
                                                                <div className='d-flex align-items-center'>
                                                                    <div className='img'>
                                                                        <Link to={`/product/${product.id}`}>
                                                                            <img src={product.image[0].url}
                                                                                 className='w-100'/>
                                                                        </Link>
                                                                    </div>
                                                                    <div className='info pl-4'>
                                                                        <Link to={`/product/${product.id}`}>
                                                                            <h4>{product.name}</h4>
                                                                        </Link>
                                                                        <Rating
                                                                            name="half-rating-read"
                                                                            value={parseFloat(averageRating)}
                                                                            precision={0.5}
                                                                            readOnly
                                                                        />
                                                                        <span
                                                                            className='text-light'>({parseFloat(averageRating)})</span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td width="20%"><span> {parseInt(product.price)}đ</span>
                                                            </td>
                                                            <td>
                                                                <QuantityBox
                                                                    item={cart}
                                                                    cartItems={cartItems}
                                                                    index={cartIndex}
                                                                    updateCart={updateCart}
                                                                />
                                                            </td>
                                                            <td>
                                                                <span className='text-g'>{totalPrice}đ</span>
                                                            </td>
                                                            <td align='center'>
                                                                    <span className='cursor'
                                                                          onClick={() => context.removeItemsFromCart(product.id)}>
                                                                        <DeleteOutlineOutlinedIcon/>
                                                                    </span>
                                                            </td>
                                                        </tr>
                                                    );
                                                });
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <br/>

                            <div className='d-flex align-items-center'>
                                <Link to="/">
                                    <Button className='btn-g'>
                                        <KeyboardBackspaceIcon/> Continue Shopping
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div className='col-md-4 cartRightBox'>
                            <div className='card p-4 '>
                                <div className='d-flex align-items-center mb-4'>
                                    <h5 className='mb-0 text-light'>Subtotal</h5>
                                    <h3 className='ml-auto mb-0 font-weight-bold'>
                                        <span className='text-g'>{totalAmount}đ</span>
                                    </h3>
                                </div>

                                <div className='d-flex align-items-center mb-4'>
                                    <h5 className='mb-0 text-light'>Shipping</h5>
                                    <h3 className='ml-auto mb-0 font-weight-bold'><span>Free</span></h3>
                                </div>

                                <div className='d-flex align-items-center mb-4'>
                                    <h5 className='mb-0 text-light'>Estimate for</h5>
                                    <h3 className='ml-auto mb-0 font-weight-bold'>Hà Nội</h3>
                                </div>

                                <div className='d-flex align-items-center mb-4'>
                                    <h5 className='mb-0 text-light'>Total</h5>
                                    <h3 className='ml-auto mb-0 font-weight-bold'>
                                        <span className='text-g'>{totalAmount}đ</span>
                                    </h3>
                                </div>

                                <br/>
                                <Button className='btn-g btn-lg' onClick={handleCheckout}>
                                    Proceed To CheckOut
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Cart;
