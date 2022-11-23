import { ProductsTabInterface } from '../../../interfaces/ProductsTabInterface';
import './ProductsTab.scss'
import {
    DataGrid,
    GridColDef,
    GridPreProcessEditCellProps,
    plPL
} from '@mui/x-data-grid';
import { Box, Divider } from '@mui/material';
import ProductsInCategoryChart from '../../productsInCategoryChart/ProductsInCategoryChart';



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
                const reg = /^[1-9][0-9]*(ml|g){1}$/
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
        <Box className='products_tab'>
            <DataGrid
                className='products_tab__table'
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
            <Divider className='products_tab__divider'>Liczba produktów w kategoriach</Divider>
            <ProductsInCategoryChart
                products={props.products}
                categories={props.categories} />
        </Box>
    )
}

export default ProductsTab