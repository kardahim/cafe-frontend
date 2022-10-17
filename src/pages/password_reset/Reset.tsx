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


function Reset() {
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: ResetPasswordValidationSchema,
        onSubmit: (values) => {
            alert('Do something')
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