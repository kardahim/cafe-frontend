import React from 'react'
import { ProductsTabInterface } from '../../interfaces/ProductsTabInterface'
import './ProductsTab.scss'
import { DataGrid, GridCellEditCommitParams, GridCellEditStopParams, GridCellEditStopReasons, GridColDef, GridPreProcessEditCellProps, GridValueGetterParams, MuiEvent, plPL } from '@mui/x-data-grid';
import { Box } from '@mui/material';



function ProductsTab(props: ProductsTabInterface) {

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
        {
            field: 'price',
            headerName: 'Cena',
            flex: 1,
            type: 'string',
            align: 'center',
            headerAlign: 'center',
            editable: true,
            renderCell: params => `${params.row.price}zł`,
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                const hasError = params.props.value < 0;
                return { ...params.props, error: hasError };
            },
        },
        {
            field: 'size',
            headerName: 'Rozmiar',
            flex: 1,
            type: 'string',
            align: 'center',
            headerAlign: 'center',
            editable: true,
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                const reg = /^[1-9][0-9]*(ml|gm){1}$/
                const hasError = !reg.test(params.props.value)
                return { ...params.props, error: hasError };
            },
        },
        {
            field: 'allergen',
            headerName: 'Allergen',
            flex: 1,
            type: 'string',
            align: 'center',
            headerAlign: 'center',
            editable: true,
            renderCell: params => (params.row.allergen === '' ? 'brak' : params.row.allergen)
        },
        {
            field: 'CategoryId',
            headerName: 'Kategoria',
            flex: 1,
            type: 'singleSelect',
            valueOptions: props.categories.map(category => ({
                value: category.id,
                label: category.name
            })),
            align: 'center',
            headerAlign: 'center',
            editable: true,
            renderCell: params => {
                const category = props.categories.find((category) => category.id == params.row.CategoryId)
                return (category.name)
            },
        },
        {
            field: 'ProductStatusId',
            headerName: 'Status',
            flex: 1,
            type: 'singleSelect',
            valueOptions: props.statuses.map(status => ({
                value: status.id,
                label: status.name
            })),
            align: 'center',
            headerAlign: 'center',
            editable: true,
            renderCell: params => {
                const status = props.statuses.find((status) => status.id == params.row.ProductStatusId)
                return (status.name)
            },
        }
    ];

    return (
        <Box>
            <DataGrid
                autoHeight
                rows={props.products}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                rowsPerPageOptions={[10]}
                experimentalFeatures={{ newEditingApi: true }}
                localeText={plPL.components.MuiDataGrid.defaultProps.localeText}
                processRowUpdate={(row) => props.update(row)}
                onProcessRowUpdateError={(error) => console.log(error.message)}
            />
        </Box>
    )
}

export default ProductsTab