import React from 'react'
import { useNavigate } from "react-router-dom"
import './MiniGallery.scss'

// import mui
import {
    ImageList,
    ImageListItem,
} from '@mui/material'

const images = [
    {
        img: 'coffee1.png',
        title: 'Frappe Ice Coffee'
    },
    {
        img: 'coffee2.png',
        title: 'American Coffee'
    },
    {
        img: 'coffee3.png',
        title: 'Espresso'
    },
    {
        img: 'coffee4.png',
        title: 'Latte'
    }
]

function MiniGallery() {
    const navigate = useNavigate();

    return (
        <div className='mini-gallery mini-gallery--padding'>
            <ImageList className='gallery'
                cols={2}
                gap={30}>
                {images.map((item) => (
                    <ImageListItem key={item.title} className='gallery__item'>
                        <img
                            src={require(`../../assets/images/${item.img}`)}
                            alt={item.title}
                            loading='lazy'
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    )
}

export default MiniGallery