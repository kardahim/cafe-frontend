import React, { useEffect, useState, useContext } from 'react'
import Drawer from '@mui/material/Drawer';
import { Box, Button, Divider, Paper } from '@mui/material';
import { ReservationDrawerInterface } from '../../interfaces/ReservationDrawerInterface';
import './ReservationDrawer.scss'
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import axios from '../../api/axios.js';
import { AuthContext } from '../../context/AuthContext';

function ReservationDrawer(props: ReservationDrawerInterface) {

    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const context = React.useContext(AuthContext)

    const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }

        props.setIsOpen(false);
    };

    const [activeReservations, setActiveReservation] = useState<any[]>([{
        ClientId: 0
    }])

    useEffect(() => {
        console.log(context?.authState)
        axiosPrivate.get('reservations/reservationstatus/1').then((response) => {
            if (response.status !== 204) {
                setActiveReservation(response.data)
            }
        })
        // axios.get('reservations/reservationstatus/1', {
        //     headers: { 'Content-Type': 'application/json' },
        //     withCredentials: true
        // }).then((response) => {
        //     if (response.status !== 204) {
        //         setActiveReservation(response.data)
        //     }
        // })
    }, [])

    return (
        <Drawer
            anchor='left'
            open={props.isOpen}
            onClose={toggleDrawer}
            className='reservation_drawer'>
            <Paper
                className='reservation_drawer__content'
                elevation={3}>
                <Box className='content__header'>
                    Rezerwacje
                </Box>
                <Box className='content__body'>
                    <Button
                        className='content__body__button'
                        onClick={() => navigate('/reservation')}>
                        Dodaj rezerwacje
                    </Button>
                    <Divider className='content__body__divider'>
                        Aktywne rezerwacje
                    </Divider>
                    {activeReservations.map((reserv, key) =>
                        <>
                            <div className='content__body__reservation'>
                                {/* TODO change to tableNumber */}
                                Stolik nr: {reserv.TableId} <br />
                                {/* TODO add phone number */}
                                Tel klienta: { } <br />
                                Data: { } <br />
                            </div>
                            {key < activeReservations.length - 1 ? <Divider /> : ''}
                        </>
                    )}
                </Box>
            </Paper>
        </Drawer >
    )
}

export default ReservationDrawer