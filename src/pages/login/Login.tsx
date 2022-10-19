import {
    Container,
    TextField,
    Button,
    Paper,
    Link,
    Box
} from "@mui/material";

import { useFormik } from "formik"
import { LoginValidationSchema } from "../../validations/LoginValidationSchema";
import './Login.scss'
import axios from '../../api/axios.js';

function Login() {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: LoginValidationSchema,
        onSubmit: (values) => {
            axios.post("/users/login", values).then((response) => {
                if (response.data.error) {
                    // setError(response.data.error)
                    console.log(response.data.error)
                }
                else {
                    console.log(response)

                    // const accessToken = response?.data?.accessToken;
                    // const RoleId = response?.data?.RoleId;
                    // do saving to context here...


                    // przekierowanie po zalogowaniu ?
                    // window.location.pathname = "/"
                }
            }).catch(error => console.error(error))
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
                    <Link href="/reset-password" className='login__content__link'
                        underline='hover'>
                        Nie pamiętasz hasła?
                    </Link>
                </Box>
            </Paper>
        </Container>
    )
}

export default Login