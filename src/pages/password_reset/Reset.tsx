import {
    Container,
    TextField,
    Button,
    Paper,
    Box
} from "@mui/material";

import { useFormik } from "formik"
import { ResetPasswordValidationSchema } from "../../validations/ResetPasswordValidationSchema";
import './Reset.scss'
import axios from '../../api/axios.js';
import { useNavigate } from 'react-router-dom'


function Reset() {
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: ResetPasswordValidationSchema,
        onSubmit: (values) => {
            axios.post("/auth/requestpasswordreset", values
            ).then((response) => {
                console.log(response.data);
                if(response?.data?.error) {
                    alert(response.data.error);
                }
                else if(response?.data?.message) {
                    alert(response.data.message);
                    navigate(`/confirm-reset-password`, {
                        state: {
                          email: values.email,
                        }
                    });
                }
            });
        }
    });
    return (
        <Container maxWidth="sm" className='reset'>
            <Paper elevation={4} className='reset__card'>
                <Box className='reset__card__header'>
                    resetowanie hasła
                </Box>
                <Box className='reset__card__content'>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField className='reset__content__input'
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
                        <Button className='reset__content__button'
                            variant='contained'
                            fullWidth
                            type='submit'
                        >
                            Resetuj hasło
                        </Button>
                    </form>
                </Box>
            </Paper>
        </Container>
    )
}

export default Reset