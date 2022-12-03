import React from 'react'
import { CategoriesTabInterface } from '../../../interfaces/CategoriesTabInterface';
import {
    DataGrid,
    GridColDef,
    plPL
} from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './CategoriesTab.scss'

function CategoriesTab(props: CategoriesTabInterface) {

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
            headerAlign: 'center',
            editable: true
        },
    ];
    const navigate = useNavigate()

    return (
        <Box className='categories_tab'>
            <Button className='categories_tab__button' onClick={() => navigate('/new-product')}>Dodaj produkt lub kategorię</Button>
            <DataGrid
                className='categories_tab__table'
                autoHeight
                rows={props.categories}
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

export default CategoriesTab