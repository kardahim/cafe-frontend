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
        description: 'Czy jesteś zmęczony tą samą starą rutyną? Czy potrzebujesz małego podrywu, aby dobrze rozpocząć dzień? Wpadajcie do nas na poranną kawę! Nasza przytulna kawiarnia to idealne miejsce, aby usiąść, zrelaksować się i wypić pyszną filiżankę świeżo parzonej kawy. Niezależnie od tego, czy wolisz klasyczną filiżankę Joe, czy specjalną latte, mamy coś dla każdego. Po co więc czekać? Wpadnij do nas na poranną kawę i rozpocznij dzień prawą nogą. Nie możemy się doczekać, żeby Cię tam zobaczyć!'
    },
    // {
    //     imageName: 'ad2.png',
    //     title: "Herbata zielona",
    //     description: 'Zielona herbata to najstarsza herbata świata, a według wielu także najzdrowsza. Dla Chińczyków picie tego cennego naparu jest rytuałem, który dociera swoimi korzeniami w głąb ich samych, pozwalając im na osiągnięcie harmonii i wyciszenia. W naszej kawiarni używamy tylko liści rośliny Camellia sinensis.'
    // }
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