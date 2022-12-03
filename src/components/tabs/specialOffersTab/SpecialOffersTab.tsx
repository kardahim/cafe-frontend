import React from 'react'
import { SpecialOffersTabInterface } from '../../../interfaces/SpecialOffersTabInterface';
import {
    DataGrid,
    GridColDef,
    GridPreProcessEditCellProps,
    plPL
} from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import './SpecialOffersTab.scss'
import { useNavigate } from 'react-router-dom';


function SpecialOffersTab(props: SpecialOffersTabInterface) {

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
            field: 'value',
            headerName: 'Wartość',
            flex: 1,
            type: 'number',
            align: 'center',
            headerAlign: 'center',
            // editable: true,
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                const hasError = params.props.value < 5 || params.props.value > 100
                return { ...params.props, error: hasError };
            },
            renderCell: params => `${params.row.value}%`,
        },
        {
            field: 'start_date',
            headerName: 'Data rozpoczęcia',
            flex: 1,
            type: 'date',
            align: 'center',
            headerAlign: 'center',
            // editable: true,
            renderCell: params => dayjs(params.row.start_date).format('DD.MM.YYYY'),
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                const hasError = (dayjs(params.props.value).add(1, 'day')).isBefore(dayjs()) || (dayjs(params.props.value).add(1, 'day')).isAfter(params.row.end_date)
                return { ...params.props, error: hasError };
            },
        },
        {
            field: 'end_date',
            headerName: 'Data zakończenia',
            flex: 1,
            type: 'date',
            align: 'center',
            headerAlign: 'center',
            // editable: true,
            renderCell: params => dayjs(params.row.end_date).format('DD.MM.YYYY'),
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                const hasError = (dayjs(params.props.value).subtract(1, 'day')).isBefore(dayjs(params.row.start_date))
                return { ...params.props, error: hasError };
            },
        },
        {
            field: 'ProductId',
            headerName: 'Kategoria',
            flex: 1,
            type: 'singleSelect',
            valueOptions: props.products.map(product => ({
                value: product.id,
                label: product.name
            })),
            align: 'center',
            headerAlign: 'center',
            // editable: true,
            renderCell: params => {
                const product = props.products.find((product) => product.id == params.row.ProductId)
                return (product.name)
            },
        },
    ];
    const navigate = useNavigate()

    return (
        <Box className='special_offers_tab'>
            <Button className='special_offers_tab__button' onClick={() => navigate('/new-special-offer')}>Dodaj promocję</Button>
            <DataGrid
                className='special_offers_tab__table'
                autoHeight
                rows={props.specialOffers}
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

export default SpecialOffersTab