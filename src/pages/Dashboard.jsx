import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import api from '../services/api';
import Sidebar from '../components/SideBar';

const Dashboard = () => {
    const [logData, setLogData] = useState([]);

    useEffect(() => {
        fetchLogData();
    }, []);

    const fetchLogData = async () => {
        try {
            const response = await api.get('/audit/logs');
            const groupedData = groupLogsByAction(response.data);
            setLogData(groupedData);
        } catch (error) {
            console.error('Error fetching log data:', error);
        }
    };

    const groupLogsByAction = (logs) => {
        const actionCounts = logs.reduce((acc, log) => {
            acc[log.action] = (acc[log.action] || 0) + 1;
            return acc;
        }, {});

        return Object.keys(actionCounts).map(action => ({
            name: action,
            value: actionCounts[action]
        }));
    };

    return (
        <Container maxWidth="lg">
            <Sidebar/>
            <Typography variant="h4" gutterBottom>Dashboard</Typography>
            <Paper sx={{ mt: 3, p: 2 }}>
                <Typography variant="h6" gutterBottom>Logs by Action</Typography>
                <PieChart width={400} height={400}>
                    <Pie
                        data={logData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                        {logData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </Paper>
        </Container>
    );
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; // Define your colors here

export default Dashboard;
