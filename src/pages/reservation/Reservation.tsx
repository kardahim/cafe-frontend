import { Paper, Stack } from '@mui/material'
import React from 'react'
import './Reservation.scss'
// date
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';


function Reservation() {
    const [value, setValue] = React.useState<Dayjs | null>(
        dayjs()
    );

    const handleChange = (newValue: Dayjs | null) => {
        setValue(newValue);
    };

    const [minTime, setMinTime] = React.useState<Dayjs>(dayjs())
    React.useEffect(() => {
        let today: Dayjs = dayjs()

        // reservation is available 8-18. Selecting the past time is disabled
        if (today.get('hour') > 8) {
            console.log(today.get('hour'))
            setMinTime(today)
        }
        else {
            setMinTime(dayjs().hour(8).minute(0))
        }
    }, [])

    return (
        <Paper elevation={2} className='reservation reservation--padding'>
            <div className='reservation__data'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack
                        spacing={3}
                        direction='row'
                        justifyContent="center"
                        alignItems="center">
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
            <div className='reservation__table-list'></div>
            <div className='reservation__map'></div>
        </Paper >
    )
}

export default Reservation