import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import GridViewIcon from '@mui/icons-material/GridView';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const mockCategories = [
  { id: 1, name: 'Điện tử', subcategories: [
    { id: 11, name: 'Tivi' },
    { id: 12, name: 'Âm thanh' },
    { id: 13, name: 'Điện lạnh' },
    { id: 14, name: 'Điện gia dụng' },
  ] },
  { id: 2, name: 'Thời trang', subcategories: [
    { id: 21, name: 'Quần áo nam' },
    { id: 22, name: 'Quần áo nữ' },
    { id: 23, name: 'Giày dép' },
    { id: 24, name: 'Phụ kiện' },
  ] },
  { id: 3, name: 'Làm đẹp', subcategories: [
    { id: 31, name: 'Chăm sóc da' },
    { id: 32, name: 'Trang điểm' },
    { id: 33, name: 'Nước hoa' },
  ] },
];

const CategoriesDropdown = () => {
  const [categories, setCategories] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [subMenuAnchorEl, setSubMenuAnchorEl] = useState(null);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    setCategories(mockCategories);
  }, []);

  const handleMenuOpen = (event, subcategories) => {
    setSubMenuAnchorEl(event.currentTarget);
    setSubCategories(subcategories);
  };

  const handleMenuClose = () => {
    setSubMenuAnchorEl(null);
  };

  const handleSubMenuClose = () => {
    setSubMenuAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="category-menu"
        aria-haspopup="true"
        onClick={(event) => setAnchorEl(event.currentTarget)}
        startIcon={<GridViewIcon />}
        endIcon={<KeyboardArrowDownIcon />}
        variant="contained"
      >
        Browse All Categories
      </Button>
      <Menu
        id="category-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {categories.map((category) => (
          <MenuItem
            key={category.id}
            onMouseEnter={(event) => handleMenuOpen(event, category.subcategories)}
            onMouseLeave={handleMenuClose}
          >
            {category.name}
          </MenuItem>
        ))}
      </Menu>
      <Menu
        id="subcategory-menu"
        anchorEl={subMenuAnchorEl}
        open={Boolean(subMenuAnchorEl)}
        onClose={handleSubMenuClose}
      >
        {subCategories.map((subcategory) => (
          <MenuItem key={subcategory.id} onClick={handleSubMenuClose}>
            {subcategory.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default CategoriesDropdown;
