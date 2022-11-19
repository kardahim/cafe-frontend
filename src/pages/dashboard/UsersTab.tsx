import './UsersTab.scss'
import {
    DataGrid,
    GridColDef,
    GridPreProcessEditCellProps,
    plPL
} from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { UsersTabInterface } from '../../interfaces/UsersTabInterface';
import UsersTypeChart from '../../components/usersTypeChart/UsersTypeChart';



function UsersTab(props: UsersTabInterface) {

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
            field: 'firstname',
            headerName: 'Imię',
            flex: 1,
            type: 'string',
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'lastname',
            headerName: 'Nazwisko',
            flex: 1,
            type: 'string',
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'RoleId',
            headerName: 'Rola',
            flex: 1,
            type: 'singleSelect',
            // without admin
            valueOptions: props.roles.filter(role => role.id !== 2).map(role => (
                {
                    value: role.id,
                    label: role.name
                }
            )),
            align: 'center',
            headerAlign: 'center',
            editable: true,
            renderCell: params => {
                const role = props.roles.find((role) => role.id == params.row.RoleId)
                return (role.name)
            },
        },
    ];

    return (
        <Box>
            <DataGrid
                autoHeight
                rows={props.users}
                columns={columns}
                isCellEditable={(params) => params.row.RoleId !== 2}
                pageSize={10}
                disableSelectionOnClick
                rowsPerPageOptions={[10]}
                experimentalFeatures={{ newEditingApi: true }}
                localeText={plPL.components.MuiDataGrid.defaultProps.localeText}
                processRowUpdate={(row) => props.update(row)}
                onProcessRowUpdateError={(error) => console.log(error.message)}
            />
            <UsersTypeChart users={props.users} roles={props.roles} />
        </Box>
    )
}

export default UsersTab