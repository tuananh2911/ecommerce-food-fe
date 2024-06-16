import React, {useState, useEffect, useContext} from 'react';
import {Button, TextField, Box, Grid, Typography, Card, CardContent} from '@mui/material';
import {useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';
import {UserContext} from "../../context/UserContext";

const Checkout = (props) => {
    const location = useLocation();
    const {cartItems, cartTotalAmount} = location.state;
    const { user } = useContext(UserContext);
    const [formFields, setFormFields] = useState({
        houseNumber: '',
        district: '',
        city: '',
        phoneNumber: '',
    });

    const navigate = useNavigate();

    const placeOrder = async () => {
        if (Object.values(formFields).some(field => field === "")) {
            alert("All fields are required");
            return false;
        }

        const address = `${formFields.houseNumber}, ${formFields.district}, ${formFields.city}`;

        for (const cartItem of cartItems) {
            for (const item of cartItem.products) {
                const orderInfo = {
                    customerId: user.id,
                    status: 'Pending',
                    address: address,
                    price: item.price,
                    phoneNumber: formFields.phoneNumber,
                    productId: item.id,
                    vendorId: item.vendorId,
                    // shipmentId: '',
                    cartId: cartItem.id,
                    quantity:item.quantity
                };

                try {
                    const response = await axios.post('http://localhost:5000/api/orders', orderInfo);
                    if (response.status !== 201) {
                        alert('Failed to place order for item ' + item.name + '. Please try again.');
                        return;
                    }

                } catch (error) {
                    console.error('Error placing order:', error);
                    alert('Failed to place order for item ' + item.name + '. Please try again.');
                    return;
                }
            }
        }
        navigate('/order-tracking');
    };

    const changeInput = (e) => {
        const {name, value} = e.target;
        setFormFields({...formFields, [name]: value});
    };

    return (
        <Box sx={{flexGrow: 1, padding: '3rem'}}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                    <Typography variant="h4" gutterBottom>
                        Order Summary
                    </Typography>
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                        Check your items. And select a suitable shipping method.
                    </Typography>
                    <Box sx={{maxHeight: '60vh', overflowY: 'auto'}}>
                        {cartItems.map((cartItem, cartIndex) => (
                            cartItem.products.map((item, productIndex) => (
                                <Card sx={{mb: 2}} key={`cart-${cartIndex}-product-${productIndex}`}>
                                    <CardContent>
                                        <Grid container spacing={2}>
                                            <Grid item xs={4}>
                                                <img
                                                    src={item.image[0].url}
                                                    alt={item.name}
                                                    style={{width: '100%', borderRadius: 8}}
                                                />
                                            </Grid>
                                            <Grid item xs={8}>
                                                <Typography variant="body1" fontWeight="bold">
                                                    {item.name}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    {item.description}
                                                </Typography>
                                                <Typography variant="body1" fontWeight="bold">
                                                    {item.price.toLocaleString('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND'
                                                    })}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            ))
                        ))}
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Typography variant="h4" gutterBottom>
                        Payment Details
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                        Complete your order by providing your payment details.
                    </Typography>


                    <TextField
                        label="House Number"
                        name="houseNumber"
                        fullWidth
                        margin="normal"
                        onChange={changeInput}
                    />
                    <TextField
                        label="District"
                        name="district"
                        fullWidth
                        margin="normal"
                        onChange={changeInput}
                    />
                    <TextField
                        label="City"
                        name="city"
                        fullWidth
                        margin="normal"
                        onChange={changeInput}
                    />
                    <TextField
                        label="Phone number"
                        name="phoneNumber"
                        fullWidth
                        margin="normal"
                        onChange={changeInput}
                    />
                    <Box mt={4}>
                        <Typography variant="h6">
                            Subtotal: {cartTotalAmount.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}
                        </Typography>
                        <Typography variant="h6">
                            Shipping: {(0.00).toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}
                        </Typography>
                        <Typography variant="h5">
                            Total: {(cartTotalAmount + 0).toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            mt: 3,
                            backgroundColor: 'black',
                            height: '48px',
                            color: 'white',
                            '&:hover': {backgroundColor: 'darkgray'}
                        }}
                        onClick={placeOrder}
                    >
                        Place Order
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Checkout;
