import {
    Container,
    TextField,
    Button,
    Paper,
    MenuItem,
    Box
} from "@mui/material";
import './NewCoupon.scss'
import { useFormik } from "formik"
import axios from '../../api/axios.js';
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { NewCouponValidationSchema } from "../../validations/NewCouponValidationSchema";
import 'dayjs/locale/pl';

function NewCoupon() {
    const axiosPrivate = useAxiosPrivate();
    const [products, setProducts] = useState<any[]>([])
    const [refresh, setRefresh] = useState(false)
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            ProductId: '',
            value: 5,
            pointPrice: '',
        },
        validationSchema: NewCouponValidationSchema,
        onSubmit: (values) => {
            const data = {
                ProductId: values.ProductId,
                value: values.value,
                pointPrice: values.pointPrice,
                isAvailable: true
            }
            const postCoupon = async () => {
                await axiosPrivate.post('/coupons', data).then((response) => {
                    console.log(response.data)
                }).then((response) => {

                }).catch(({ response }) => {
                    console.log(response.data?.error)
                    if (response.data?.error.includes("Istnieje już kupon na produkt"))
                        alert(response.data.error)
                    if (response.data?.error === 'Wartość kuponu jest niepoprawna')
                        formik.setFieldError('value', response.data.error)
                })
                
            }
            
            postCoupon();
            setTimeout(() => {
                (refresh ? setRefresh(false) : setRefresh(true))
            }, 50)
        }
    });

    useEffect(() => {
        axios.get('/products/withoutcoupons').then((response) => {
            if(response.data.length > 0){
                setProducts(response.data)
                formik.values.ProductId = response.data[0].id
            }
            else {
                navigate('/dashboard')
            }
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
                            label='Wartość promocji [ % ]'
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