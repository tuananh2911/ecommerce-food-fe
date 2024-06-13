import React, { useEffect, useRef, useState,useContext } from 'react';
import Slider from "react-slick";
import './style.css';
import { Link } from 'react-router-dom';

import { MyContext } from '../../App';
const CatSlider = (props) => {
    const [allData, setAllData] = useState(props.data);
    const [totalLength, setTotalLength] = useState([]);
    const context = useContext(MyContext);

    const [itemBg, setItemBg] = useState([
        '#fffceb',
        '#ecffec',
        '#feefea',
        '#fff3eb',
        '#fff3ff',
        '#f2fce4',
        '#feefea',
        '#fffceb',
        '#feefea',
        '#ecffec',
        '#feefea',
        '#fff3eb',
        '#fff3ff',
        '#f2fce4',
        '#feefea',
        '#fffceb',
        '#feefea',
        '#ecffec'
    ]);

    const slider = useRef();


    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 10,
        slidesToScroll: 1,
        fade: false,
        arrows: context.windowWidth>992 ? true : false,
        autoplay: context.windowWidth>992 ? 2000 : false,
        centerMode: context.windowWidth>992 ? true : false
    };


    var catLength = 0;
    var lengthArr = [];
    useEffect(() => {
        setAllData(props.data);
    }, [props.data]);

    useEffect(() => {
        allData.length !== 0 &&
            allData.map((item, index) => {
                catLength += allData.length
                lengthArr.push(catLength)
                catLength = 0;
            })
        const list = lengthArr.filter((item, index) => lengthArr.indexOf(item) === index);
        setTotalLength(list)
    }, []);
    return (
        <>
            <div className='catSliderSection'>
                <div className='container-fluid' ref={slider}>
                    <h2 className='hd'>Featured Categories</h2>
                    <Slider {...settings} className='cat_slider_Main' id="cat_slider_Main" >
                        {
                            allData.length !== 0 &&
                            allData.map((item, index) => {
                                return (
                                    <div className='item' key={index} >
                                        <Link to={`/cat/${item.name.toLowerCase()}`}>
                                            <div className='info' style={{ background: itemBg[index] }}>
                                                <img src={item.productAvatar} width="80" />
                                                <h5 className='text-capitalize mt-3'>{item.name}</h5>
                                                <p>{item.products.length} items</p>
                                            </div>
                                        </Link>

                                    </div>
                                )
                            })
                        }
                    </Slider>
                </div >
            </div >



        </>
    )
}

export default CatSlider;