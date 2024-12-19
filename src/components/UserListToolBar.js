import { Box, Button, IconButton, TextField, Toolbar } from "@mui/material";
import React, { useState } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
 const  UserListToolBar=({ onFilterClick,onClickNew,handleSearchChange,searchTerm })=>{
    return (
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: 0, marginBottom: 2 }}>
        <Box display="flex" gap={2}>
          <TextField 
          label="Search"
           variant="outlined"
            size="small" 
            onChange={handleSearchChange}
            value={searchTerm}
            />
          <IconButton onClick={onFilterClick}>
            <FilterListIcon />
          </IconButton>
        </Box>
        <Button onClick={onClickNew} variant="contained" color="primary">New</Button>
      </Toolbar>
    );
  }

  export default UserListToolBar