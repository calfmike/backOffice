import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import api from '../services/api';
import Sidebar from '../components/SideBar';

const AccountManagement = () => {
    const [accounts, setAccounts] = useState([]);
    const [open, setOpen] = useState(false);
    const [newAccount, setNewAccount] = useState({ accountType: '' });
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        try {
            const response = await api.get('/accounts/user-accounts'); // Endpoint correcto
            setAccounts(response.data);
        } catch (error) {
            console.error('Error fetching accounts:', error);
        }
    };

    const handleCreate = async () => {
        try {
            await api.post('/accounts/create', newAccount); // Endpoint correcto
            setOpen(false);
            fetchAccounts();
        } catch (error) {
            console.error('Error creating account:', error);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await api.get(`/accounts/search?username=${searchTerm}`); // Suponiendo que tienes este endpoint de búsqueda
            setAccounts(response.data);
        } catch (error) {
            console.error('Error searching accounts:', error);
        }
    };

    return (
        <Container maxWidth="lg">
            <Sidebar/>
            <Typography variant="h4" gutterBottom>Gestión de Cuentas</Typography>
            <TextField 
                label="Buscar cuenta por nombre de usuario" 
                variant="outlined" 
                fullWidth 
                margin="normal" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <Button variant="contained" color="primary" onClick={handleSearch}>Buscar</Button>
            <Button variant="contained" color="secondary" onClick={() => setOpen(true)} style={{ marginLeft: '1rem' }}>Añadir Cuenta</Button>
            <Paper sx={{ mt: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Numero de Cuenta</TableCell>
                            <TableCell>Tipo de Cuenta</TableCell>
                            <TableCell>Balance</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accounts.map((account) => (
                            <TableRow key={account._id}>
                                <TableCell>{account.accountNumber}</TableCell>
                                <TableCell>{account.accountType}</TableCell>
                                <TableCell>{account.balance}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Añadir Cuenta</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Tipo de Cuenta"
                        fullWidth
                        value={newAccount.accountType}
                        onChange={(e) => setNewAccount({ ...newAccount, accountType: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancelar</Button>
                    <Button onClick={handleCreate} color="primary">Crear</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default AccountManagement;
