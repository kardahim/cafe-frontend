import React from 'react'
import {
    DataGrid,
    GridColDef,
    GridPreProcessEditCellProps,
    plPL
} from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import './CouponsTab.scss'
import { useNavigate } from 'react-router-dom';
import { CouponsTabInterface } from '../../../interfaces/CouponsTabInterface';


function CouponsTab(props: CouponsTabInterface) {

    dayjs.locale('pl')
    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            flex: 0,
            type: 'number',
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'name',
            headerName: 'Nazwa',
            flex: 1,
            type: 'string',
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'pointPrice',
            headerName: 'Punkty',
            flex: 1,
            type: 'number',
            align: 'center',
            headerAlign: 'center',
            editable: true,
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                const hasError = params.props.value < 0
                return { ...params.props, error: hasError };
            },
            // renderCell: params => `${params.row.value}%`,
        },
        {
            field: 'value',
            headerName: 'Wartość',
            flex: 1,
            type: 'number',
            align: 'center',
            headerAlign: 'center',
            editable: true,
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                const hasError = params.props.value < 5 || params.props.value > 100
                return { ...params.props, error: hasError };
            },
            renderCell: params => `${params.row.value}%`,
        },
        {
            field: 'ProductId',
            headerName: 'Produkt',
            flex: 1,
            type: 'singleSelect',
            valueOptions: props.products.map(product => ({
                value: product.id,
                label: product.name
            })),
            align: 'center',
            headerAlign: 'center',
            editable: true,
            renderCell: params => {
                const product = props.products.find((product) => product.id == params.row.ProductId)
                return (product.name)
            },
        },
        {
            field: 'isAvailable',
            headerName: 'Dostępny',
            flex: 1,
            type: 'boolean',
            align: 'center',
            editable: true,
            headerAlign: 'center'
        }
    ];
    const navigate = useNavigate()

    return (
        <Box className='coupons_tab'>
            <Button className='coupons_tab__button' onClick={() => navigate('/new-coupon')}>Dodaj Kupon</Button>
            <DataGrid
                className='coupons_tab__table'
                autoHeight
                rows={props.coupons}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                rowsPerPageOptions={[10]}
                experimentalFeatures={{ newEditingApi: true }}
                localeText={plPL.components.MuiDataGrid.defaultProps.localeText}
                processRowUpdate={(row) => props.update(row)}
                onProcessRowUpdateError={(error) => console.log(error.message)} />
        </Box>
    )
}

export default CouponsTab