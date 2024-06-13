import React, {useEffect, useContext, useState} from 'react';
import './nav.css';
import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GridViewIcon from '@mui/icons-material/GridView';
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';
import {MyContext} from '../../../App';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import KitchenIcon from '@mui/icons-material/Kitchen';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';

const Nav = (props) => {
    const [navData, setNavData] = useState([props.data]);
    const [isOpenNav, setIsOpenNav] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
    const [openMegaMenu, setOpenMegaMenu] = useState(false);

    const context = useContext(MyContext);

    useEffect(() => {
        setNavData(props.data);
    }, [props.data]);

    useEffect(() => {
        setIsOpenNav(props.openNav);
    }, [props.openNav]);

    const closeNav = () => {
        props.closeNav();
    };
    const toggleCategoryMenu = () => {
        setIsCategoryMenuOpen(!isCategoryMenuOpen);
    };

    const getCategoryIcon = (categoryName) => {
        switch (categoryName) {
            case 'wines & drinks':
                return <LocalBarIcon/>;
            case 'vegetables':
                return <FastfoodIcon/>;
            case 'milks and dairies':
                return <KitchenIcon/>;
            case 'fresh fruit':
                return <RestaurantIcon/>;
            case 'clothing & beauty':
                return <ShoppingBagIcon/>;
            case 'baking material':
                return <BakeryDiningIcon/>;
            default:
                return <FastfoodIcon/>;
        }
    };

    const splitIntoColumns = (data, itemsPerColumn) => {
        let result = [];
        for (let i = 0; i < data.length; i += itemsPerColumn) {
            result.push(data.slice(i, i + itemsPerColumn));
        }
        return result;
    };

    const columns = splitIntoColumns(navData, 3);

    return (
        <>
            {isOpenNav && <div className='navbarOverlay' onClick={props.closeNav}></div>}
            <div className={`nav d-flex align-items-center ${isOpenNav && 'click'}`}>
                <div className='container-fluid'>
                    <div className='row position-relative'>
                        <div className='col-sm-2 part1 d-flex align-items-center'>
                            <Button className='bg-g text-white catTab res-hide' onClick={toggleCategoryMenu}>
                                <GridViewIcon/> &nbsp;Browse All Categories <KeyboardArrowDownIcon/>
                            </Button>
                            {isCategoryMenuOpen && (
                                <div className='categoryMenu open'>
                                    {columns.map((column, columnIndex) => (
                                        <div className='categoryColumn' key={columnIndex}>
                                            <ul>
                                                {column.map((category, index) => (
                                                    <li key={index}>
                                                        <Link to={`/cat/${category.name}`}>
                                                            <span className='category-icon'>{getCategoryIcon(category.name)}</span>
                                                            <span className='category-name'>{category.name}</span>
                                                            <span className='category-count'>{category.products.length}</span>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className='col-sm-8 part2 position-static'>
                            <nav className={isOpenNav ? 'open' : ''}>
                                <ul className='list list-inline mb-0'>
                                    <li className='list-inline-item'>
                                        <Button><Link to={'/'} onClick={props.closeNav}>Home</Link></Button>
                                    </li>

                                    <li className='list-inline-item'>
                                        <Button onClick={props.closeNav}><Link>About</Link></Button>
                                    </li>
                                    <li className='list-inline-item position-static'>
                                        <Button onClick={() => setOpenMegaMenu(!openMegaMenu)}>
                                            <Link>Shop <KeyboardArrowDownIcon
                                                className={`${openMegaMenu && 'rotateIcon'}`}/></Link>
                                        </Button>
                                        <div className={`dropdown_menu megaMenu w-100 ${openMegaMenu && 'open'}`}>
                                            <div className='row'>
                                                {props.data.length !== 0 && props.data.map((item, index) => (
                                                    <div className='col' key={index}>
                                                        <a href={`/cat/${item.name}`}>
                                                            <h4 className='text-g text-capitalize'>{item.name}</h4>
                                                        </a>
                                                        <ul className='mt-4 mb-0'>

                                                            <li key={index}>
                                                                <Link onClick={props.closeNav}
                                                                      to={`/cat/${item.name}/${item.name}`}>
                                                                    {item.name}
                                                                </Link>
                                                            </li>

                                                        </ul>

                                                    </div>
                                                ))}
                                                <div className='col'>
                                                    <img
                                                        src="https://wp.alithemes.com/html/nest/demo/assets/imgs/banner/banner-menu.png"
                                                        className='w-100' alt="Menu Banner"/>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className='list-inline-item'>
                                        <Button><Link>Blog</Link></Button>
                                    </li>
                                    <li className='list-inline-item'>
                                        <Button><Link>Contact</Link></Button>
                                    </li>
                                </ul>
                                {windowWidth < 992 && context.isLogin !== "true" && (
                                    <div className='pl-3 pr-3'>
                                        <br/>
                                        <Link to={'/signIn'}>
                                            <Button className="btn btn-g btn-lg w-100" onClick={closeNav}>Sign
                                                In</Button>
                                        </Link>
                                    </div>
                                )}
                            </nav>
                        </div>

                        <div className='col-sm-2 part3 d-flex align-items-center'>
                            <div className='phNo d-flex align-items-center ml-auto'>
                                <span><HeadphonesOutlinedIcon/></span>
                                <div className='info ml-3'>
                                    <h3 className='text-g mb-0'>1900 - 888</h3>
                                    <p className='mb-0'>24/7 Support Center</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Nav;
