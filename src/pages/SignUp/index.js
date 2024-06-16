import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Button } from '@mui/material';
import { useState } from 'react';
import GoogleImg from '../../assets/images/google.png';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [formFields, setFormFields] = useState({
        email: '',
        name: '',
        username: '',
        password: '',
        conformPassword: ''
    });

    const signUp = () => {
        if (formFields.email !== "" && formFields.password !== "" && formFields.conformPassword !== "") {
            if (formFields.password !== formFields.conformPassword) {
                alert("Mật khẩu không khớp");
                return;
            }
            setShowLoader(true);

            // Tạo payload để gửi đi
            const payload = {
                name: formFields.name,
                username: formFields.username,
                email: formFields.email,
                password: formFields.password,
            };

            // Gửi yêu cầu POST
            fetch("https://api.huycodelo.id.vn/api/customers/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
                .then(response => response.json())
                .then(data => {
                    setShowLoader(false);
                    if (data.statuscode === 200) {
                        // Giả sử API gửi trường 'success' để chỉ thành công
                        setFormFields({
                            username: '',
                            name: '',
                            email: '',
                            password: '',
                            conformPassword: ''
                        });
                        alert("Đăng ký thành công!");
                    } else {
                        alert(data.message || "Đăng ký thất bại");
                    }
                })
                .catch((error) => {
                    setShowLoader(false);
                    alert("Lỗi: " + error.message);
                });
        } else {
            alert("Vui lòng điền đầy đủ thông tin");
        }
    };

    const onChangeField = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormFields(() => ({
            ...formFields,
            [name]: value,
        }));
    };

    return (
        <>
            <section className='signIn mb-5'>
                <div className="breadcrumbWrapper res-hide">
                    <div className="container-fluid">
                        <ul className="breadcrumb breadcrumb2 mb-0">
                            <li><Link to="/">Trang Chủ</Link></li>
                            <li>Đăng Ký</li>
                        </ul>
                    </div>
                </div>

                <div className='loginWrapper'>
                    <div className='card shadow'>
                        <Backdrop
                            sx={{ color: '#000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={showLoader}
                            className="formLoader"
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>

                        <h3>Đăng Ký</h3>
                        <form className='mt-4'>
                            <div className='form-group mb-4 w-100'>
                                <TextField id="name" type="" name='name' label="Họ và tên" className='w-100' onChange={onChangeField} value={formFields.name} />
                            </div>
                            <div className='form-group mb-4 w-100'>
                                <TextField id="username" type="" name='username' label="Tên tài khoản" className='w-100' onChange={onChangeField} value={formFields.username} />
                            </div>
                            <div className='form-group mb-4 w-100'>
                                <TextField id="email" type="email" name='email' label="Email" className='w-100' onChange={onChangeField} value={formFields.email} />
                            </div>

                            <div className='form-group mb-4 w-100'>
                                <div className='position-relative'>
                                    <TextField id="password" type={showPassword === false ? 'password' : 'text'} name='password' label="Mật Khẩu" className='w-100' onChange={onChangeField} value={formFields.password} />
                                    <Button className='icon' onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword === false ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                                    </Button>
                                </div>
                            </div>

                            <div className='form-group mb-4 w-100'>
                                <div className='position-relative'>
                                    <TextField id="conformPassword" type={showPassword1 === false ? 'password' : 'text'} name='conformPassword' label="Xác Nhận Mật Khẩu" className='w-100' onChange={onChangeField} value={formFields.conformPassword} />
                                    <Button className='icon' onClick={() => setShowPassword1(!showPassword1)}>
                                        {showPassword1 === false ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                                    </Button>
                                </div>
                            </div>

                            <div className='form-group mt-5 mb-4 w-100'>
                                <Button className='btn btn-g btn-lg w-100' onClick={signUp}>Đăng Ký</Button>
                            </div>

                            <p className='text-center'>Đã có tài khoản?
                                <b><Link to="/signIn"> <span style={{marginLeft: '2px'}}>Đăng Nhập</span> </Link></b>
                            </p>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SignUp;
