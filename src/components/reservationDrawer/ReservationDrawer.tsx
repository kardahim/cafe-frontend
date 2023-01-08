import React, { useEffect, useState, useContext } from 'react'
import Drawer from '@mui/material/Drawer';
import { Box, Button, Divider, Paper } from '@mui/material';
import { ReservationDrawerInterface } from '../../interfaces/ReservationDrawerInterface';
import './ReservationDrawer.scss'
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import axios from '../../api/axios.js';
import { AuthContext } from '../../context/AuthContext';
import dayjs from 'dayjs';

function ReservationDrawer(props: ReservationDrawerInterface) {

    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const context = React.useContext(AuthContext)

    const [refresh, setRefresh] = React.useState(false)

    // TODO refresh when delete all
    const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }

        props.setIsOpen(false);
    };

    const [activeReservations, setActiveReservation] = useState<any[]>([])

    // get all active reservations change past data to inactive reservations
    useEffect(() => {
        if (context?.authState.isLogged) {
            axiosPrivate.get('reservations/reservationstatus/1')
                .then((response) => {
                    if (response.status !== 204) {
                        setActiveReservation(response.data.filter((reservation: any) => {
                            if (dayjs(reservation.date).add(1, 'day').isAfter(dayjs(), 'day')) {
                                return (dayjs(reservation.date).add(1, 'day').isAfter(dayjs(), 'day'))
                            }
                            else {
                                const data = {
                                    ReservationStatusId: 2
                                }
                                axiosPrivate.put(`reservations/${reservation.id}`, data)
                            }
                        }
                        ))
                    }
                    else {
                        setActiveReservation([])
                    }
                })
                .catch(({ response }) => {
                    setActiveReservation([])
                })
        }
        else {
            setTimeout(() => {
                (!refresh ? setRefresh(true) : setRefresh(false))
            }, 50)
        }
    }, [refresh, props.isOpen])

    const endReservation = (id: number) => {
        const data = {
            ReservationStatusId: 2
        }
        axiosPrivate.put(`reservations/${id}`, data).then((response) => {
            setTimeout(() => {
                (!refresh ? setRefresh(true) : setRefresh(false))
            }, 50)
        })
    }

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
                                Data: {dayjs(reserv.date).format('DD.MM.YYYY HH:mm')} <br />
                                Stolik nr: {reserv.Table.number} ({reserv.Table.numberOfSeats}-osobowy)<br />
                                Tel klienta: {reserv.Client.phone} <br />
                            </div>
                            <Button
                                className='content__body__button'
                                onClick={() => endReservation(reserv.id)}>
                                Zakończ
                            </Button>
                            {key < activeReservations.length - 1 ? <Divider className='content__body__divider' /> : ''}
                        </>
                    )}
                </Box>
            </Paper>
        </Drawer >
    )
}

export default ReservationDrawer