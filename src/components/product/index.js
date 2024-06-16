import React, { useEffect, useState, useContext } from 'react';
import './style.css';
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';


import { MyContext } from '../../App';


const Product = (props) => {

    const [productData, setProductData] = useState(props.item);
    const [isAdded, setIsadded] = useState(false);
    const context  = useContext(MyContext);
    let averageRating = 0
    if(productData?.reviews && productData?.reviews.length > 0){
        averageRating = productData.reviews.reduce((acc, review) => acc + review.rating, 0) / productData.reviews.length;
    }

    useEffect(() => {
        setProductData(props.item);

    }, [props.item])

    const setProductCat=()=>{
        sessionStorage.setItem('parentCat', productData.name);
        sessionStorage.setItem('subCatName', productData.name);
    }


    const addToCart=(item)=>{
        try {
            if(context.addToCart(item)){
                setIsadded(true);
            }else{
                alert('Item can not added to cart');
            }
        } catch (error) {
            console.log(error.message);
        }
        
    }

    return (
        <div className='productThumb' onClick={setProductCat}>
            {
                props.tag !== null && props.tag !== undefined &&
                <span className={`badge ${props.tag}`}>{props.tag}</span>
            }

            {
                <>
                    <Link to={`/product/${productData.id}`}>
                        <div className='imgWrapper'>
                            <div className='p-4 wrapper mb-3'>
                                <img src={productData.image[0]?.url} className='w-100'/>
                            </div>

                            <div className='overlay transition'>
                                <ul className='list list-inline mb-0'>
                                    <li className='list-inline-item'>
                                        <a className='cursor' tooltip="Add to Index">
                                            <FavoriteBorderOutlinedIcon/>
                                        </a>
                                    </li>
                                    <li className='list-inline-item'>
                                        <a className='cursor' tooltip="Compare">
                                            <CompareArrowsOutlinedIcon/>
                                        </a>
                                    </li>
                                    <li className='list-inline-item'>
                                        <a className='cursor' tooltip="Quick View">
                                            <RemoveRedEyeOutlinedIcon/>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </Link>

                    <div className='info'>
                        <span className='d-block catName'>{productData.brand.name}</span>
                        <h4 className='title'><Link>{productData.name}</Link></h4>
                        <Rating name="half-rating-read"
                                value={parseFloat(averageRating)} precision={0.5} readOnly/>
                        <span className='brand d-block text-g'>By <Link
                            className='text-g'>{productData.brand.name}</Link></span>

                        <div className='d-flex align-items-center mt-3'>
                            <div className='d-flex align-items-center w-100'>
                                <span className='price text-g font-weight-bold'>
                                    <span style={{fontSize: '16px'}}>đ </span>
                                    {productData.price}</span> <span className='oldPrice ml-auto'><span
                                style={{fontSize: '16px'}}>đ</span>{productData.price}</span>
                            </div>
                        </div>

                        <Button className='w-100 transition mt-3'
                                onClick={() => addToCart(productData)}><ShoppingCartOutlinedIcon/>
                            {
                                isAdded === true ? 'Added' : 'Add'
                            }
                        </Button>

                    </div>

                </>
            }
        </div>
    )
}

export default Product;