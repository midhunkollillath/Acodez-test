import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  Typography,
  Box,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Sidebar() {
  const [open, setOpen] = useState(false);

  const toggleList = () => {
    setOpen(!open);
  };

  return (
    <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
      <Box sx={{ width: 240, p: 2 }}>
        <Typography variant="h6">Logoipsum</Typography>
      </Box>
      <List>
        <ListItem button onClick={toggleList}>
          <ListItemText primary="List Item" />
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          {['List item', 'List item', 'List item'].map((text, index) => (
            <ListItem button key={index}>
              <ListItemIcon>
                <StarIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </Collapse>
      </List>
    </Drawer>
  );
}

export default Sidebar;
