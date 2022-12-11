import { Divider } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import './OrderHistory.scss'
import dayjs from 'dayjs';

function OrderHistory() {
    const context = useContext(AuthContext);
    const [refresh, setRefresh] = useState(false)
    const axiosPrivate = useAxiosPrivate();

    const [myOrders, setMyOrders] = useState<any[]>([])

    useEffect(() => {
        axiosPrivate.get(`/orderheaders/client/${context?.authState.id}`).then((response) => {
            if (response.status !== 204) {
                setMyOrders(response.data.reverse())
            }
            else setMyOrders([])
        })
    }, [refresh])


    return (
        <div className='order_history'>
            {myOrders.map((order, key) => {
                return (
                    <div key={key} className='order_history__row'>
                        <Divider className='order_history__date' textAlign="left">{dayjs(order.updatedAt).format('DD.MM.YYYY')}</Divider>
                        {order.OrderDetails.map((details: any, key: any) => {
                            return (
                                <div className='history__product'>
                                    <span className='product__name'>{details.Product.name}</span>
                                    <div style={{ display: "flex", justifyContent: "space-between", width: "170px" }}>
                                        <span className='product__size'>{details.Product.size}</span>
                                        <span className='product__price'>{details.Product.price}zł</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default OrderHistory