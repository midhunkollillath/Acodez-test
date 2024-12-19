import { Menu, MenuItem } from "@mui/material";
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
const UserMenu = ({ anchorEl,onEdit,onDelete, handleMenuClose, handleMenuOpen }) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={onEdit}>
      <EditIcon sx={{width:20,height:20}} />
      Edit
      </MenuItem>
      <MenuItem onClick={onDelete}>
       <DeleteIcon sx={{width:20,height:20}} />Delete</MenuItem>
    </Menu>
  );
};

export default UserMenu;  
