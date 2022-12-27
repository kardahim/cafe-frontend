import React from 'react'
import './LoyaltyCard.scss'

// import assets
import image from '../../assets/images/join_us.png'

// mui
import {
    Typography,
    Link,
    Paper
} from '@mui/material'
import { ArrowRight } from '@mui/icons-material'


function LoyaltyCard() {
    return (
        <Paper className='loyalty-card loyalty-card--padding' elevation={4}>
            <div className='loyalty-card__article'>
                <Typography className='loyalty-card__article__title'
                    variant='h4'
                    component='h1'>
                    Dołącz do nas
                </Typography>
                {/* text by chatGPT */}
                <Typography className='loyalty-card__article__text'
                    variant='body1'
                    component='p'>
                    Cieszymy się, że możemy zaoferować Ci możliwość dołączenia do naszego programu lojalnościowego. Jako członek będziesz otrzymywać ekskluzywne rabaty, promocje i nagrody za kontynuację współpracy z nami.
                    <br /><br />
                    Niektóre z korzyści płynących z dołączenia do naszego programu lojalnościowego obejmują:
                    Oferty i rabaty na podstawie Twojej historii zakupów. Nagrody za każdy zakup dokonany u nas.
                    <br /><br />
                    Aby dołączyć do naszego programu lojalnościowego, po prostu podaj nam swoje dane kontaktowe i zacznij zdobywać nagrody już dziś. Z niecierpliwością czekamy na powitanie Cię w naszym programie lojalnościowym i podziękowanie za lojalność wobec naszej firmy.
                </Typography>
                {/* google play */}
                <Link href='#' underline='hover' className='loyalty-card__article__link'>
                    Zobacz, co zyskujesz
                    <ArrowRight />
                </Link>
            </div>
            <div className='loyalty-card__image-container'>
                <img src={image} alt='loyalty' />
            </div>
        </Paper>
    )
}

export default LoyaltyCard