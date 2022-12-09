import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import './OrderHistory.scss'

function OrderHistory() {
    const context = useContext(AuthContext);
    const [refresh, setRefresh] = useState(false)
    const axiosPrivate = useAxiosPrivate();

    const [myOrders, setMyOrders] = useState<any[]>([])

    useEffect(() => {
        axiosPrivate.get(`/orderheaders/client/${context?.authState.id}`).then((response) => {
            if (response.status !== 204) {
                setMyOrders(response.data)
            }
            else setMyOrders([])
        })
    }, [refresh])


    return (
        <div>OrderHistory</div>
    )
}

export default OrderHistory