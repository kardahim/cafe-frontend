import { Box, Divider } from '@mui/material'
import React, { useState } from 'react'
import { ReportsTabInterface } from '../../../interfaces/ReportsTabInterface'
import MonthSalesChart from '../../charts/monthSalesChart/MonthSalesChart'
import './ReportsTab.scss'
import dayjs from 'dayjs'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function ReportsTab(props: ReportsTabInterface) {

    const [year, setYear] = useState(dayjs())

    const subtractYear = () => {
        setYear(year.subtract(1, 'year'))
    }
    const addYear = () => {
        setYear(year.add(1, 'year'))
    }

    // TODO: add generate csv/pdf
    return (
        <Box className='reports_tab'>
            <Divider className='reports_tab__divider'>
                <ArrowBackIcon onClick={() => subtractYear()} className='reports_tab__button' />
                <span className='reports_tab__divider__text'>Przychód na rok {year.format('YYYY')}</span>
                <ArrowForwardIcon onClick={() => addYear()} className='reports_tab__button' />
            </Divider>
            <MonthSalesChart
                orders={props.orders}
                year={year.get('year')} />
        </Box>
    )
}

export default ReportsTab