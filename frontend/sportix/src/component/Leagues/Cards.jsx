import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
export default function InteractiveList() {
  const [cric, setCric] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    
    <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose} // Close the dropdown menu
      >
        <MenuItem onClick={handleClose}>
          <Link to="/AddLeagues" style={{ textDecoration: "none" }}>
            Register Cricket League
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/FutsalLeagues" style={{ textDecoration: "none" }}>
            Register Futsal League
          </Link>
        </MenuItem>
      </Menu>


  );
}
