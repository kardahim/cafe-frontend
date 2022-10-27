import { Button, Container, Paper, Stack, Box } from '@mui/material'
import React from 'react'
import './Reservation.scss'
// date
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import PersonIcon from '@mui/icons-material/Person';
// assets
import map from '../../assets/images/placeholder.png'


function Reservation() {
    // pickers hooks
    const [value, setValue] = React.useState<Dayjs | null>(
        dayjs()
    );

    const handleChange = (newValue: Dayjs | null) => {
        setValue(newValue);
    };

    const [minTime, setMinTime] = React.useState<Dayjs>(dayjs())
    React.useEffect(() => {
        let today: Dayjs = dayjs()

        // FIXME: check day - at the moment after 18 cant order future days 
        // reservation is available 8-18. Selecting the past time is disabled
        if (today.get('hour') > 8) {
            console.log(today.get('hour'))
            setMinTime(today)
        }
        else {
            setMinTime(dayjs().hour(8).minute(0))
        }
    }, [])

    // tables hooks
    // example data
    const [tables, setTables] = React.useState([
        {
            name: "Stolik nr 1",
            slots: 3,
            isfree: true
        },
        {
            name: "Stolik nr 2",
            slots: 2,
            isfree: false
        },
        {
            name: "Stolik nr 3",
            slots: 1,
            isfree: true
        },
        {
            name: "Stolik nr 4",
            slots: 5,
            isfree: true
        },
        {
            name: "Stolik nr 1",
            slots: 3,
            isfree: true
        },
        {
            name: "Stolik nr 2",
            slots: 2,
            isfree: false
        },
        {
            name: "Stolik nr 3",
            slots: 1,
            isfree: true
        },
        {
            name: "Stolik nr 4",
            slots: 5,
            isfree: true
        },
        {
            name: "Stolik nr 1",
            slots: 3,
            isfree: true
        },
        {
            name: "Stolik nr 2",
            slots: 2,
            isfree: false
        },
        {
            name: "Stolik nr 3",
            slots: 1,
            isfree: true
        },
        {
            name: "Stolik nr 4",
            slots: 5,
            isfree: true
        },
        {
            name: "Stolik nr 1",
            slots: 3,
            isfree: true
        },
        {
            name: "Stolik nr 2",
            slots: 2,
            isfree: false
        },
        {
            name: "Stolik nr 3",
            slots: 1,
            isfree: true
        },
        {
            name: "Stolik nr 4",
            slots: 5,
            isfree: true
        }
    ])

    return (
        <Container maxWidth="lg">
            <Paper elevation={2} className='reservation'>
                <Box className='reservation__header'>
                    rezerwacja stolika
                </Box>
                <div className='reservation__data'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Stack
                            spacing={3}
                            direction={{ xs: 'column', sm: 'row' }}
                            justifyContent="center"
                            alignItems="center">
                            {/* add onChange */}
                            <DesktopDatePicker
                                label="Data"
                                inputFormat='DD.MM.YYYY'
                                value={value}
                                onChange={handleChange}
                                renderInput={(params) => <TextField {...params} />}
                                disablePast
                            />
                            <TimePicker
                                label="Godzina"
                                value={value}
                                onChange={handleChange}
                                renderInput={(params) => <TextField {...params} />}
                                ampm={false}
                                minTime={minTime}
                                maxTime={dayjs().hour(18).minute(0)}
                            />
                        </Stack>
                    </LocalizationProvider>
                </div>
                <div className='reservation__table-list'>
                    <Stack spacing={2}>
                        {/* divider */}
                        {tables.map((value, key) =>
                            <div key={key} className='reservation__table-list__item'>
                                <div>{value.name}<PersonIcon sx={{ margin: '0 0  0 20px' }} />x{value.slots}</div>
                                <Button className='reservation__button'
                                    variant='contained'
                                    type='submit'
                                >Złóż zamówienie</Button>
                            </div>
                        )}
                    </Stack>
                </div>
                <div className='reservation__map'>
                    <Box className='map__header'>
                        mapa sali
                    </Box>
                    <img src={map} alt='map' />
                </div>
            </Paper >
        </Container>
    )
}

export default Reservation