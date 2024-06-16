import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Button, Backdrop, CircularProgress } from '@mui/material';
import GoogleImg from '../../assets/images/google.png';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from '../../firebase';
import { UserContext } from '../../context/UserContext';
import './style.css';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const { user, signIn: setUserContext } = useContext(UserContext);
    const [formFields, setFormFields] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const onChangeField = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormFields((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const signIn = async () => {
        if (formFields.email !== "" && formFields.password !== "") {
            setShowLoader(true);
            try {
                const response = await fetch('http://localhost:5000/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formFields),
                });

                const data = await response.json();

                if (response.ok) {
                    const jwtToken = data.access_token;
                    localStorage.setItem('jwtToken', jwtToken);
                    setShowLoader(false);
                    localStorage.setItem('isLogin', true);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    setUserContext(data.user); // Cập nhật context
                    navigate('/');
                } else {
                    alert(data.message);
                    setShowLoader(false);
                }
            } catch (error) {
                console.error('Error:', error);
                setShowLoader(false);
                alert('An error occurred. Please try again.');
            }
        } else {
            alert("Please fill all the details");
        }
    };

    const signInWithGoogle = async () => {
        setShowLoader(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const token = await result.user.getIdToken();
            const response = await fetch('http://localhost:5000/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });

            const data = await response.json();
            if (response.ok) {
                const jwtToken = data.access_token;
                localStorage.setItem('jwtToken', jwtToken);
                setShowLoader(false);
                localStorage.setItem('isLogin', true);
                localStorage.setItem('user', JSON.stringify(data.user));
                setUserContext(data); // Cập nhật context
                navigate('/');
            } else {
                alert(data.message);
                setShowLoader(false);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
            setShowLoader(false);
        }
    };

    return (
        <section className='signIn mb-5'>
            <div className="breadcrumbWrapper">
                <div className="container-fluid">
                    <ul className="breadcrumb breadcrumb2 mb-0">
                        <li><Link to="/">Home</Link></li>
                        <li>Sign In</li>
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

                    <h3>Sign In</h3>
                    <form className='mt-4'>
                        <div className='form-group mb-4 w-100'>
                            <TextField id="email" type="email" name='email' label="Email" className='w-100'
                                       onChange={onChangeField} value={formFields.email} />
                        </div>
                        <div className='form-group mb-4 w-100'>
                            <div className='position-relative'>
                                <TextField id="password" type={showPassword ? 'text' : 'password'} name='password'
                                           label="Password" className='w-100'
                                           onChange={onChangeField} value={formFields.password} />
                                <Button className='icon' onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                </Button>
                            </div>
                        </div>

                        <div className='form-group mt-5 mb-4 w-100'>
                            <Button className='btn btn-g btn-lg w-100' onClick={signIn}>Sign In</Button>
                        </div>

                        <div className='form-group mt-5 mb-4 w-100 signInOr'>
                            <p className='text-center'>OR</p>
                            <Button className='w-100' variant="outlined" onClick={signInWithGoogle}>
                                <img src={GoogleImg} alt="Google Logo" />
                                Sign In with Google
                            </Button>
                        </div>

                        <p className='text-center'>Not have an account
                            <b> <Link to="/signup">Sign Up</Link>
                            </b>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default SignIn;
