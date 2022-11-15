import {
    Container,
    TextField,
    Button,
    Paper,
    MenuItem,
    Box,
    Stack
} from "@mui/material";
import './NewSpecialOffer.scss'
import { useFormik } from "formik"
import axios from '../../api/axios.js';
import { useEffect, useState } from 'react';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { NewSpecialOfferValidationSchema } from "../../validations/NewSpecialOfferValidationSchema";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pl';

function NewSpecialOffer() {
    dayjs.locale('pl')
    const context = useContext(AuthContext);
    const axiosPrivate = useAxiosPrivate();
    const [products, setProducts] = useState<any[]>([])
    const [refresh, setRefresh] = useState(false)

    const formik = useFormik({
        initialValues: {
            ProductId: 1,
            value: 5,
            start_date: dayjs(),
            end_date: dayjs().add(1, 'day')
        },
        validationSchema: NewSpecialOfferValidationSchema,
        onSubmit: (values) => {
            const data = {
                value: values.value,
                start_date: values.start_date.hour(0).minute(0).second(0).millisecond(0).toDate(),
                end_date: values.end_date.hour(0).minute(0).second(0).millisecond(0).toDate(),
                ProductId: values.ProductId
            }

            axios.post('/specialoffers', data).then((response) => console.log(response));

            setTimeout(() => {
                (refresh ? setRefresh(false) : setRefresh(true))
            }, 50)
        }
    });

    useEffect(() => {
        axios.get('/products').then((response) => {
            setProducts(response.data)
            formik.values.ProductId = response.data[0].id
        })
    }, [refresh])

    return (
        <Container maxWidth="sm" className='new_special_offer'>
            <Paper elevation={4} className='new_special_offer__card'>
                <Box className='new_special_offer__card__header'>
                    dodawanie nowej promocji
                </Box>
                <Box className='new_special_offer__card__content'>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            className='new_special_offer__content__input'
                            name='ProductId'
                            label="Produkt"
                            fullWidth
                            value={formik.values.ProductId}
                            onChange={formik.handleChange}
                            error={formik.touched.ProductId && Boolean(formik.errors.ProductId)}
                            helperText={formik.touched.ProductId && formik.errors.ProductId}
                            select>
                            {products.map((value, key) =>
                                <MenuItem value={value.id} key={key} selected>{value.name}</MenuItem>
                            )}
                        </TextField>
                        <TextField className='new_special_offer__content__input'
                            variant='outlined'
                            fullWidth
                            label='Wartość promocji'
                            name='value'
                            value={formik.values.value}
                            onChange={formik.handleChange}
                            error={formik.touched.value && Boolean(formik.errors.value)}
                            helperText={formik.touched.value && formik.errors.value}
                            type="number"
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack
                                className='new_special_offer__content__input'
                                spacing={3}
                                direction={{ xs: 'column', sm: 'row' }}
                                justifyContent="center"
                                alignItems="center">
                                <DesktopDatePicker
                                    label="Data rozpoczęcia"
                                    inputFormat='DD.MM.YYYY'
                                    value={formik.values.start_date}
                                    onChange={formik.handleChange}
                                    renderInput={(params) => <TextField fullWidth {...params} />}
                                    disablePast />
                                <DesktopDatePicker
                                    label="Data zakończenia"
                                    inputFormat='DD.MM.YYYY'
                                    value={formik.values.end_date}
                                    onChange={formik.handleChange}
                                    renderInput={(params) => <TextField fullWidth {...params} />}
                                    disablePast
                                    minDate={dayjs().add(1, 'day')} />
                            </Stack>
                        </LocalizationProvider>
                        <Button className='new_special_offer__content__button'
                            variant='contained'
                            fullWidth
                            type='submit'>
                            dodaj
                        </Button>
                    </form>
                </Box>
            </Paper>
        </Container >
    )
}

export default NewSpecialOffer