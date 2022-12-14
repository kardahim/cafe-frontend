import { Container, Link, Paper } from '@mui/material'
import React from 'react'
import './AboutUs.scss'

function AboutUs() {
    // TODO: make this responsive
    return (
        <Container maxWidth='xl' className='about_us'>
            <Paper className='about_us__info'>
                <h1 className='info__header'>
                    O nas
                </h1>
                <p className='info__paragraph'>
                    {/* chatGPT */}
                    Witamy w naszej kawiarni! Jesteśmy przytulną małą kawiarnią położoną w samym sercu śródmieścia, której celem jest zapewnienie naszym klientom doskonałej filiżanki kawy. Nasz zespół wykwalifikowanych baristów jest pasjonatem sztuki parzenia kawy i zobowiązuje się do używania tylko najlepszych ziaren i składników w każdej filiżance.
                    <br /><br />
                    W naszej kawiarni wierzymy w siłę społeczności i wagę więzi międzyludzkich. Dlatego stworzyliśmy przyjazną przestrzeń, w której ludzie mogą się spotykać, by napić się pysznej kawy i porozmawiać. Niezależnie od tego, czy jesteś stałym gościem, czy też odwiedzasz go po raz pierwszy, zawsze będziesz witany z uśmiechem i traktowany jak jeden z nas.
                    <br /><br />
                    Oprócz naszej fachowo przygotowanej kawy oferujemy również szeroki wybór smacznych wypieków i kanapek przygotowywanych codziennie na świeżo. Niezależnie od tego, czy potrzebujesz szybkiego podrywu, czy chcesz spędzić wolny czas podczas lunchu, mamy coś dla Ciebie.
                    <br /><br />
                    Jesteśmy dumni z bycia częścią społeczności śródmieścia i jesteśmy zaangażowani we wspieranie lokalnych firm i organizacji. Regularnie organizujemy wydarzenia i zbiórki pieniędzy i zawsze szukamy nowych sposobów, aby odwdzięczyć się i wywrzeć pozytywny wpływ.
                    <br /><br />
                    Dziękujemy, że zechcieli Państwo odwiedzić naszą kawiarnię. Nie możemy się doczekać, aby zaserwować Ci idealną filiżankę kawy i być częścią Twojego dnia.
                </p>
            </Paper>
            <div className='about_us__details'>
                <Paper className='about_us__details__hours'>
                    <h1 className='hours__header'>
                        Godziny Otwarcia
                    </h1>
                    <ul className='hours__content'>
                        <li>
                            <span>Poniedziałek:</span>
                            <span>8:00 - 20:00</span>
                        </li>
                        <li>
                            <span>Wtorek:</span>
                            <span>8:00 - 20:00</span>
                        </li>
                        <li>
                            <span>Środa:</span>
                            <span>8:00 - 20:00</span>
                        </li>
                        <li>
                            <span>Czwartek:</span>
                            <span>8:00 - 20:00</span>
                        </li>
                        <li>
                            <span>Piątek:</span>
                            <span>8:00 - 20:00</span>
                        </li>
                        <li>
                            <span>Sobota:</span>
                            <span>8:00 - 20:00</span>
                        </li>
                        <li>
                            <span>Niedziela:</span>
                            <span>8:00 - 20:00</span>
                        </li>
                        <br />
                        <li>
                            <span>Rezerwacje:</span>
                            <span>8:00 - 18:00</span>
                        </li>
                    </ul>
                </Paper>
                <Paper className='about_us__details__socials'>
                    <h1 className='socials__header'>
                        Gdzie nas znajdziesz
                    </h1>
                    <ul className='socials__content'>
                        <li>
                            <span>Facebook:</span>
                            <span >
                                <Link href='#' underline="none">
                                    <i className="fa-brands fa-facebook-square"></i>
                                </Link>
                            </span>
                        </li>
                        <li>
                            <span>Instagram:</span>
                            <span >
                                <Link href='#' underline="none">
                                    <i className="fa-brands fa-instagram-square"></i>
                                </Link>
                            </span>
                        </li>
                        <li>
                            <span>Sklep Play:</span>
                            <span >
                                <Link href='#' underline="none">
                                    <i className="fa-brands fa-google-play"></i>
                                </Link>
                            </span>
                        </li>
                        <li>Odwiedź nas osobiście</li>
                        {/* should be google map but this is hard to implements */}
                    </ul>
                </Paper>
                <div className='about_us__details__contact'>
                    <Paper className='contact__card'>
                        <h1 className='contact__card__header'>
                            Przydatne Linki
                        </h1>
                        <ul className='contact__card__content'>
                            <li>
                                <Link href='/menu' underline="none">
                                    Menu Kawiarni
                                </Link>
                            </li>
                            <li>
                                <Link href='/statute' underline="none">
                                    Regulamin
                                </Link>
                            </li>
                        </ul>
                    </Paper>
                    <Paper className='contact__card'
                        sx={{ marginTop: '25px' }}>
                        <h1 className='contact__card__header'>
                            Kontakt
                        </h1>
                        <ul className='contact__card__content'>
                            <li>
                                <span>Telefon:</span>
                                <span>123 123 123</span>
                            </li>
                            <li>
                                <span>Email:</span>
                                <span>kawiarnia@example.com</span>
                            </li>
                        </ul>
                    </Paper>
                </div>
            </div>
        </Container>
    )
}

export default AboutUs