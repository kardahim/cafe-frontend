import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import './MyData.scss'
import {
    TextField,
    Button,
} from "@mui/material";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useFormik } from "formik"
import { EditDataValidationSchema } from '../../validations/EditDataVaidationSchema';
import { ChangePasswordValidationSchema } from '../../validations/ChangePasswordValidationSchema';

function MyData() {
    const context = useContext(AuthContext)
    const [canEdit, setCanEdit] = useState(false)
    const [changePasswordMode, setChangePasswordMode] = useState(false)
    const axiosPrivate = useAxiosPrivate()

    const formik = useFormik({
        initialValues: {
            firstname: context?.authState.firstname,
            lastname: context?.authState.lastname,
            email: context?.authState.email,
            phone: context?.authState.phone,
            password: ''
        },
        validationSchema: EditDataValidationSchema,
        onSubmit: (values) => {
            const loginData = {
                email: context?.authState.email,
                password: values.password
            }
            axiosPrivate.post(`/users/login`, loginData)
                .then((response) => {
                    axiosPrivate.put(`users/edit/${context?.authState.id}`, values)
                        .then((response) => {
                            axiosPrivate.post(`/users/login`, values)
                            formik.resetForm()
                            setCanEdit(false)
                        })
                })
                .catch(({ response }) => {
                    if (response.data?.error === 'Użytkownik nie istnieje')
                        formik.setFieldError('email', response.data.error)
                    if (response.data?.error === 'Hasło jest niepoprawne')
                        formik.setFieldError('password', response.data.error)
                })
        }
    });

    const editCancel = () => {
        formik.resetForm();
        setCanEdit(false)
    }
    const changePasswordCancel = () => {
        passwordFormik.resetForm();
        setChangePasswordMode(false)
    }

    const passwordFormik = useFormik({
        initialValues: {
            password: '',
            newPassword: ''
        },
        validationSchema: ChangePasswordValidationSchema,
        onSubmit: (values) => {
            const loginData = {
                email: context?.authState.email,
                password: values.password
            }
            const newLogin = {
                email: context?.authState.email,
                password: passwordFormik.values.newPassword
            }
            axiosPrivate.post(`/users/login`, loginData)
                .then((response) => {
                    axiosPrivate.put(`users/changepassword/${context?.authState.id}`, values)
                        .then((response) => {
                            axiosPrivate.post(`/users/login`, newLogin)
                            passwordFormik.resetForm();
                            setChangePasswordMode(false)
                        })
                })
                .catch(({ response }) => {
                    if (response.data?.error === 'Stare hasło jest niepoprawne')
                        passwordFormik.setFieldError('password', response.data.error)
                })
        }
    });

    return (
        <div className='my_data'>
            {!changePasswordMode ?
                <form onSubmit={formik.handleSubmit}>
                    <TextField className='my_data__content__input'
                        variant='outlined'
                        label='Imię'
                        fullWidth
                        autoComplete='given-name'
                        autoFocus
                        name='firstname'
                        value={formik.values.firstname}
                        onChange={formik.handleChange}
                        error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                        helperText={formik.touched.firstname && formik.errors.firstname}
                        disabled={!canEdit}
                    />
                    <TextField className='my_data__content__input'
                        variant='outlined'
                        label='Nazwisko'
                        fullWidth
                        autoComplete='family-name'
                        name='lastname'
                        value={formik.values.lastname}
                        onChange={formik.handleChange}
                        error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                        helperText={formik.touched.lastname && formik.errors.lastname}
                        disabled={!canEdit}
                    />
                    <TextField className='my_data__content__input'
                        variant='outlined'
                        label='Adres email'
                        fullWidth
                        autoComplete='email'
                        name='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        disabled={!canEdit}
                    />
                    <TextField className='my_data__content__input'
                        variant='outlined'
                        label='Numer telefonu'
                        fullWidth
                        autoComplete='tel-national'
                        name='phone'
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
                        disabled={!canEdit}
                    />
                    {canEdit &&
                        <TextField className='my_data__content__input'
                            variant='outlined'
                            label='Hasło'
                            fullWidth
                            autoComplete='current-password'
                            name='password'
                            type='password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                    }
                    {canEdit ?
                        <div style={{ display: 'flex' }}>
                            <Button className='my_data__content__button'
                                variant='contained'
                                fullWidth
                                type='submit'>
                                Zatwierdź
                            </Button>
                            <Button className='my_data__content__button'
                                variant='contained'
                                fullWidth
                                sx={{ marginLeft: '25px' }}
                                onClick={editCancel}>
                                Anuluj
                            </Button>
                        </div>
                        :
                        <div style={{ display: 'flex' }}>
                            <Button className='my_data__content__button'
                                variant='contained'
                                fullWidth
                                onClick={() => setCanEdit(true)}
                            >
                                edytuj
                            </Button>
                            <Button className='my_data__content__button'
                                variant='contained'
                                fullWidth
                                sx={{ marginLeft: '25px' }}
                                onClick={() => setChangePasswordMode(true)}
                            >
                                zmień hasło
                            </Button>
                        </div>
                    }
                </form>
                :
                <form onSubmit={passwordFormik.handleSubmit}>
                    <TextField className='my_data__content__input'
                        variant='outlined'
                        label='Stare hasło'
                        fullWidth
                        autoComplete='current-password'
                        name='password'
                        type='password'
                        value={passwordFormik.values.password}
                        onChange={passwordFormik.handleChange}
                        error={passwordFormik.touched.password && Boolean(passwordFormik.errors.password)}
                        helperText={passwordFormik.touched.password && passwordFormik.errors.password}
                    />
                    <TextField className='my_data__content__input'
                        variant='outlined'
                        label='Nowe hasło'
                        fullWidth
                        name='newPassword'
                        type='password'
                        value={passwordFormik.values.newPassword}
                        onChange={passwordFormik.handleChange}
                        error={passwordFormik.touched.newPassword && Boolean(passwordFormik.errors.newPassword)}
                        helperText={passwordFormik.touched.newPassword && passwordFormik.errors.newPassword}
                    />
                    <div style={{ display: 'flex' }}>
                        <Button className='my_data__content__button'
                            variant='contained'
                            fullWidth
                            type='submit'>
                            Zatwierdź
                        </Button>
                        <Button className='my_data__content__button'
                            variant='contained'
                            fullWidth
                            sx={{ marginLeft: '25px' }}
                            onClick={changePasswordCancel}>
                            Anuluj
                        </Button>
                    </div>
                </form>
            }
        </div>
    )
}

export default MyData