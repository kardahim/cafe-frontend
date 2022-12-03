import './UsersTab.scss'
import {
    DataGrid,
    GridColDef,
    GridPreProcessEditCellProps,
    plPL
} from '@mui/x-data-grid';
import { Box, Divider, Button } from '@mui/material';
import UsersTypeChart from '../../charts/usersTypeChart/UsersTypeChart';
import { UsersTabInterface } from '../../../interfaces/UsersTabInterface';
import { useNavigate } from 'react-router-dom';



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
    const navigate = useNavigate()

    return (
        <Box className='users_tab'>
            <Button className='users_tab__button' onClick={() => navigate('/new-employee')}>Dodaj pracownika</Button>
            <DataGrid
                className='users_tab__table'
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
            <Divider className='users_tab__divider'>Rodzaje użytkowników</Divider>
            <UsersTypeChart
                users={props.users}
                roles={props.roles} />
        </Box>
    )
}

export default UsersTab