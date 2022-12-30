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
    Box
} from '@mui/material'
import { ArrowRight } from '@mui/icons-material'

// interface
import { CarouselInterface } from '../../interfaces/CarouselInterface'

function CarouselComponent(props: CarouselInterface) {
    return (
        // also carousel with carousel--padding
        <Paper className='carousel carousel--padding' elevation={4}>
            <Carousel animation='slide' duration={1000}
                indicatorIconButtonProps={{
                    style: {
                        bottom: '60px',
                        zIndex: 1,
                    }
                }}>
                {props.items.map((value, key) => item(value, key))}
            </Carousel>
        </Paper>
    )
}
// If you change the resolution and carousels is changing slide, a graphic bug is crated (sometimes indicators are missing)
function item(item: any, key: any) {
    return (
        <Box className='carousel__item' key={key}>
            <CardMedia className='carousel__item__image'
                component='img'
                height='500'
                image={require(`../../assets/images/${item.imageName}`)}
                alt={item.imageName} />
            <CardContent className='carousel__item__body'>
                <Typography gutterBottom variant='h4' component='h1' className='carousel__item__body__header'>
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
        </Box>
    )
}

export default CarouselComponent