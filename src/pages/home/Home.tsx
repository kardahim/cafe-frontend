import './Home.scss'

// components
import Carousel from '../../components/carousel/Carousel'
import MiniGallery from '../../components/miniGallery/MiniGallery'
import LoyaltyCard from '../../components/loyaltyCard/LoyaltyCard'

import axios from '../../api/axios.js';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

// for test only
const items = [
    {
        imageName: 'placeholder.png',
        title: "title 1",
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo minus repudiandae, vitae veritatis tempora a recusandae ea corrupti cupiditate! Labore molestiae placeat quis aperiam maxime dignissimos mollitia repellendus iste est.'
    },
    {
        imageName: 'placeholder.png',
        title: "title 2",
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo minus repudiandae, vitae veritatis tempora a recusandae ea corrupti cupiditate! Labore molestiae placeat quis aperiam maxime dignissimos mollitia repellendus iste est.'
    },
    {
        imageName: 'placeholder.png',
        title: "title 3",
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo minus repudiandae, vitae veritatis tempora a recusandae ea corrupti cupiditate! Labore molestiae placeat quis aperiam maxime dignissimos mollitia repellendus iste est.'
    }
]

function Home() {
    return (
        <main className='home'>
            <div className='home__carousel'>
                <Carousel items={items} />
            </div>
            <div className='home__popular'>
                <MiniGallery />
            </div>
            <div className='home__loyalty'>
                <LoyaltyCard />
            </div>
        </main>
    )
}

export default Home