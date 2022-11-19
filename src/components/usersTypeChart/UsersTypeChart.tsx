import React from 'react'
import './UsersTypeChart.scss'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import { Doughnut } from 'react-chartjs-2';
import { Box } from '@mui/material';
import { Container } from '@mui/system';

function UsersTypeChart(props: { users: any[], roles: any[] }) {

    ChartJS.register(ArcElement, Tooltip, Legend);

    const data = {
        labels: ['klienci', 'administratorzy', 'pracownicy'],
        datasets: [
            {
                label: '# osoby',
                data: props.roles.map(role => props.users.filter(user => user.RoleId === role.id).length),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    }

    // klient administrator pracownik
    console.log(props.roles.map(role => role.name))
    // // 2 1 1
    console.log(props.roles.map(role => props.users.filter(user => user.RoleId === role.id).length))

    return (
        <Container className='users_type_chart' >
            <Doughnut data={data} options={options} />
        </Container >
    )
}

export default UsersTypeChart