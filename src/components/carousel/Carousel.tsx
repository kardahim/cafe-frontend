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
        <Paper className='carousel carousel--padding' elevation={4} sx={{ height: { sm: 'auto', md: '350px' } }}>
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
        <Box
            sx={{ display: { md: 'flex' }, flexDirection: { sm: 'column', md: 'row' } }}
            className='carousel__item' key={key}>
            <CardMedia className='carousel__item__image'
                component='img'
                height='350'
                image={require(`../../assets/images/${item.imageName}`)}
                alt={item.imageName}
                sx={{ objectFit: { sm: 'cover', md: 'contain' }, width: { sm: '100%', md: 'auto' } }} />
            <CardContent className='carousel__item__body'>
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
        </Box>
    )
}

export default CarouselComponent