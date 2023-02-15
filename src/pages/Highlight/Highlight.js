import './Highlight.css';
import axios from 'axios';
import { useState } from 'react';
import play from '../../assets/play.svg'

export default function Highlight(movie) {

    const [boolean, setBoolean] = useState(false)
    const [highlight, setHighlight] = useState(null);

    const getHighlight = async () => {

        try {
            const { data } = await axios.get('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR');
            setHighlight(data);
            let genres = '';
            const genresAux = highlight.genres;
            for (let genre of genresAux) {
                if (genres) {
                    genres += ', '
                }
                genres += genre.name;
            }
            const date = new Date(data.release_date).toLocaleDateString("pt-BR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                timeZone: "UTC",
            });
            const videoResult = await axios.get('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR');
            setHighlight({ ...highlight, href: videoResult.data.results[0].key, genresList: genres, date })

            setBoolean(true);
        } catch (error) {
            console.log(error.message)
        }
    }

    if (!boolean) {
        getHighlight();
    }


    return (
        <>
            {boolean && <div className="highlight size">
                <a className="highlight__video-link" href={`https://www.youtube.com/watch?v=${highlight.href}`} target="_blank" rel="noopener noreferrer">
                    <div className="highlight__video" style={{ backgroundImage: `url(${highlight.backdrop_path})` }}>
                        <img src={play} alt="Play" />
                    </div>
                </a>
                <div className="highlight__info">
                    <div className="highlight__title-rating">
                        <h1 className="highlight__title">{highlight.title}</h1>
                        <span className="highlight__rating">{highlight.vote_average.toFixed(1)}</span>
                    </div>
                    <div className="highlight__genre-launch">
                        <span className="highlight__genres">{highlight.genresList}</span>
                        /
                        <span className="highlight__launch">
                            {highlight.date}
                        </span>
                    </div>
                    <p className="highlight__description">{highlight.overview}</p>
                </div>
            </div>}
        </>
    )
}