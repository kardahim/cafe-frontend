import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Container } from '@mui/material';
import './MonthSalesChart.scss'
import dayjs from 'dayjs';
import 'dayjs/locale/pl';

function MonthSalesChart(props: { orders: any[], year: number }) {
    dayjs.locale('pl')

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Tooltip,
        Legend
    );

    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

    const data = {
        labels: months.map(month => dayjs().month(month - 1).format('MMMM')),
        datasets: [{
            label: 'Przychód',
            data: months.map(month => {
                let total = 0

                props.orders.map(order => {
                    if (month === (order.OrderStatusId === 2 && dayjs(order.createdAt).get('month') + 1) && props.year === dayjs(order.createdAt).get('year'))
                        total += order.finalPrice
                })
                return total
            }),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgb(255, 99, 132)',
            ],
            borderWidth: 1
        }]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    }

    return (
        <Container className='month_sales_chart' >
            <Bar data={data} options={options} />
        </Container >
    )
}

export default MonthSalesChart