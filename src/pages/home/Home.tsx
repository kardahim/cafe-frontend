import './Home.scss'

// components
import Carousel from '../../components/carousel/Carousel'
import MiniGallery from '../../components/miniGallery/MiniGallery'
import LoyaltyCard from '../../components/loyaltyCard/LoyaltyCard'

import axios from '../../api/axios.js';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const items = [
    {
        imageName: 'placeholder.png',
        title: "Arabica",
        description: 'Kawa arabica to rodzaj kawy, który jest powszechnie znany ze swojej wysokiej jakości i charakterystycznego smaku. W naszej kawiarni używamy mieszanki doskonałych kaw brazyliskich i kolumbijskich z dodatkiem robusy indyjskiej. Kawa mocna, o dużej zawartości kofeiny.'
    },
    {
        imageName: 'placeholder.png',
        title: "Lattee",
        description: 'Jest to kawa składająca się z równych proporcji mleka i kawy. W naszej kawiarni możesz wybrać dowolne mleko do swojego ulubionego napoju. Espresso w latte zapewnia mocny, wyrazisty smak, podczas gdy spienione mleko dodaje bogatej, kremowej konsystencji i lekko słodkiego smaku.'
    },
    {
        imageName: 'placeholder.png',
        title: "Herbata zielona",
        description: 'Zielona herbata to najstarsza herbata świata, a według wielu także najzdrowsza. Dla Chińczyków picie tego cennego naparu jest rytuałem, który dociera swoimi korzeniami w głąb ich samych, pozwalając im na osiągnięcie harmonii i wyciszenia. W naszej kawiarni używamy tylko liści rośliny Camellia sinensis.'
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