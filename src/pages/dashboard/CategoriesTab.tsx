import React from 'react'
import { CategoriesTabInterface } from '../../interfaces/CategoriesTabInterface'
import {
    DataGrid,
    GridColDef,
    plPL
} from '@mui/x-data-grid';
import { Box } from '@mui/material';

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

    return (
        <Box>
            <DataGrid
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