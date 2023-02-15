import estrela from '../../../assets/estrela.svg'
import './Movie.css'

export default function Movies({ movie, handleModal }) {


    return (
        <div className="movie" style={{ backgroundImage: `url(${movie.poster_path})` }} onClick={handleModal}>
            <div className="movie__info" >
                <span className="movie__title">{movie.title}</span>
                <span className="movie__rating">{movie.vote_average}<img srcSet={estrela} alt="Estrela" />
                </span>
            </div>
        </div>
    )
}