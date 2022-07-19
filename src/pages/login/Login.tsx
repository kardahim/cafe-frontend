import {
    Container,
    TextField,
    Button,
    Paper,
    Link,
    Box
} from "@mui/material";

import { useFormik } from "formik"
import * as Yup from 'yup'

import React, { useState } from "react";
import './Login.scss'

const validationSchema = Yup.object({
    email: Yup
        .string()
        .required("Email jest wymagany").min(1, 'KURWA'),
    password: Yup
        .string()
        .required("Hasło jest wymagane")
});

function Login() {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert('Do something')
        }
    });

    return (
        <Container maxWidth="sm" className='login'>
            <Paper elevation={4} className='login__card'>
                <Box className='login__card__header'>
                    login
                </Box>
                <Box className='login__card__content'>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField className='login__content__input'
                            variant='outlined'
                            label='Adres email'
                            fullWidth
                            autoComplete='email'
                            autoFocus
                            name='email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField className='login__content__input'
                            variant='outlined'
                            label='Hasło'
                            fullWidth
                            autoComplete='current-password'
                            type='password'
                            name='password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}

                        />
                        <Button className='login__content__button'
                            variant='contained'
                            fullWidth
                            type='submit'
                        >
                            Zaloguj się
                        </Button>
                    </form>
                    <Link href="#" className='login__content__link'
                        underline='hover'>
                        Nie pamiętasz hasła?
                    </Link>
                </Box>
            </Paper>
        </Container>
    )
}

export default Login