import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import api from '../services/api';
import Sidebar from '../components/SideBar';

const UserManagement = () => {
    const [users, setUsers] = useState([]); // Estado para almacenar todos los usuarios
    const [filteredUsers, setFilteredUsers] = useState([]); // Estado para almacenar usuarios filtrados
    const [open, setOpen] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [password, setPassword] = useState('');
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const currentUserId = localStorage.getItem('userId');

    useEffect(() => {
        fetchUsers(); // Cargar todos los usuarios al inicio
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get('/users'); // Hacer la llamada a la API una vez
            setUsers(response.data);
            setFilteredUsers(response.data); // Inicialmente, todos los usuarios están filtrados
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        // Filtrar usuarios en función del término de búsqueda
        const results = users.filter(user =>
            user.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(results);
    }, [searchTerm, users]); // Actualizar cuando cambie el término de búsqueda o la lista de usuarios

    const handleEdit = (user) => {
        setEditUser(user);
        setPassword(''); 
        setIsEditing(true); 
        setOpen(true);
    };

    const handleAddUser = () => {
        setEditUser(null);
        setPassword(''); 
        setIsEditing(false); 
        setOpen(true);
    };

    const handleSave = async () => {
        try {
            if (isEditing) {
                await api.put(`/users/${editUser._id}`, { ...editUser });
            } else {
                await api.post('/auth/register', { ...editUser, password });
            }
            setOpen(false);
            fetchUsers(); // Refrescar la lista de usuarios después de guardar
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    const handleDelete = async (id) => {
        if (id === currentUserId) {
            setConfirmationMessage('Cannot delete the user logged in.');
            setConfirmationOpen(true);
            return;
        }
        try {
            await api.delete(`/users/${id}`);
            setConfirmationMessage('User deleted successfully'); // Establecer el mensaje de confirmación
            setConfirmationOpen(true); // Mostrar el modal de confirmación
            fetchUsers(); // Refrescar la lista de usuarios después de eliminar
        } catch (error) {
            console.error('Error deleting user:', error);
            setConfirmationMessage('There was an issue deleting the user');
            setConfirmationOpen(true); // Mostrar el modal de error
        }
    };

    return (
        <Container maxWidth="lg">
            <Sidebar/>
            <Typography variant="h4" gutterBottom>User Mangement</Typography>
            <TextField 
                label="Search user by name" 
                variant="outlined" 
                fullWidth 
                margin="normal" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} // Actualizar término de búsqueda
            />
            <Button variant="contained" color="secondary" onClick={handleAddUser} style={{ marginLeft: '1rem' }}>Add User</Button>
            <Paper sx={{ mt: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.map((user) => ( // Renderizamos los usuarios filtrados
                            <TableRow key={user._id}>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleEdit(user)}>Edit</Button>
                                    <Button onClick={() => handleDelete(user._id)} style={{ marginLeft: '1rem' }}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{isEditing ? 'Edit User' : 'Add User'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Username"
                        fullWidth
                        value={editUser?.username || ''}
                        onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        fullWidth
                        value={editUser?.email || ''}
                        onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Role"
                        fullWidth
                        value={editUser?.role || ''}
                        onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                    />
                    {!isEditing && ( 
                        <TextField
                            margin="dense"
                            label="Password"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSave} color="primary">Save</Button>
                </DialogActions>
            </Dialog>

            {/* Modal de confirmación */}
            <Dialog open={confirmationOpen} onClose={() => setConfirmationOpen(false)}>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                    <Typography>{confirmationMessage}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmationOpen(false)} color="primary">OK</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default UserManagement;
