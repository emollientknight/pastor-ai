import React, { Component } from 'react';
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import ChatIcon from "@mui/icons-material/Chat";
// import FavoriteIcon from '@mui/icons-material/Favorite';
import BookIcon from "@mui/icons-material/Book";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Paper } from "@mui/material";

class BottomBar  extends Component {
    state = {  } 
    render() { 
        return (
            <Box sx={{ width: 500 }}>
      <Paper sx={{ position: "fixed", bottom: 0, width: "100%" }} elevation={3}>
        <BottomNavigation
          showLabels
          onChange={(event, newValue) => {
            this.props.onChangePage(newValue);
          }}
        >
          <BottomNavigationAction label="Chat" icon={<ChatIcon />} />
          <BottomNavigationAction label="Bible" icon={<BookIcon />} />
          <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
        );
    }
}
 
export default BottomBar;

