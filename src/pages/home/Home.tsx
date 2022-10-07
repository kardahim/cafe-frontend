import React, { useEffect } from 'react';
import './Home.scss'

// components
import Carousel from '../../components/carousel/Carousel'
import MiniGallery from '../../components/miniGallery/MiniGallery'
import LoyaltyCard from '../../components/loyaltyCard/LoyaltyCard'

import axios from '../../api/axios.js';

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

    useEffect(() => {
        axios.get("/users/validate").then((response) => {
          console.log(response)
          console.log("kurwaaa")
        })
        axios.get("/users/xd").then((response) => {
          console.log("padaka")
        })
    
      }, [])

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