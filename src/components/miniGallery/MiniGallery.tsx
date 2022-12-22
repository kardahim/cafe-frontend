import React from 'react'
import { useNavigate } from "react-router-dom"
import './MiniGallery.scss'

// import mui
import {
    ImageList,
    ImageListItem,
    Button
} from '@mui/material'

// test only
const images = [
    {
        img: 'coffee1.png',
        title: 'Frappe Ice Coffee'
    },
    {
        img: 'placeholder.png',
        title: 'placeholder 2'
    },
    {
        img: 'placeholder.png',
        title: 'placeholder 3'
    },
    {
        img: 'coffee1.png',
        title: 'placeholder 4'
    }
]

function MiniGallery() {
    const navigate = useNavigate();

    return (
        // this component also has attribute padding
        <div className='mini-gallery mini-gallery--padding'>
            <ImageList className='gallery'
                // variant='masonry'
                cols={2}
                gap={8}
            >
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
            {/* <Button className='mini-gallery__button' fullWidth onClick={() => navigate('/menu')}>Zobacz więcej</Button> */}
        </div>
    )
}

export default MiniGallery