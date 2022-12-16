import React from 'react'
import './Carousel.scss'

// import carousel
import Carousel from 'react-material-ui-carousel'

// import material
import {
    Paper,
    CardContent,
    CardMedia,
    Typography,
    Link,
} from '@mui/material'
import { ArrowRight } from '@mui/icons-material'

// interface
import { CarouselInterface } from '../../interfaces/CarouselInterface'

function CarouselComponent(props: CarouselInterface) {
    return (
        // also carousel with carousel--padding
        <Carousel className='carousel carousel--padding' animation='slide' duration={1000}>
            {props.items.map((value, key) => item(value, key))}
        </Carousel>
    )
}
// If you change the resolution and carousels is changing slide, a graphic bug is crated (sometimes indicators are missing)
function item(item: any, key: any) {
    return (
        <Paper elevation={4} sx={{ display: { md: 'flex' } }} className='carousel__item' key={key}>
            <CardMedia className='carousel__item__image'
                component='img'
                height='300'
                image={require(`../../assets/images/${item.imageName}`)}
                alt={item.imageName}
                sx={{ objectFit: 'contain', flex: '40' }} />
            <CardContent sx={{ flex: '60' }} className='carousel__item__body'>
                <Typography gutterBottom variant='h4' component='div' className='carousel__item__body__header'>
                    {item.title}
                </Typography>
                <Typography variant='body1' component='div' className='carousel__item__body__paragraph'>
                    {item.description}
                </Typography>
                <Link href='/menu' underline='hover' className='carousel__item__body__link'>
                    Sprawdź ofertę
                    <ArrowRight />
                </Link>
            </CardContent>
        </Paper>
    )
}

export default CarouselComponent