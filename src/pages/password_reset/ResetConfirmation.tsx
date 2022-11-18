import {
    Container,
    TextField,
    Button,
    Paper,
    Box
} from "@mui/material";

import { useFormik } from "formik"
import { ResetPasswordConfirmationValidationSchema } from "../../validations/ResetPasswordConfirmationValidationSchema";
import './ResetConfirmation.scss'
import axios from '../../api/axios.js';
import { useNavigate } from 'react-router-dom'
import { useLocation } from "react-router-dom";

interface CustomizedState {
    email: string
}

function ResetConfirmation() {
    let navigate = useNavigate();
    const location = useLocation();
    const state = location.state as CustomizedState
    let email = state.email;

    const formik = useFormik({
        initialValues: {
            code: '',
            password: '',
            repeatPassword: ''
        },
        validationSchema: ResetPasswordConfirmationValidationSchema,
        onSubmit: (values) => {
            let fixedValues = {
                resetCode: values.code,
                password: values.password,
                email: email
            }
            axios.post("/auth/resetpassword", fixedValues
            ).then((response) => {
                console.log(response.data.error);
                if(response?.data?.error) {
                    alert(response.data.error);
                }
                else if(response?.data?.message) {
                    alert(response.data.message);
                    navigate(`/login`);
                }
            });
        }
    });

    return (
        <Container maxWidth="sm" className='reset-confirmation'>
            <Paper elevation={4} className='reset-confirmation__card' sx={{ 'marginBottom': '50px' }}>
                Na podany adres email w ciągu 5 minut wysłany zostanie kod resetujący hasło. Aby zresetować hasło podaj kod oraz nowe hasło.
            </Paper>
            <Paper elevation={4} className='reset-confirmation__card'>
                <Box className='reset-confirmation__card__header'>
                    resetowanie hasła
                </Box>
                <Box className='reset-confirmation__card__content'>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField className='reset-confirmation__content__input'
                            variant='outlined'
                            label='Kod resetujący'
                            fullWidth
                            autoFocus
                            name='code'
                            value={formik.values.code}
                            onChange={formik.handleChange}
                            error={formik.touched.code && Boolean(formik.errors.code)}
                            helperText={formik.touched.code && formik.errors.code}
                        />
                        <TextField className='reset-confirmation__content__input'
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
                        <TextField className='reset-confirmation__content__input'
                            variant='outlined'
                            label='Powtórz hasło'
                            fullWidth
                            autoComplete='current-password'
                            type='password'
                            name='repeatPassword'
                            value={formik.values.repeatPassword}
                            onChange={formik.handleChange}
                            error={formik.touched.repeatPassword && Boolean(formik.errors.repeatPassword)}
                            helperText={formik.touched.repeatPassword && formik.errors.repeatPassword}
                        />
                        <Button className='reset-confirmation__content__button'
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

export default ResetConfirmation