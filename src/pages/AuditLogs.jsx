import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import api from '../services/api';
import Sidebar from '../components/SideBar';

const AuditLogs = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetchAuditLogs();
    }, []);

    const fetchAuditLogs = async () => {
        try {
            const response = await api.get('/audit/logs');
            setLogs(response.data);
        } catch (error) {
            console.error('Error fetching audit logs:', error);
        }
    };

    return (
        <Container maxWidth="lg">
            <Sidebar/>
            <Typography variant="h4" gutterBottom>Audit Logs</Typography>
            <Paper sx={{ mt: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Action</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>User ID</TableCell>
                            <TableCell>Acc ID</TableCell>
                            <TableCell>From</TableCell>
                            <TableCell>TO</TableCell>
                            <TableCell>Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {logs.map((log) => (
                            <TableRow key={log._id}>
                                <TableCell>{log._id}</TableCell>
                                <TableCell>{log.action}</TableCell>
                                <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                                <TableCell>{log.metadata?.userId || 'N/A'}</TableCell>
                                <TableCell>{log.metadata?.accountId || 'N/A'}</TableCell>
                                <TableCell>{log.metadata?.fromAccountId || 'N/A'}</TableCell>
                                <TableCell>{log.metadata?.toAccountId || 'N/A'}</TableCell>
                                <TableCell>{log.metadata?.amount || 'N/A'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Container>
    );
};

export default AuditLogs;
