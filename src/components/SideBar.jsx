import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Button } from "@mui/material";
import { Home, People, AccountBalance, History, ExitToApp } from "@mui/icons-material"; // Icono de Logout
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Eliminar el token del almacenamiento local
    navigate('/'); // Redirigir a la página de inicio de sesión
  };

  return (
    <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/user-management">
          <ListItemIcon>
            <People />
          </ListItemIcon>
          <ListItemText primary="User Management" />
        </ListItem>
        <ListItem button component={Link} to="/account-management">
          <ListItemIcon>
            <AccountBalance />
          </ListItemIcon>
          <ListItemText primary="Account Management" />
        </ListItem>
        <ListItem button component={Link} to="/audit-logs">
          <ListItemIcon>
            <History />
          </ListItemIcon>
          <ListItemText primary="Audit & Logs" />
        </ListItem>
        {/* Botón de Logout */}
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
