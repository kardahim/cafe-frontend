import { Paper, Container } from '@mui/material'
import React from 'react'
import './Statute.scss'

export default function Statute() {
    return (
        <Container maxWidth='xl' className='statute'>
            <Paper className='statute__card'>
                <h1 className='statute__card__header'>
                    Paragraf 1
                </h1>
                <p className='statute__card__body'>
                    W kawiarni obowiązuje zakaz wnoszenie własnego jedzenia oraz napojów.
                </p>
                <h1 className='statute__card__header'>
                    Paragraf 2
                </h1>
                <p className='statute__card__body'>
                    W kawiarni obowiązuje zakaz palenia wyrobów tytoniowych oraz papierosów elektronicznych.
                </p>
                <h1 className='statute__card__header'>
                    Paragraf 3
                </h1>
                <p className='statute__card__body'>
                    Dzieci powinny być nadzorowane przez cały czas i nie powinno być pozostawiane bez opieki.
                </p>
                <h1 className='statute__card__header'>
                    Paragraf 4
                </h1>
                <p className='statute__card__body'>
                    Głośne lub zakłócające spokój zachowanie jest niedozwolone.
                </p>
                <h1 className='statute__card__header'>
                    Paragraf 5
                </h1>
                <p className='statute__card__body'>
                    Wi-Fi w kawiarni jest dla klientów wyłącznie do użytku osobistego i nie powinny być wykorzystywane do celów niezgodnych z prawem lub niewłaściwych.
                </p>
            </Paper>
        </Container>
    )
}
