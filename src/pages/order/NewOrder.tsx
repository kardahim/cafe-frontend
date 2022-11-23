import {
    Container,
    TextField,
    Button,
    Paper,
    MenuItem,
    Box,
    Checkbox
} from "@mui/material";

import { useFormik } from "formik"
import { NewOrderValidationSchema } from "../../validations/NewOrderValidationSchema";
import './NewOrder.scss'
import axios from '../../api/axios.js';
import { useContext, useEffect, useState } from 'react';
// import { useState } from "react";
import { AuthContext } from '../../context/AuthContext';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
// import useRefreshToken from "../../hooks/useRefreshToken";
import { useNavigate } from 'react-router-dom'

function NewOrder() {
    let navigate = useNavigate()
    const axiosPrivate = useAxiosPrivate()
    const context = useContext(AuthContext)
    const [tables, setTables] = useState<any[]>([])
    const [hasAccount, setHasAccount] = useState(false)

    const formik = useFormik({
        initialValues: {
            phoneNumber: '',
            tableId: 1
        },
        validationSchema: NewOrderValidationSchema,
        onSubmit: (values) => {
            let clientId = 0
            const getUserByPhone = async () => {
                try {
                    await axiosPrivate.get(`/users/phone/${values.phoneNumber}`).then((response) => {
                        if (response.data === null && hasAccount) {
                            formik.setFieldError('phoneNumber', "Numer jest niepoprawny")
                        }
                        else {
                            clientId = response.data.id
                        }
                    })
                } catch (err) {
                    console.error(err);
                }
            }
            getUserByPhone()

            setTimeout(() => {
                const data = {
                    OrderStatusId: 1,
                    TableId: values.tableId,
                    ClientId: (clientId !== 0 ? clientId : null),
                    EmployeeId: context?.authState.id,
                    finalPrice: 0
                }

                const postOrder = async () => {
                    try {
                        await axiosPrivate.post('/orderheaders', data).then((response) => {
                            console.log(response.data)
                            // if client hasnt account or if client has an account and the phone number is correct
                            if (!hasAccount || (clientId !== 0 && hasAccount)) {
                                const newTableData = {
                                    TableStatusId: 2
                                }
                                // FIXME: use axiosprivate
                                axiosPrivate.put(`/tables/update/${values.tableId}`, newTableData)
                                navigate(`/order/${response.data.id}`)
                            }
                        })
                    } catch (err) {
                        console.error(err);
                    }
                }
                postOrder()
            }, 200)
        }
    });

    useEffect(() => {
        // get only free tables
        axios.get('/tables/table/1').then((response) => {
            setTables(response.data)
            formik.values.tableId = response.data[0].id
        })
    }, [context])
    return (
        <Container maxWidth="sm" className='new_order'>
            <Paper elevation={4} className='new_order__card'>
                <Box className='new_order__card__header'>
                    nowe zamówienie
                </Box>
                <Box className='new_order__card__content'>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            className='new_order__content__input'
                            id="category-select"
                            name='tableId'
                            fullWidth
                            label="Dostępne stoliki"
                            value={formik.values.tableId}
                            onChange={formik.handleChange}
                            select>
                            {tables.map((value, key) => {
                                return <MenuItem value={value.id} key={key}>Stolik nr. {value.id} ({value.numberOfSeats} os.)</MenuItem>
                            }
                            )}
                        </TextField>
                        <div style={{ marginLeft: '3px' }}>
                            <span>Czy klient posiada konto?</span>
                            <Checkbox
                                checked={hasAccount}
                                onChange={(event) => setHasAccount(event?.target.checked)} />
                        </div>
                        {hasAccount ?
                            <TextField className='new_order__content__input'
                                style={{ marginBottom: '0' }}
                                variant='outlined'
                                label='Numer telefonu'
                                fullWidth
                                name='phoneNumber'
                                value={formik.values.phoneNumber}
                                onChange={formik.handleChange}
                                error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber} /> :
                            ''}
                        <Button className='new_order__content__button'
                            variant='contained'
                            fullWidth
                            style={{ marginTop: '25px' }}
                            type='submit'>
                            Dodaj
                        </Button>
                    </form>
                </Box>
            </Paper>
        </Container>
    )
}

export default NewOrder