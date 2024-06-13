import React, { useContext, useEffect, useState } from 'react';
import { Typography, Button, Grid, Box, Paper, Tabs, Tab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext'; // Đảm bảo đường dẫn đúng với nơi bạn lưu UserContext
import './OrderTracking.css';

const OrderTracking = () => {
    const [orders, setOrders] = useState([]);
    const [tabValue, setTabValue] = useState(0);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/signIn');
        } else {
            const fetchOrders = async () => {
                // Example orders data
                const ordersData = [
                    {
                        id: 1,
                        shopName: 'ScaseVN',
                        productName: 'Ốp điện thoại Google Pixel 3XL Dẻo Chống Shock Nhiều Màu Tuyển Tập 6 A602-CL6',
                        quantity: 1,
                        price: 39900,
                        status: 'Hoàn Thành',
                        deliveryStatus: 'Giao hàng thành công',
                        imageUrl: 'path/to/image.jpg',
                        returnPeriod: '15 ngày trả hàng',
                        totalAmount: 38400,
                    },
                    {
                        id: 2,
                        shopName: 'CECILA VN',
                        productName: 'Gối cao su non người lớn CECILA thiết kế lượn sóng, giúp giảm đau mỏi cổ vai gáy, hỗ trợ giấc ngủ ngon và sâu hơn',
                        quantity: 1,
                        price: 129000,
                        status: 'Hoàn Thành',
                        deliveryStatus: 'Đơn hàng đã được giao thành công',
                        imageUrl: 'path/to/image.jpg',
                        returnPeriod: '7 ngày trả hàng',
                        totalAmount: 104000,
                    },
                    {
                        id: 3,
                        shopName: 'TechStore',
                        productName: 'Laptop Dell XPS 13',
                        quantity: 1,
                        price: 25000000,
                        status: 'Vận Chuyển',
                        deliveryStatus: 'Đang giao hàng',
                        imageUrl: 'path/to/image.jpg',
                        returnPeriod: '30 ngày trả hàng',
                        totalAmount: 25000000,
                    }
                ];
                setOrders(ordersData);
            };

            fetchOrders();
        }
    }, [user, navigate]);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const filteredOrders = (status) => {
        if (status === 'Tất Cả') {
            return orders;
        }
        return orders.filter(order => order.status === status);
    };

    return (
        <Box className="order-tracking-container">
            <Typography variant="h4" gutterBottom>
                Theo Dõi Đơn Hàng
            </Typography>
            <Tabs value={tabValue} onChange={handleChange} centered>
                <Tab label="Tất Cả" />
                <Tab label="Vận Chuyển" />
                <Tab label="Hoàn Thành" />
            </Tabs>
            <Grid container spacing={3}>
                {filteredOrders(tabValue === 0 ? 'Tất Cả' : tabValue === 1 ? 'Vận Chuyển' : 'Hoàn Thành').map((order) => (
                    <Grid item xs={12} key={order.id}>
                        <Paper className="order-card">
                            <Box display="contents" alignItems="center"  width="100%">
                                <img src={order.imageUrl} alt={order.productName} className="product-image" />
                                <Box className="order-details">
                                    <Typography className="shop-name">{order.shopName}</Typography>
                                    <Typography variant="body1">{order.productName}</Typography>
                                    <Typography variant="body2">Phân loại hàng: #{order.id}</Typography>
                                    <Typography variant="body2">x{order.quantity}</Typography>
                                    <Typography variant="body2">{order.returnPeriod}</Typography>
                                    <Typography variant="body2">{order.deliveryStatus}</Typography>
                                    <Typography variant="body2">{order.status}</Typography>
                                </Box>
                                <Box className="action-buttons">
                                    <Typography variant="body1" className="total-amount">
                                        Thành tiền: ₫{order.totalAmount.toLocaleString()}
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
