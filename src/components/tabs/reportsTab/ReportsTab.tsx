import { Box, Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ReportsTabInterface } from '../../../interfaces/ReportsTabInterface'
import MonthSalesChart from '../../charts/monthSalesChart/MonthSalesChart'
import './ReportsTab.scss'
import dayjs from 'dayjs'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { DataGrid, GridColDef, GridToolbar, plPL } from '@mui/x-data-grid'

function ReportsTab(props: ReportsTabInterface) {

    const [year, setYear] = useState(dayjs())

    const subtractYear = () => {
        setYear(year.subtract(1, 'year'))
    }
    const addYear = () => {
        setYear(year.add(1, 'year'))
    }

    const columns: GridColDef[] = [
        {
            field: 'updatedAt',
            headerName: 'Data',
            flex: 1,
            type: 'date',
            align: 'center',
            headerAlign: 'center',
            renderCell: params => {
                return dayjs(params.row.updatedAt).format('DD.MM.YYYY HH:mm:ss')
            }
        },
        {
            field: 'finalPrice',
            headerName: 'Przychód',
            flex: 1,
            type: 'number',
            align: 'center',
            headerAlign: 'center',
            renderCell: params => `${params.row.finalPrice}zł`,
        },
    ];

    return (
        <Box className='reports_tab'>
            <DataGrid
                components={{ Toolbar: GridToolbar }}
                className='reports_tab__table'
                autoHeight
                rows={props.orders.filter(order => order.OrderStatusId === 2)}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                rowsPerPageOptions={[10]}
                experimentalFeatures={{ newEditingApi: true }}
                localeText={plPL.components.MuiDataGrid.defaultProps.localeText}
            />
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