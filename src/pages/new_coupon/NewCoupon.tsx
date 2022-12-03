import {
    Container,
    TextField,
    Button,
    Paper,
    MenuItem,
    Box,
    Stack
} from "@mui/material";
import './NewCoupon.scss'
import { useFormik } from "formik"
import axios from '../../api/axios.js';
import { useEffect, useState } from 'react';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { NewCouponValidationSchema } from "../../validations/NewCouponValidationSchema";
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pl';

function NewCoupon() {
    const context = useContext(AuthContext);
    const axiosPrivate = useAxiosPrivate();
    const [products, setProducts] = useState<any[]>([])
    const [refresh, setRefresh] = useState(false)

    const formik = useFormik({
        initialValues: {
            ProductId: 1,
            value: 5,
            pointPrice: '',
        },
        validationSchema: NewCouponValidationSchema,
        onSubmit: (values) => {
        }
    });

    useEffect(() => {
        axios.get('/products/specialoffers').then((response) => {
            setProducts(response.data)
            formik.values.ProductId = response.data[0].id
        })
    }, [refresh])

    return (
        <Container maxWidth="sm" className='new_coupon'>
            <Paper elevation={4} className='new_coupon__card'>
                <Box className='new_coupon__card__header'>
                    Generowanie kuponu
                </Box>
                <Box className='new_coupon__card__content'>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            className='new_coupon__content__input'
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
                        <TextField className='new_coupon__content__input'
                            variant='outlined'
                            fullWidth
                            label='Wartość promocji'
                            name='value'
                            value={formik.values.value}
                            onChange={formik.handleChange}
                            error={formik.touched.value && Boolean(formik.errors.value)}
                            helperText={formik.touched.value && formik.errors.value}
                            type="number" />
                        <TextField className='new_coupon__content__input'
                            variant='outlined'
                            fullWidth
                            label='Wymagane punkty'
                            name='pointPrice'
                            value={formik.values.pointPrice}
                            onChange={formik.handleChange}
                            error={formik.touched.pointPrice && Boolean(formik.errors.pointPrice)}
                            helperText={formik.touched.pointPrice && formik.errors.pointPrice}
                            type="number" />
                        <Button className='new_coupon__content__button'
                            variant='contained'
                            fullWidth
                            type='submit'>
                            generuj
                        </Button>
                    </form>
                </Box>
            </Paper>
        </Container >
    )
}

export default NewCoupon