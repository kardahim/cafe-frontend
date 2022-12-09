import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import './MyData.scss'
import {
    TextField,
    Button,
} from "@mui/material";

import { useFormik } from "formik"

function MyData() {
    const context = useContext(AuthContext);
    const [canEdit, setCanEdit] = useState(false);

    const formik = useFormik({
        initialValues: {
            firstname: context?.authState.firstname,
            lastname: context?.authState.lastname,
            email: context?.authState.email,
            phoneNumber: context?.authState.phone
        },
        validationSchema: null, //TODO: add edit validation schema
        // TODO: fill onSubmit function
        onSubmit: (values) => {
            setCanEdit(false)
        }
    });

    return (
        <div className='my_data'>
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
                    name='phoneNumber'
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                    helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                    disabled={!canEdit}
                />
                {canEdit ?
                    <Button className='my_data__content__button'
                        variant='contained'
                        fullWidth
                        type='submit'
                    >
                        Zatwierdź
                    </Button>
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
                        >
                            zmień hasło
                        </Button>
                    </div>
                }
            </form>
        </div>
    )
}

export default MyData