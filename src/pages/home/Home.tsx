import './Home.scss'

// components
import Carousel from '../../components/carousel/Carousel'
import MiniGallery from '../../components/miniGallery/MiniGallery'
import LoyaltyCard from '../../components/loyaltyCard/LoyaltyCard'

import axios from '../../api/axios.js';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

// ChatGPT
const items = [
    {
        imageName: 'carousel_item_1.png',
        title: "Kawa i ciasteczko",
        description: 'Przyjdź po kofeinę do naszej kawiarni! Przez ograniczony czas, kupując kawę, otrzymasz darmowe ciastko. Niezależnie od tego, czy zaczynasz dzień, czy potrzebujesz pokrzepienia w popołudniu, zapewniamy Ci ochronę. Wpadnij dzisiaj i zafunduj sobie filiżankę kawy i darmowe ciastko. Nie możemy się doczekać, żeby Cię zobaczyć!'
    },
    {
        imageName: 'carousel_item_2.png',
        title: "Poranna kawa",
        description: 'Czy jesteś zmęczony tą samą starą rutyną? Czy potrzebujesz małego podrywu, aby dobrze rozpocząć dzień? Wpadajcie do nas na poranną kawę! Nasza przytulna kawiarnia to idealne miejsce, aby usiąść, zrelaksować się i wypić pyszną filiżankę świeżo parzonej kawy.'
    },
    {
        imageName: 'carousel_item_3.png',
        title: "Nasze ziarna",
        description: 'Nasze ziarna są starannie pozyskiwane z najlepszych regionów uprawy kawy na całym świecie, dzięki czemu każdy łyk jest pełen bogatego, mocnego smaku. Z wielką starannością wybieramy tylko najlepsze ziarna do naszych napojów, zapewniając, że każda serwowana przez nas filiżanka kawy jest najwyższej jakości.'
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