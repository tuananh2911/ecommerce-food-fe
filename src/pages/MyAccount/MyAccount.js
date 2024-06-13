import React, { useState, useEffect, useContext } from 'react';
import { TextField, Radio, RadioGroup, FormControlLabel, FormControl, Button, Avatar, Typography, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './MyAccount.css';
import {UserContext} from "../../context/UserContext";

const MyAccount = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    console.log('user',user)
    const [username,setUsername] = useState(user?.username);
    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [phone, setPhone] = useState(user?.phone);
    const [gender, setGender] = useState('male');
    const [birthday, setBirthday] = useState({ day: 29, month: 11, year: 2002 });
    const [avatar, setAvatar] = useState('/path/to/avatar.jpg'); // Cập nhật đường dẫn đến ảnh avatar
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');


    useEffect(() => {
        if (!user) {
            navigate('/signIn');
        }

        setUsername(user?.username);
        setName(user?.name);
        setEmail(user?.username);
        setPhone(user?.phone);
        setGender(user?.gender);
    }, [user, navigate]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setBirthday(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic
        console.log({ name, email, phone, gender, birthday, password, newPassword, confirmNewPassword });
    };

    return (
        <Box className="account-container">
            <Typography variant="h3" gutterBottom>
                Hồ Sơ Của Tôi
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
                Quản lý thông tin hồ sơ để bảo mật tài khoản
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Tên đăng nhập"
                            value={username}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            label="Tên"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Email"
                            value={email}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <Typography variant="body2" color="primary" gutterBottom>
                            Thay Đổi
                        </Typography>
                        <TextField
                            label="Số điện thoại"
                            value={phone}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <Typography variant="body2" color="primary" gutterBottom>
                            Thay Đổi
                        </Typography>
                        <FormControl component="fieldset" margin="normal">
                            <Typography component="legend">Giới tính</Typography>
                            <RadioGroup row value={gender} onChange={(e) => setGender(e.target.value)}>
                                <FormControlLabel value="male" control={<Radio />} label="Nam" />
                                <FormControlLabel value="female" control={<Radio />} label="Nữ" />
                                <FormControlLabel value="other" control={<Radio />} label="Khác" />
                            </RadioGroup>
                        </FormControl>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <TextField
                                    label="Ngày sinh"
                                    name="day"
                                    value={birthday.day}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    select
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    {[...Array(31)].map((_, index) => (
                                        <option key={index + 1} value={index + 1}>
                                            {index + 1}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Tháng sinh"
                                    name="month"
                                    value={birthday.month}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    select
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    {[...Array(12)].map((_, index) => (
                                        <option key={index + 1} value={index + 1}>
                                            Tháng {index + 1}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Năm sinh"
                                    name="year"
                                    value={birthday.year}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    select
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    {[...Array(new Date().getFullYear() - 1900 + 1)].map((_, index) => (
                                        <option key={1900 + index} value={1900 + index}>
                                            {1900 + index}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                        <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
                            Đổi mật khẩu
                        </Typography>
                        <TextField
                            label="Mật khẩu hiện tại"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Mật khẩu mới"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Xác nhận mật khẩu mới"
                            type="password"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth margin="normal">
                            Lưu
                        </Button>
                    </form>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Avatar src={avatar} alt="Avatar" sx={{ width: 100, height: 100 }} />
                        <Button variant="outlined" component="label" fullWidth margin="normal">
                            Chọn Ảnh
                            <input type="file" hidden />
                        </Button>
                        <Typography variant="body2" color="textSecondary" align="center">
                            Dung lượng file tối đa 1 MB
                            <br />
                            Định dạng: .JPEG, .PNG
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default MyAccount;
