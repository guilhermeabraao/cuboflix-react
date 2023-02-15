import './Modal.css';
import close from '../../assets/close-dark.svg';
import closeDark from '../../assets/close.svg'



export default function Modal({ movieModal, booleanModal, setBooleanModal, theme }) {

    return (
        <>
            {booleanModal && <div className="modal" onClick={() => setBooleanModal(false)}>
                <div className="modal__body" onClick={(e) => e.stopPropagation()}>
                    <img src={theme === 'light' ? close : closeDark} alt="Close" className="modal__close" onClick={() => setBooleanModal(false)} />
                    <h3 className="modal__title">{movieModal.title}</h3>
                    <img className="modal__img" alt="modal__img" src={movieModal.backdrop_path} />
                    <p className="modal__description">{movieModal.overview}</p>
                    <div className="modal__genre-average">
                        <div className="modal__genres">{movieModal.genres.map((genre) => (
                            <span className='modal__genre' key={genre}>{genre}</span>
                        ))}
                        </div>
                        <div className="modal__average">{movieModal.vote_average.toFixed(1)}</div>
                    </div>
                </div>
            </div>}
        </>
    )
}