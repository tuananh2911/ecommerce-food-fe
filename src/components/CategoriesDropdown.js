import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import GridViewIcon from '@mui/icons-material/GridView';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
const mockCategories = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Clothing' },
    { id: 3, name: 'Home & Garden' },
    { id: 4, name: 'Beauty & Personal Care' },
    { id: 5, name: 'Sports & Outdoors' },
];
const CategoriesDropdown = () => {
    const [categories, setCategories] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // const response = await axios.get('/api/categories');
                console.log(mockCategories)
                setCategories(mockCategories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="relative">
            <Button
                aria-controls="categories-menu"
                aria-haspopup="true"
                onClick={handleClick}
                className="bg-green-500 text-green flex items-center"
            >
                <GridViewIcon /> &nbsp;Browse All Categories <KeyboardArrowDownIcon />
            </Button>
            <Menu
                id="categories-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                className="mt-2 w-64"
            >
                {categories.map((category) => (
                    <MenuItem key={category.id} onClick={handleClose}>
                        {category.name}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default CategoriesDropdown;