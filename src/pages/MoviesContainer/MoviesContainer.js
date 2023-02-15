import './MoviesContainer.css';
import arrowLeftDark from '../../assets/arrow-left-dark.svg';
import arrowRightDark from '../../assets/arrow-right-dark.svg'
import arrowLeftLight from '../../assets/arrow-left-light.svg';
import arrowRightLight from '../../assets/arrow-right-light.svg'
import Movie from './Movie/Movie';
import { useState } from 'react';
import axios from 'axios';
import Modal from '../Modal/Modal';

export default function MoviesContainer({ theme }) {

    const [boolean, setBoolean] = useState(false);
    const [movieModal, setMovieModal] = useState(0);
    const [movies, setMovies] = useState(null);
    const [filmsBackup, setFilmsBackup] = useState(null);
    const [pagination, setPagination] = useState(0);
    const [booleanModal, setBooleanModal] = useState(false);


    const handlePagination = async (direction) => {
        const moviesArray = [];
        let i, iAux;
        try {
            if (direction === 'right') {
                if (pagination === 12) {
                    i = 0;
                } else {
                    i = pagination + 6;
                }
                iAux = i + 6;
                for (i; i < iAux; i++) {
                    moviesArray.push(filmsBackup[i]);
                }
            }
            if (direction === 'left') {
                if (pagination < 1) {
                    i = 12;
                } else {
                    i = pagination - 6;
                }
                iAux = i + 6;
                for (i; i < iAux; i++) {
                    moviesArray.push(filmsBackup[i]);
                }
            }
            console.log(moviesArray)
            setPagination(i - 6);
            setMovies(moviesArray);

        } catch (error) {
            console.log(error.message)
        }

    }

    if (!boolean) {
        loadFilms()
    }

    async function loadFilms() {
        try {
            const { data } = await axios.get('https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false');
            const films = data.results;
            setFilmsBackup(films);
            const aux = [films[0], films[1], films[2], films[3], films[4], films[5]]
            setMovies(aux)
            setBoolean(true)
        } catch (error) {
            console.log(error.message)
        }
    }

    async function handleModal(id) {
        const { data } = await axios.get(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${id}?language=pt-BR`)
        const genres = [];
        const genresAux = data.genres;
        for (let genre of genresAux) {
            genres.push(genre.name);
        }

        setMovieModal({ ...data, genres });
        setBooleanModal(true);
    }

    return (
        <>
            <div className="movies-container">
                <img className="btn-prev" src={theme === 'light' ? arrowLeftDark : arrowLeftLight} alt="arrow left" onClick={() => handlePagination('left')} />
                {boolean && movies.map((movie) => (
                    <Movie movie={movie} handleModal={() => handleModal(movie.id)} key={movie.id} />
                ))}
                <img className="btn-next" src={theme === 'light' ? arrowRightDark : arrowRightLight} alt="arrow right" onClick={() => handlePagination('right')} />
            </div>
            <Modal movieModal={movieModal} booleanModal={booleanModal} setBooleanModal={setBooleanModal} theme={theme} />
        </>
    )
}


export async function searchMovie({ setMovies, inputRef, setFilmsBackup }) {
    try {
        const { data } = await axios.get(`https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false&query=${inputRef.current.value}`);
        setFilmsBackup(data.results);
        const aux = [data.results[0], data.results[1], data.results[2], data.results[3], data.results[4], data.results[5]]
        setMovies(aux)
    } catch (error) {
        console.log(error.message)
    }



}