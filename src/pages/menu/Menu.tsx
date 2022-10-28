import React from 'react'
import "./Menu.scss"
import {
    Container,
    TextField,
    Button,
    Paper,
    Link,
    Box,
    Divider
} from "@mui/material";
import axios from '../../api/axios.js';

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

    return (
        <Container maxWidth="xl" className='menu'>
            <Paper elevation={4} className='menu__card'>
                <Box className='menu__card__header'>
                    Menu
                </Box>
                <Box className='menu__card__content'>
                    {categories.map((category) => {
                        return (
                            <>
                                <Divider className='menu__content__category_name' textAlign="left">{category.name}</Divider>
                                {products.map((product) => {
                                    if (product.CategoryId === category.id)
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
                    })}
                </Box>
            </Paper>
        </Container>
    )
}

export default Menu