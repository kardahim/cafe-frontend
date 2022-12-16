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
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas, corrupti minima? Odit, fugiat magni! Laboriosam est, aliquid inventore doloribus sed, ducimus ullam ab sint quae eos ipsam quo similique voluptate?
                </p>
                <h1 className='statute__card__header'>
                    Paragraf 2
                </h1>
                <p className='statute__card__body'>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas, corrupti minima? Odit, fugiat magni! Laboriosam est, aliquid inventore doloribus sed, ducimus ullam ab sint quae eos ipsam quo similique voluptate?
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas, corrupti minima? Odit, fugiat magni! Laboriosam est, aliquid inventore doloribus sed, ducimus ullam ab sint quae eos ipsam quo similique voluptate?
                </p>
                <h1 className='statute__card__header'>
                    Paragraf 3
                </h1>
                <p className='statute__card__body'>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas, corrupti minima? Odit, fugiat magni! Laboriosam est, aliquid inventore doloribus sed, ducimus ullam ab sint quae eos ipsam quo similique voluptate?
                </p>
            </Paper>
        </Container>
    )
}
