import React from 'react'
import './LoyaltyCard.scss'

// import assets
import image from '../../assets/images/placeholder.png'

// mui
import {
    Typography,
    Link,
    Paper
} from '@mui/material'
import { ArrowRight } from '@mui/icons-material'


function LoyaltyCard() {
    return (
        <Paper className='loyalty-card loyalty-card--padding' elevation={4} sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
            <div className='loyalty-card__article'>
                <Typography className='loyalty-card__article__title'
                    variant='h5'
                    component='h1'>
                    Dołącz do &lt;Loyalty Name &gt;
                </Typography>
                <Typography className='loyalty-card__article__text'
                    variant='body2'
                    component='p'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero minus aspernatur quas atque voluptates voluptatem similique dolore perferendis temporibus reprehenderit, perspiciatis, modi culpa ut eaque repellendus cupiditate itaque obcaecati. Culpa?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero minus aspernatur quas atque voluptates voluptatem similique dolore perferendis temporibus reprehenderit, perspiciatis, modi culpa ut eaque repellendus cupiditate itaque obcaecati. Culpa?
                </Typography>
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