import React from 'react'
import './Home.scss'

// import assets
import new1 from '../../assets/images/placeholder.png'

// components
import Carousel from '../../components/carousel/Carousel'

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
            <div className='home__top'></div>
            <div className='home__loyalty'></div>
        </main>
    )
}

export default Home