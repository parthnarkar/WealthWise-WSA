import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemText, ListItemIcon, IconButton } from "@mui/material";
import { Dashboard, AccountBalanceWallet, BarChart, Menu, ChevronLeft } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <motion.div initial={{ x: -100 }} animate={{ x: 0 }} transition={{ duration: 0.3 }}>
      {/* Toggle Button for Sidebar */}
      <IconButton onClick={() => setOpen(!open)} sx={{ position: "absolute", top: 10, left: open ? 220 : 10 }}>
        {open ? <ChevronLeft /> : <Menu />}
      </IconButton>

      <Drawer variant="permanent" open={open} sx={{ width: open ? 240 : 60, transition: "width 0.3s" }}>
        <List>
          <ListItem button component={Link} to="/dashboard">
            <ListItemIcon><Dashboard /></ListItemIcon>
            {open && <ListItemText primary="Dashboard" />}
          </ListItem>
          <ListItem button component={Link} to="/transactions">
            <ListItemIcon><AccountBalanceWallet /></ListItemIcon>
            {open && <ListItemText primary="Transactions" />}
          </ListItem>
          <ListItem button component={Link} to="/budget">
            <ListItemIcon><BarChart /></ListItemIcon>
            {open && <ListItemText primary="Budget" />}
          </ListItem>
        </List>
      </Drawer>
    </motion.div>
  );
};

export default Sidebar;
