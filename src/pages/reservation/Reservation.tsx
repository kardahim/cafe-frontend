import { Button, Container, Paper, Stack, Box, tablePaginationClasses } from '@mui/material'
import React, { useEffect } from 'react'
import './Reservation.scss'
// date
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import PersonIcon from '@mui/icons-material/Person';
import 'dayjs/locale/pl';
import axios from '../../api/axios';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { AuthContext } from '../../context/AuthContext';

function Reservation() {
    dayjs.locale('pl')

    const axiosPrivate = useAxiosPrivate();
    const context = React.useContext(AuthContext)

    const [value, setValue] = React.useState<Dayjs | null>(dayjs().second(0));
    const [minTime, setMinTime] = React.useState<Dayjs>(dayjs())
    const [tables, setTables] = React.useState<any[]>([])
    const [activeReservations, setActiveReservation] = React.useState<any[]>([{
        ClientId: 0
    }])
    const [refresh, setRefresh] = React.useState(false)
    const [phoneNumber, setPhoneNumber] = React.useState('')

    const handleChange = (newValue: Dayjs | null) => {
        setValue(newValue);
    };

    React.useEffect(() => {
        let today: Dayjs = dayjs()

        if (today.get('hour') > 8 && today.isAfter(value)) {
            setMinTime(today)
        }
        else {
            setMinTime(dayjs().hour(8).minute(0))
        }
        // console.log(value?.format('DD.MM.YYYY HH:mm:ss'))
    }, [value, refresh])

    React.useEffect(() => {
        axios.get('/tables').then((response) => {
            if (response.status !== 204) {
                setTables(response.data)
            }
        })

        axiosPrivate.get('reservations/reservationstatus/1').then((response) => {
            if (response.status !== 204) {
                setActiveReservation(response.data)
            }
        })
    }, [refresh])


    // errors handlers
    const [dateError, setDateError] = React.useState(false)
    const dateErrorHandler = (reason: any, value: any) => {
        if (reason === 'disablePast') {
            setDateError(true)
        }
        else {
            setDateError(false)
        }
    }

    const [timeError, setTimeError] = React.useState(false)
    const timeErrorHandler = (reason: any, value: any) => {
        if (reason === 'maxTime' || reason === 'minTime') {
            setTimeError(true)
        }
        else {
            setTimeError(false)
        }
    }

    const [phoneError, setPhoneError] = React.useState(false)
    const [phoneErrorMessage, setPhoneErrorMessage] = React.useState('')
    const phoneHandler = (phone: string) => {
        setPhoneNumber(phone)

        const reg = /^[1-9][0-9]{8}$/
        if (!reg.exec(phone)) {
            setPhoneError(true)
            setPhoneErrorMessage('Niepoprawny numer telefonu.')
        }
        else {
            setPhoneError(false)
            setPhoneErrorMessage('')
        }
    }

    const submitReservation = (tableId: number) => {
        if (context?.authState.roleId === 1) {
            const data = {
                date: value?.second(0).toDate(),
                ReservationStatusId: 1,
                TableId: tableId,
                ClientId: context?.authState.id
            }

            if (!dateError && !timeError && !phoneError) {
                axiosPrivate.post('/reservations', data)
                    .then((response) => console.log(response.data))
                // .catch(({ response }) => {
                //     if (response.data?.error === 'Produkt o podanej nazwie już istnieje.') {
                //         setPhoneError(true)
                //     alert('error')
                //     }
                // })
            }
            setTimeout(() => {
                (!refresh ? setRefresh(true) : setRefresh(false))
            }, 50)
        }
        else if (context?.authState.roleId === 2 || context?.authState.roleId === 3) {
            axiosPrivate.get(`/users/phone/${phoneNumber}`).then((response) => {
                if (response.data == null) { setPhoneError(true); setPhoneErrorMessage('Klient jest niezarejestrowany.') }
                else {
                    const data = {
                        date: value?.second(0).toDate(),
                        ReservationStatusId: 1,
                        TableId: tableId,
                        ClientId: response.data.id,
                        EmployeeId: context?.authState.id
                    }

                    if (!dateError && !timeError && !phoneError) {
                        axiosPrivate.post('/reservations', data).then((response) => console.log(response.data))
                            .catch(({ response }) => {
                                if (response.data?.message === `Klient o Id ${data.ClientId} ma już aktywną Rezerwację.`) {
                                    setPhoneError(true)
                                    setPhoneErrorMessage('Klient ma już aktywną rezerwację.')
                                }
                            })
                    }
                }
            }).catch(({ response }) => {
                if (response.data?.message === `Nie znaleziono Użytkownika o numerze telefonu ${phoneNumber}.`) {
                    setPhoneError(true)
                    setPhoneErrorMessage('Klient jest niezarejestrowany.')
                }
            })
            setTimeout(() => {
                (!refresh ? setRefresh(true) : setRefresh(false))
            }, 50)
        }
    }

    const cancelReservation = (reservationId: number) => {
        const data = {
            ReservationStatusId: 2
        }

        axiosPrivate.put(`/reservations/${reservationId}`, data).then((response) => console.log(response.data))

        setTimeout(() => {
            (!refresh ? setRefresh(true) : setRefresh(false))

            setActiveReservation([{
                ClientId: 0
            }])
        }, 50)
    }

    const [findReservation, setFindReservation] = React.useState(false)
    useEffect(() => {
        const test = activeReservations.find(reservation => {
            return (reservation.ClientId === context?.authState.id && context?.authState.roleId === 1)
        })
        if (test !== undefined) setFindReservation(true)
        else setFindReservation(false)
    }, [refresh, activeReservations])

    return (
        <Container maxWidth="lg">
            {
                !findReservation ?
                    <Paper elevation={2} className='reservation'>
                        <Box className='reservation__header'>
                            rezerwacja stolika
                        </Box>
                        <div className='reservation__data'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack
                                    spacing={3}
                                    sx={{ padding: '0 100px' }}
                                    direction={{ xs: 'column', sm: 'row' }}
                                    justifyContent="center"
                                    alignItems="flex-start">
                                    {/* add onChange */}
                                    <div style={{ width: '100%' }}>
                                        <DesktopDatePicker
                                            label="Data"
                                            inputFormat='DD.MM.YYYY'
                                            value={value}
                                            onChange={handleChange}
                                            renderInput={(params) => <TextField {...params} fullWidth sx={{ height: '80px' }} />}
                                            disablePast
                                            onError={dateErrorHandler} />
                                    </div>
                                    <div style={{ width: '100%' }}>
                                        <TimePicker
                                            label="Godzina"
                                            value={value}
                                            onChange={handleChange}
                                            renderInput={(params) => <TextField {...params} fullWidth sx={{ height: '80px' }} />}
                                            ampm={false}
                                            minTime={minTime}
                                            maxTime={dayjs().hour(18).minute(0)}
                                            onError={timeErrorHandler} />
                                    </div>
                                    {(context?.authState.roleId === 2 || context?.authState.roleId === 3) ?
                                        <div style={{ width: '100%' }}>
                                            <TextField
                                                sx={{ height: '80px', marginTop: '0' }}
                                                fullWidth
                                                margin="dense"
                                                name="name"
                                                label="Numer telefonu"
                                                variant="outlined"
                                                value={phoneNumber}
                                                error={phoneError}
                                                helperText={phoneError && phoneErrorMessage}
                                                onChange={(e) => phoneHandler(e.target.value)} />
                                        </div>
                                        : ''}
                                </Stack>
                            </LocalizationProvider>
                        </div>
                        <div className='reservation__table-list'>
                            <Stack spacing={2}>
                                {/* divider */}
                                {tables.map((table, key) => {
                                    // FIXME: not work
                                    if (activeReservations.find(reservation => (reservation.TableId !== table.id || !value?.isSame(dayjs(reservation.date), 'day'))))
                                        return (
                                            <div key={key} className='reservation__table-list__item'>
                                                <div>Stolik nr. {table.number}<PersonIcon sx={{ margin: '0 0  0 20px' }} />x{table.numberOfSeats}</div>
                                                <Button className='reservation__button'
                                                    variant='contained'
                                                    onClick={() => submitReservation(table.id)}
                                                >Zarezerwuj
                                                </Button>
                                            </div>
                                        )
                                })}
                            </Stack>
                        </div>
                    </Paper >
                    :
                    <Paper elevation={2} className='reservation'>
                        <Box className='reservation__header'>
                            moja rezerwacja
                        </Box>
                        <div className='reservation__table-list'>
                            <Stack spacing={2}>
                                {tables.map((table, key) => {
                                    const reservation = activeReservations.find(reservation => (reservation.ClientId === context?.authState.id && reservation.TableId === table.id))
                                    if (reservation)
                                        return (
                                            <div key={key} className='reservation__table-list__item'>
                                                <div>Stolik nr. {table.number}<PersonIcon sx={{ margin: '0 0  0 20px' }} />x{table.numberOfSeats}</div>
                                                <Button className='reservation__button'
                                                    variant='contained'
                                                    onClick={() => cancelReservation(reservation.id)}>
                                                    Anuluj
                                                </Button>
                                            </div>
                                        )
                                })}
                            </Stack>
                        </div>
                    </Paper >
            }
        </Container>
    )
}

export default Reservation