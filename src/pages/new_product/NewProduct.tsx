import {
    Container,
    TextField,
    Button,
    Paper,
    MenuItem,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from "@mui/material";
import './NewProduct.scss'
import { useFormik } from "formik"
import { NewProductValidationSchema, NewCategoryValidationSchema } from "../../validations/NewProductValidationSchema";
import axios from '../../api/axios.js';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from 'react';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


function NewProduct() {
    const context = useContext(AuthContext)
    const axiosPrivate = useAxiosPrivate();
    const [categories, setCategories] = useState<any[]>([])
    const [statuses, setStatuses] = useState<any[]>([])
    const [refresh, setRefresh] = useState(false)
    const formik = useFormik({
        initialValues: {
            CategoryId: 1,
            name: '',
            size: 100,
            unit: 'g',
            price: 20,
            allergen: '',
            ProductStatusId: 1
        },
        validationSchema: NewProductValidationSchema,
        onSubmit: (values) => {
            console.log(values)
        }
    });

    const smallFormik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: NewCategoryValidationSchema,
        onSubmit: (values) => {
            (refresh ? setRefresh(false) : setRefresh(true))

            const postCategory = async () => {
                try {
                    await axiosPrivate.post('/categories', values).then((response) => {
                        console.log(response.data)
                    })
                } catch (err) {
                    console.error(err);
                }
            }
            postCategory();

            // axios.post('/categories', values,
            //     {
            //         headers: { 'Authorization': `Bearer ${context?.authState.accessToken}` },

            //     }
            // ).then((response) => {
            //     console.log(response.data)
            // })
            handleClose()
        }
    });

    // get all categories
    useEffect(() => {
        axios.get('/categories').then((response) => {
            setCategories(response.data)
            // dont touch this (its vital)
            formik.values.CategoryId = response.data[0].id
        })

        axios.get('/productstatuses').then((response) => {
            setStatuses(response.data)
            formik.values.ProductStatusId = response.data[0].id
        })
    }, [refresh])


    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container maxWidth="sm" className='new_product'>
            <Dialog open={open} onClose={handleClose}
                onSubmit={(e) => { handleClose() }}
            >
                <DialogTitle>Dodawanie nowej kategorii</DialogTitle>
                <form onSubmit={smallFormik.handleSubmit}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="name"
                            label="Nazwa kategorii"
                            fullWidth
                            variant="standard"
                            value={smallFormik.values.name}
                            onChange={smallFormik.handleChange}
                            error={smallFormik.touched.name && Boolean(smallFormik.errors.name)}
                            helperText={smallFormik.touched.name && smallFormik.errors.name}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Anuluj</Button>
                        <Button type="submit">Dodaj</Button>
                    </DialogActions>
                </form>
            </Dialog>
            <Paper elevation={4} className='new_product__card'>
                <Box className='new_product__card__header'>
                    dodawanie nowego produktu
                </Box>
                <Box className='new_product__card__content'>
                    <form onSubmit={formik.handleSubmit}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <TextField
                                className='new_product__content__input'
                                id="category-select"
                                name='category'
                                label="Kategoria"
                                fullWidth
                                autoFocus
                                value={formik.values.CategoryId}
                                onChange={formik.handleChange}
                                error={formik.touched.CategoryId && Boolean(formik.errors.CategoryId)}
                                helperText={formik.touched.CategoryId && formik.errors.CategoryId}
                                select>
                                {categories.map((value, key) =>
                                    <MenuItem value={value.id} key={key} selected>{value.name}</MenuItem>
                                )}
                            </TextField>
                            <Button variant="outlined"
                                onClick={handleClickOpen} className='new_product__content__button'
                                title="Dodaj nową kategorię"
                                style={{ height: "56px" }}>
                                +
                            </Button>
                        </div>
                        <TextField className='new_product__content__input'
                            variant='outlined'
                            label='Nazwa produktu'
                            fullWidth
                            name='name'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <TextField
                                className='new_product__content__input'
                                variant='outlined'
                                label='Rozmiar produktu'
                                name='size'
                                value={formik.values.size}
                                onChange={formik.handleChange}
                                error={formik.touched.size && Boolean(formik.errors.size)}
                                helperText={formik.touched.size && formik.errors.size}
                            />
                            <TextField
                                className='new_product__content__input'
                                style={{ marginLeft: "25px" }}
                                id="unit-select"
                                name='unit'
                                value={formik.values.unit}
                                onChange={formik.handleChange}
                                error={formik.touched.unit && Boolean(formik.errors.unit)}
                                helperText={formik.touched.unit && formik.errors.unit}
                                select>
                                <MenuItem value="g">gramy(g)</MenuItem>
                                <MenuItem value="ml">mililitry(ml)</MenuItem>
                            </TextField>
                        </div>
                        <TextField
                            className='new_product__content__input'
                            id="status-select"
                            name='status'
                            label="Status"
                            fullWidth
                            value={formik.values.ProductStatusId}
                            onChange={formik.handleChange}
                            error={formik.touched.ProductStatusId && Boolean(formik.errors.ProductStatusId)}
                            helperText={formik.touched.CategoryId && formik.errors.ProductStatusId}
                            select>
                            {statuses.map((value, key) =>
                                <MenuItem value={value.id} key={key} selected>{value.name}</MenuItem>
                            )}
                        </TextField>
                        <TextField className='new_product__content__input'
                            variant='outlined'
                            fullWidth
                            label='Cena produktu'
                            name='price'
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            error={formik.touched.price && Boolean(formik.errors.price)}
                            helperText={formik.touched.price && formik.errors.price}
                        />
                        <TextField className='new_product__content__input'
                            variant='outlined'
                            fullWidth
                            label='Allergeny'
                            name='allergen'
                            value={formik.values.allergen}
                            onChange={formik.handleChange}
                            error={formik.touched.allergen && Boolean(formik.errors.allergen)}
                            helperText={formik.touched.allergen && formik.errors.allergen}
                        />
                        <Button className='new_product__content__button'
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

export default NewProduct