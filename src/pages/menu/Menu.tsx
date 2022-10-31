import React from 'react'
import "./Menu.scss"
import {
    Container,
    TextField,
    Button,
    Paper,
    Link,
    Box,
    Divider,
    MenuItem
} from "@mui/material";
import axios from '../../api/axios.js';
import { useFormik } from "formik"
import { levenshteinDistance } from '../../utils/LevenshteinDistance';

function Menu() {

    const [categories, setCategories] = React.useState<any[]>([])
    const [products, setProducts] = React.useState<any[]>([])
    React.useEffect(() => {
        axios.get('/categories').then((respone) => {
            setCategories(respone.data)
        })
        axios.get('/products').then((respone) => {
            setProducts(respone.data)
        })
    }, [])

    const formik = useFormik({
        initialValues: {
            category: 0,
            name: ''
        },
        onSubmit: (values) => {
            // formik needs onSubmit but we dont need send data
        }
    });
    // console.log(levenshteinDistance('pies', 'pies'))
    return (
        <Container maxWidth="xl" className='menu'>
            <Paper elevation={4} className='menu__card'>
                <Box className='menu__card__header'>
                    Menu
                </Box>
                <Box className='menu__card__content'>
                    <div className='menu__content__filters'>
                        <TextField
                            className='menu__content__input'
                            id="category-select"
                            name='category'
                            fullWidth
                            label="Kategoria"
                            value={formik.values.category}
                            onChange={formik.handleChange}
                            select>
                            <MenuItem value={0} selected>Wszystkie</MenuItem>
                            {categories.map((value, key) => {
                                if (products.filter((v) => v.CategoryId === value.id).length > 0)
                                    return <MenuItem value={value.id} key={key}>{value.name}</MenuItem>
                            }
                            )}
                        </TextField>
                        <TextField className='menu__content__input'
                            variant='outlined'
                            label='Nazwa produktu'
                            fullWidth
                            name='name'
                            style={{ marginLeft: "25px" }}
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            type='search' />
                        {/* <Button className='menu__content__button'
                            variant='contained'
                            type='submit'>
                            szukaj
                        </Button> */}
                    </div>
                    {categories.map((category) => {
                        if ((category.id === formik.values.category || formik.values.category === 0) && products.filter((v) => v.CategoryId === category.id).length > 0) {
                            return (
                                <>
                                    <Divider className='menu__content__category_name' textAlign="left">{category.name}</Divider>
                                    {products.map((product) => {
                                        if (product.CategoryId === category.id && (levenshteinDistance(formik.values.name, product.name) <= 3 || formik.values.name === ''))
                                            return (
                                                <>
                                                    <div className='menu__content__product'>
                                                        <span className='product__name'>{product.name}</span>
                                                        <div style={{ display: "flex", justifyContent: "space-between", width: "100px" }}>
                                                            <span className='product__size'>{product.size}</span>
                                                            <span className='product__price'>{product.price}zł</span>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                    })}
                                </>
                            )
                        }
                    })}
                </Box>
            </Paper>
        </Container>
    )
}

export default Menu