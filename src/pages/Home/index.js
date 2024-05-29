import React, {useState, useEffect, useRef, useContext} from 'react';
import SliderBanner from './slider/index';
import CatSlider from '../../components/catSlider';
import Banners from '../../components/banners';
import './style.css';
import Product from '../../components/product';
import Banner4 from '../../assets/images/banner4.jpg';
import Slider from "react-slick";
import TopProducts from './TopProducts';
import {MyContext} from '../../App';

const Home = (props) => {

    const [prodData, setprodData] = useState(props.data)
    const [popularProducts, setpopularProducts] = useState([]);
    const [activeTab, setactiveTab] = useState();
    const [activeTabIndex, setactiveTabIndex] = useState(0);
    const [activeTabData, setActiveTabData] = useState([]);
    const [bestSells, setBestSells] = useState([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);

    const productRow = useRef();
    const context = useContext(MyContext);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,  // Always show navigation arrows
    };

    useEffect(() => {
        setprodData(props.data);
    }, [props.data]);

    useEffect(() => {

        if (prodData && prodData.length > 0) {
            const sortedProducts = [...prodData].sort((a, b) => b.purchaseCount - a.purchaseCount);
            const percentPopular = Math.floor(sortedProducts.length * 0.3);
            const topProducts = sortedProducts
            setpopularProducts(topProducts);
            setactiveTab(topProducts[0]);
        }
        window.scrollTo(0, 0);
    }, [prodData]);

    useEffect(() => {
        if (activeTab && prodData.length > 0) {
            const arr = prodData.map(product => ({...product, parentCatName: product.name, subCatName: product.name}));
            setActiveTabData(arr);
            setTimeout(() => {
                setIsLoadingProducts(false);
            }, 1000);
        }
    }, [activeTab, prodData]);

    useEffect(() => {
        const bestSellsArr = [];
        if (prodData.length > 0) {
            prodData.forEach((product) => {
                bestSellsArr.push(product);
            });
            setBestSells(bestSellsArr);
        }
    }, [prodData]);
    return (
        <div style={{display: 'block'}}>
            <SliderBanner/>
            <CatSlider data={prodData}/>

            <Banners/>


            <section className='homeProducts homeProductWrapper'>
                <div className='container-fluid'>
                    <div className='d-flex align-items-center homeProductsTitleWrap'>
                        <h2 className='hd mb-0 mt-0 res-full'>Popular Products</h2>
                        <ul className='list list-inline ml-auto filterTab mb-0 res-full'>
                            {


                                popularProducts.map((cat, index) => {
                                    return (
                                        <li className="list list-inline-item">
                                            <a className={`cursor text-capitalize 
                                                ${activeTabIndex === index ? 'act' : ''}`}
                                               onClick={() => {
                                                   setactiveTabIndex(index);
                                                   productRow.current.scrollLeft = 0;
                                                   setIsLoadingProducts(true);
                                               }}
                                            >
                                                {cat.name}
                                            </a>
                                        </li>
                                    )
                                })
                            }

                        </ul>
                    </div>


                    <div className={`productRow ${isLoadingProducts === true && 'loading'}`} ref={productRow}>

                        {
                            activeTabData.length !== 0 &&
                            activeTabData.map((item, index) => {
                                return (
                                    <div className='item' key={index}>

                                        <Product tag={item.name} item={item}/>
                                    </div>
                                )
                            })
                        }

                    </div>

                </div>
            </section>


            <section className='homeProducts homeProductsRow2 pt-0'>
                <div className='container-fluid'>
                    <div className='d-flex align-items-center'>
                        <h2 className='hd mb-0 mt-0'>Daily Best Sells</h2>

                    </div>

                    <br className='res-hide'/><br className='res-hide'/>
                    <div className='row'>
                        <div className='col-md-3 pr-5 res-hide'>
                            <a href="https://themepanthers.com/wp/nest/d1/product-category/deals-of-the-day/"><img
                                src={Banner4} className='w-100'/></a>
                        </div>

                        <div className='col-md-9'>
                            <Slider {...settings} className='prodSlider'>
                                {
                                    bestSells.length !== 0 &&
                                    bestSells.map((item, index) => {
                                        return (
                                            <div className='item' key={index}>
                                                <Product tag={item.name} item={item}/>
                                            </div>
                                        )
                                    })
                                }

                            </Slider>
                        </div>
                    </div>


                </div>
            </section>


        </div>
    )
}

export default Home;






