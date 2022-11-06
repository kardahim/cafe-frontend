import React from 'react'
import "./OrderList.scss"
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
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom'

function OrderList() {
    let navigate = useNavigate()
    const axiosPrivate = useAxiosPrivate();
    const context = useContext(AuthContext);

    const [orderStatuses, setOrderStatuses] = React.useState<any[]>([])
    const [orders, setOrders] = React.useState<any[]>([])

    React.useEffect(() => {
        axios.get('/orderstatuses').then((respone) => {
            setOrderStatuses(respone.data)
        })
        const getOrders = async () => {
            try {
                await axiosPrivate.get('/orderheaders').then((response) => {
                    setOrders(response.data)

                    if (response.data.filter((v: any) => v.OrderStatusId === 1).length > 0) {
                        formik.values.orderStatus = 1
                    }
                    else formik.values.orderStatus = 0
                })
            } catch (err) {
                console.error(err);
            }
        }
        getOrders();
    }, [context])

    const formik = useFormik({
        initialValues: {
            orderStatus: 0,
            name: ''
        },
        onSubmit: (values) => {
            // formik needs onSubmit but we dont need send data
        }
    });
    return (
        <Container maxWidth="xl" className='order_list'>
            <Paper elevation={4} className='order_list__card'>
                <Box className='order_list__card__header'>
                    Zamówienia
                </Box>
                <Box className='order_list__card__content'>
                    <div className='order_list__content__filters'>
                        <TextField
                            className='order_list__content__input'
                            name='orderStatus'
                            fullWidth
                            label="Zamówienia"
                            value={formik.values.orderStatus}
                            onChange={formik.handleChange}
                            select>
                            <MenuItem value={0}>Wszystkie</MenuItem>
                            {orderStatuses.map((value, key) => {
                                if (orders.filter((v) => v.OrderStatusId === value.id).length > 0)
                                    return <MenuItem value={value.id} key={key}>{value.name}</MenuItem>
                            }
                            )}
                        </TextField>
                        <TextField className='order_list__content__input'
                            variant='outlined'
                            label='Nr zamówienia'
                            fullWidth
                            name='name'
                            style={{ marginLeft: "25px" }}
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            type='search' />
                    </div>
                    {orderStatuses.map((orderStatus) => {
                        if ((orderStatus.id === formik.values.orderStatus || formik.values.orderStatus === 0) && (orders.filter((v) => v.OrderStatusId === orderStatus.id).length > 0)) {
                            return (
                                <>
                                    <Divider className='order_list__content__category_name' textAlign="left">{orderStatus.name}</Divider>
                                    {orders.map((order) => {
                                        // I think that here should be an exact match
                                        if (order.OrderStatusId === orderStatus.id && (levenshteinDistance(formik.values.name, order.id.toString()) <= 0 || formik.values.name === '')) {
                                            let date = new Date(order.updatedAt).toLocaleDateString('pl-PL').split(',')[0]
                                            return (
                                                <>
                                                    <div className='order_list__content__product' onClick={() => navigate(`/order/${order.id}`)}>
                                                        <span className='product__name'>Zamówienie #{order.id}</span>
                                                        <div style={{ display: "flex", justifyContent: "space-between", width: "200px" }}>
                                                            <span className='product__table'>Stolik nr. {order.TableId}</span>
                                                            <span className='product__date'>{date}</span>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }
                                    })}
                                </>
                            )
                        }
                    })}
                </Box>
            </Paper>
        </Container >
    )
}

export default OrderList