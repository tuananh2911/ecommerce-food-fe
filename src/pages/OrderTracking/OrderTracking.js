import React, { useContext, useEffect, useState } from 'react';
import { Typography, Button, Grid, Box, Paper, Tabs, Tab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext'; // Đảm bảo đường dẫn đúng với nơi bạn lưu UserContext
import './OrderTracking.css';
import useApi from "../../api";

const OrderTracking = () => {
    const [orders, setOrders] = useState([]);
    const [tabValue, setTabValue] = useState(0);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const { getOrders } = useApi();

    useEffect(() => {
        if (!user) {
            navigate('/signIn');
        } else {
            const fetchOrders = async () => {
                const ordersData = await getOrders(user.id);
                setOrders(ordersData);
            };

            fetchOrders();
        }
    }, [user]);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const filteredOrders = (status) => {
        if (status === 'All') {
            return orders;
        }
        return orders.filter(order => order.status === status);
    };

    const getStatusLabel = (value) => {
        switch (value) {
            case 0:
                return 'All';
            case 1:
                return 'Pending';
            case 2:
                return 'Transport';
            case 3:
                return 'Done';
            default:
                return 'All';
        }
    };

    return (
        <Box className="order-tracking-container">
            <Typography variant="h4" gutterBottom>
                Theo Dõi Đơn Hàng
            </Typography>
            <Tabs value={tabValue} onChange={handleChange} centered>
                <Tab label="All" />
                <Tab label="Pending" />
                <Tab label="Transport" />
                <Tab label="Done" />
            </Tabs>
            <Grid container spacing={3}>
                {filteredOrders(getStatusLabel(tabValue)).map((order) => (
                    <Grid item xs={12} key={order.id}>
                        <Paper className="order-card">
                            <Box display="contents" alignItems="center" width="100%">
                                <img src={order?.product?.image[0]?.url} alt={order.product.name} className="product-image" />
                                <Box className="order-details">
                                    <Typography variant="body2">ID đơn hàng: #{order.id}</Typography>
                                    <Typography variant="h1" style={{ fontSize: '40px', fontWeight: 'bold' }}>{order.product.name}</Typography>
                                    <Typography variant="h1" style={{ fontWeight: 'bold' }}>x{order.quantity}</Typography>
                                    <Typography className="shop-name">{order.vendor.name}</Typography>
                                    <Typography variant="body2">{order.status}</Typography>
                                </Box>
                                <Box className="action-buttons">
                                    <Typography variant="body1" className="total-amount">
                                        Thành tiền: ₫{order.totalPrice.toLocaleString()}
                                    </Typography>
                                    <Button variant="contained" color="primary" className="action-button">
                                        Mua Lại
                                    </Button>
                                    <Button variant="outlined" className="action-button">
                                        Liên Hệ Người Bán
                                    </Button>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default OrderTracking;
