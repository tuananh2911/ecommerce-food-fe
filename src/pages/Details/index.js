import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import Slider from 'react-slick';
import { Button } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

import Product from '../../components/product';
import axios from 'axios';
import { MyContext } from '../../App';

const DetailsPage = (props) => {
    const { productData } = useContext(MyContext);
    console.log('productDaât',MyContext)
    const [currentProduct, setCurrentProduct] = useState({});
    const [isAdded, setIsAdded] = useState(false);
    const context = useContext(MyContext);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [reviewsArr, setReviewsArr] = useState([]);
    const [isAlreadyAddedInCart, setIsAlreadyAddedInCart] = useState(false);
    const [reviewFields, setReviewFields] = useState({
        review: '',
        userName: '',
        rating: 0.0,
        productId: 0,
        date: '',
    });

    const zoomSliderBig = useRef();
    const zoomSlider = useRef();

    let { id } = useParams();

    var settings2 = {
        dots: false,
        infinite: false,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: false,
        arrows: false,
    };

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4, // Giảm số lượng hình ảnh hiển thị
        slidesToScroll: 1,
        fade: false,
        arrows: context.windowWidth > 992 ? true : false,
    };

    var related = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        fade: false,
        arrows: context.windowWidth > 992 ? true : false,
    };

    const goto = (index) => {
        zoomSlider.current.slickGoTo(index);
        zoomSliderBig.current.slickGoTo(index);
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        const currentProductData = productData.find(
            (product) => product.id === parseInt(id)
        );
        if (currentProductData) {
            setCurrentProduct(currentProductData);
        }

        const related_products = productData.filter(
            (product) =>
                product.categoryId === currentProductData.categoryId &&
                product.id !== parseInt(id)
        );
        setRelatedProducts(related_products);

        showReviews();
        getCartData('http://localhost:5000/api/carts');
    }, [id, productData]);

    const changeInput = (name, value) => {
        if (name === 'rating') {
            setReviewFields((prevState) => ({
                ...prevState,
                rating: value,
            }));
        } else {
            setReviewFields((prevState) => ({
                ...prevState,
                [name]: value,
                productId: id,
                date: new Date().toLocaleString(),
            }));
        }
    };

    const submitReview = async (e) => {
        e.preventDefault();

        try {
            await axios
                .post('http://localhost:5000/api/productReviews', reviewFields)
                .then((response) => {
                    setReviewFields({
                        review: '',
                        userName: '',
                        rating: 0.0,
                        productId: 0,
                        date: '',
                    });
                });
        } catch (error) {
            console.log(error.message);
        }

        showReviews();
    };

    const showReviews = async () => {
        try {
            await axios.get('http://localhost:5000/api/productReviews').then((response) => {
                const productReviews = response.data.filter(
                    (review) => review.productId === parseInt(id)
                );
                setReviewsArr(productReviews);
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    const addToCart = (item) => {
        context.addToCart(item);
        setIsAdded(true);
    };

    const getCartData = async (url) => {
        try {
            await axios.get(url).then((response) => {
                const isProductInCart = response.data.some(
                    (item) => item.id === parseInt(id)
                );
                setIsAlreadyAddedInCart(isProductInCart);
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            {context.windowWidth < 992 && (
                <Button
                    className={`btn-g btn-lg w-100 filterBtn ${
                        isAlreadyAddedInCart && 'no-click'
                    }`}
                    onClick={() => addToCart(currentProduct)}
                >
                    <ShoppingCartOutlinedIcon />
                    {isAdded || isAlreadyAddedInCart ? 'Added' : 'Add To Cart'}
                </Button>
            )}

            <section className="detailsPage mb-5">
                {/* Breadcrumb */}
                {/* ... */}

                <div className="container detailsContainer pt-3 pb-3">
                    <div className="row">
                        {/* Product Zoom */}
                        <div className="col-md-5">
                            <div className="productZoom" style={{height: '600px'}}>
                                <Slider {...settings2} className="zoomSliderBig" ref={zoomSliderBig}>
                                    {currentProduct.image &&
                                        currentProduct.image.map((img, index) => (
                                            <div className="item" key={index}>
                                                <InnerImageZoom
                                                    src={img.url}
                                                    zoomSrc={img.url}
                                                    zoomType="hover"
                                                    zoomPreload={true}
                                                    zoomScale={1.5}
                                                    className="zoom-image"
                                                />
                                            </div>
                                        ))}
                                </Slider>
                            </div>

                            <Slider {...settings} className="zoomSlider" ref={zoomSlider}>
                                {currentProduct.image &&
                                    currentProduct.image.map((img, index) => (
                                        <div className="item" key={index}>
                                            <img
                                                src={img.url}
                                                className="w-100 thumbnail"
                                                onClick={() => goto(index)}
                                                alt={currentProduct.name}
                                                style={{ width: '150px', height: '150px', objectFit: 'cover' }} // Tăng kích thước thumbnail
                                            />
                                        </div>
                                    ))}
                            </Slider>
                        </div>

                        {/* Product Info */}
                        <div className="col-md-7 productInfo">
                            <h1>{currentProduct.name}</h1>
                            <div className="d-flex align-items-center mb-4 mt-3">
                                <Rating
                                    name="half-rating-read"
                                    value={
                                        currentProduct.reviews
                                            ? currentProduct.reviews.reduce(
                                            (sum, review) => sum + review.rating,
                                            0
                                        ) / currentProduct.reviews.length
                                            : 0
                                    }
                                    precision={0.5}
                                    readOnly
                                />
                                <span className="text-light ml-2">
                  ({currentProduct.reviews ? currentProduct.reviews.length : 0}{' '}
                                    reviews)
                </span>
                            </div>

                            <div className="priceSec d-flex align-items-center mb-3">
                <span className="text-g priceLarge">
                  {currentProduct.price}đ
                </span>
                                <div className="ml-3 d-flex flex-column">
                  <span className="text-org">
                    {(currentProduct.discount * 100).toFixed(0)}% Off
                  </span>
                                    <span className="text-light oldPrice">
                    {currentProduct.originalPrice}đ
                  </span>
                                </div>
                            </div>

                            <p>{currentProduct.description}</p>

                            {/* Product Size/Weight */}
                            {/* ... */}

                            <div className="d-flex align-items-center">
                                <div className="d-flex align-items-center">
                                    {context.windowWidth > 992 && (
                                        <Button
                                            className={`btn-g btn-lg addtocartbtn ${
                                                isAlreadyAddedInCart && 'no-click'
                                            }`}
                                            onClick={() => addToCart(currentProduct)}
                                        >
                                            <ShoppingCartOutlinedIcon />
                                            {isAdded || isAlreadyAddedInCart ? 'Added' : 'Add To Cart'}
                                        </Button>
                                    )}
                                    <Button className="btn-lg addtocartbtn ml-3 wishlist btn-border">
                                        <FavoriteBorderOutlinedIcon />
                                    </Button>
                                    <Button className="btn-lg addtocartbtn ml-3 btn-border">
                                        <CompareArrowsIcon />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Tabs */}
                    <div className="card mt-5 p-5 detailsPageTabs">
                        {/* ... */}
                    </div>

                    <br />

                    {/* Related Products */}
                    <div className="relatedProducts homeProductsRow2 pt-5 pb-4">
                        <h2 className="hd mb-0 mt-0">Related products</h2>
                        <br className="res-hide" />
                        <Slider {...related} className="prodSlider">
                            {relatedProducts.length !== 0 &&
                                relatedProducts.map((product, index) => (
                                    <div className="item" key={index}>
                                        <Product tag={product.type} item={product} />
                                    </div>
                                ))}
                        </Slider>
                    </div>
                </div>
            </section>

            <style jsx>{`
        .zoom-image {
            max-width: 100%;
            max-height: 500px;
            object-fit: contain;
        }

        .thumbnail {
          cursor: pointer;
        }
      `}</style>
        </>
    );
};

export default DetailsPage;