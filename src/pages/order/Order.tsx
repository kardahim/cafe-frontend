import React from 'react'
import { useParams } from 'react-router-dom'
import "./Order.scss"
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
import { Delete, Add, Remove } from '@mui/icons-material';
import axios from '../../api/axios.js';
import { useFormik } from "formik"
import { levenshteinDistance } from '../../utils/LevenshteinDistance';
import { AuthContext } from '../../context/AuthContext';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from 'react-router-dom'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function Order() {
    let navigate = useNavigate()
    const { id } = useParams()
    const context = React.useContext(AuthContext)
    const axiosPrivate = useAxiosPrivate();

    const [categories, setCategories] = React.useState<any[]>([])
    const [products, setProducts] = React.useState<any[]>([])
    const [payments, setPayments] = React.useState<any[]>([])
    const [order, setOrder] = React.useState<any>(null)
    const [orderDetails, setOrderDetails] = React.useState<any[]>([])
    const [refresh, setRefresh] = React.useState(false)
    const [showOptions, setShowOptions] = React.useState<any>({
        key: -1
    })

    React.useEffect(() => {
        axios.get('/categories').then((respone) => {
            setCategories(respone.data)
        })
        axios.get('/products').then((respone) => {
            setProducts(respone.data)
        })

        axios.get('/payments').then((respone) => {
            setPayments(respone.data)
            formik.values.payment = respone.data[0].id
        })

        const getOrder = async () => {
            try {
                await axiosPrivate.get(`/orderheaders/${id}`).then((response) => {
                    setOrder(response.data)
                })
            } catch (err) {
                console.error(err);
            }
        }
        getOrder();

        const getOrderDetails = async () => {
            try {
                await axiosPrivate.get(`/orderdetails/orderheader/${id}`).then((response) => {
                    setOrderDetails(response.data)
                })
            } catch (err) {
                console.error(err);
            }
        }
        getOrderDetails();
    }, [context, refresh])

    const formik = useFormik({
        initialValues: {
            category: 0,
            name: '',
            payment: 0
        },
        onSubmit: (values) => {
            // formik needs onSubmit but we dont need send data
        }
    });

    const addProduct = (product: any) => {
        console.log(product)
        const data = {
            transaction_price: product.price,
            quantity: 1,
            OrderHeaderId: id,
            ProductId: product.id
        }
        const postOrderDetails = async () => {
            try {
                await axiosPrivate.post('/orderdetails', data).then((response) => {
                    console.log(response.data)
                })
            } catch (err) {
                console.error(err);
            }
        }
        postOrderDetails();
        setTimeout(() => {
            (!refresh ? setRefresh(true) : setRefresh(false))
        }, 50)
    }

    const increaseQuantity = (orderDetailsId: number, quantity: number) => {
        const data = {
            quantity: quantity + 1
        }
        const putOrderDetails = async () => {
            try {
                await axiosPrivate.put(`/orderdetails/update/${orderDetailsId}`, data).then((response) => {
                    console.log(response.data)
                })
            } catch (err) {
                console.error(err);
            }
        }
        putOrderDetails();
        setTimeout(() => {
            (!refresh ? setRefresh(true) : setRefresh(false))
        }, 50)
    }

    const decreaseQuantity = (orderDetailsId: number, quantity: number) => {
        const data = {
            quantity: quantity - 1
        }
        const putOrderDetails = async () => {
            try {
                await axiosPrivate.put(`/orderdetails/update/${orderDetailsId}`, data).then((response) => {
                    console.log(response.data)
                })
            } catch (err) {
                console.error(err);
            }
        }
        if (quantity > 1) {
            putOrderDetails();
            setTimeout(() => {
                (!refresh ? setRefresh(true) : setRefresh(false))
            }, 50)
        }
    }

    const deleteProduct = (orderDetailsId: number) => {

        const deleteOrderDetails = async () => {
            try {
                await axiosPrivate.delete(`/orderdetails/${orderDetailsId}`).then((response) => {
                    console.log(response.data)
                })
            } catch (err) {
                console.error(err);
            }
        }

        deleteOrderDetails();
        setTimeout(() => {
            (!refresh ? setRefresh(true) : setRefresh(false))
        }, 50)

    }

    const finalizeTransaction = (finalize: boolean) => {
        if (finalize) {
            const data = {
                PaymentId: formik.values.payment,
                OrderStatusId: 2
            }

            const putOrderDetails = async () => {
                try {
                    await axiosPrivate.put(`/orderheaders/update/${id}`, data).then((response) => {
                        console.log(response.data)
                    })
                } catch (err) {
                    console.error(err);
                    console.log(err);
                }
            }
            putOrderDetails()
        }
        else {
            const data = {
                OrderStatusId: 3
            }

            const putOrderDetails = async () => {
                try {
                    await axiosPrivate.put(`/orderheaders/update/${id}`, data).then((response) => {
                        console.log(response.data)
                    })
                } catch (err) {
                    console.error(err);
                }
            }
            putOrderDetails()
        }
        const newTableData = {
            TableStatusId: 1
        }
        axios.put(`/tables/update/${order.TableId}`, newTableData)
        navigate('/order-list')
    }

    return (
        <Container sx={{ display: 'flex', flexDirection: { md: 'row', xs: 'column' } }} maxWidth="xl">
            <Container maxWidth="xl" className='order' sx={{ marginBottom: { xs: '24px', md: '0' } }}>
                <Paper elevation={4} className='order__card'>
                    <Box className='order__card__header'>
                        Zamówienie #{id}
                    </Box>
                    <Box className='order__card__content'>
                        <div className='order__content__filters'>
                            <TextField
                                className='order__content__input'
                                name='payment'
                                fullWidth
                                label="Sposób płatności"
                                value={formik.values.payment}
                                onChange={formik.handleChange}
                                select>
                                {payments.map((value, key) => {
                                    return <MenuItem value={value.id} key={key}>{value.name}</MenuItem>
                                }
                                )}
                            </TextField>
                        </div>
                        <div className='order__content__filters'>
                            <TextField
                                className='order__content__input'
                                name='totalValue'
                                fullWidth
                                label="Wartość zamówienia"
                                value={order !== null ? order.finalPrice + ' zł' : 'error'}
                                disabled />
                            <TextField
                                className='order__content__input'
                                name='tableId'
                                fullWidth
                                label="Stolik"
                                style={{ marginLeft: "25px" }}
                                value={order !== null ? 'stolik nr. ' + order.TableId : 'error'}
                                disabled />
                        </div>
                        <div className='order__content__filters'>
                            <TextField
                                className='order__content__input'
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
                            <TextField className='order__content__input'
                                variant='outlined'
                                label='Nazwa produktu'
                                fullWidth
                                name='name'
                                style={{ marginLeft: "25px" }}
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                type='search' />
                        </div>
                        {categories.map((category) => {
                            if ((category.id === formik.values.category || formik.values.category === 0) && products.filter((v) => (v.CategoryId === category.id && v.ProductStatusId === 1)).length > 0) {
                                return (
                                    <>
                                        <Divider className='order__content__category_name' textAlign="left">{category.name}</Divider>
                                        {products.map((product) => {
                                            if (product.ProductStatusId === 1 && product.CategoryId === category.id && (levenshteinDistance(formik.values.name, product.name) <= 3 || formik.values.name === ''))
                                                return (
                                                    <div className='order__content__product' onClick={() => { addProduct(product) }} title='Dodaj produkt'>
                                                        <span className='product__name'>{product.name}</span>
                                                        <div style={{ display: "flex", justifyContent: "space-between", width: "100px" }}>
                                                            <span className='product__size'>{product.size}</span>
                                                            <span className='product__price'>{product.price}zł</span>
                                                        </div>
                                                    </div>
                                                )
                                        })}
                                    </>
                                )
                            }
                        })}
                    </Box>
                </Paper>
            </Container>
            <Container className='order' sx={{ marginTop: { xs: '24px', md: '0' } }}>
                <Paper className='cart' elevation={4}>
                    <Box className='cart__header'>
                        Koszyk
                    </Box>
                    <Box className='cart__body' sx={{ minHeight: (orderDetails.length === 0 ? '0px !important' : 'none !important') }}>
                        {orderDetails.map((product, key) => {
                            return (
                                <>
                                    <div className='cart__body__product'
                                        onMouseEnter={() => setShowOptions(key)}
                                        onMouseLeave={() => setShowOptions(-1)}>
                                        <div className='product__name'>{product.Product.name}
                                            <span style={{ textTransform: 'none' }}> x{product.quantity}</span>
                                        </div>
                                        {key === showOptions ?
                                            <div>
                                                <Button className='product__button' onClick={() => increaseQuantity(product.id, product.quantity)}>
                                                    <Add />
                                                </Button>
                                                <Button className='product__button' onClick={() => decreaseQuantity(product.id, product.quantity)}>
                                                    <Remove />
                                                </Button>
                                                <Button className='product__button' onClick={() => deleteProduct(product.id)}>
                                                    <Delete />
                                                </Button>
                                            </div>
                                            :
                                            <span className='product__price'>{product.transaction_price * product.quantity}zł</span>
                                        }
                                    </div>
                                    {key < orderDetails.length - 1 ? <Divider /> : ''}
                                </>
                            )
                        })}
                        <Button className='cart__body__button' onClick={() => finalizeTransaction(false)}>Anuluj</Button>
                        {/*100btn + 25mg */}
                        <Button className='cart__body__button' sx={{ left: '125px' }} onClick={() => finalizeTransaction(true)}>Zakończ</Button>
                    </Box>
                </Paper>
            </Container>
        </Container >
    )
}

export default Order