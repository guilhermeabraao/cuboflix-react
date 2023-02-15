import './Header.css';
import logoDark from '../../assets/logo-dark.png';
import logoLight from '../../assets/logo.svg'
import lightMode from '../../assets/light-mode.svg'
import darkMode from '../../assets/dark-mode.svg'
import { useRef } from 'react';


export default function Header({ theme, setTheme, handleInput }) {

    const inputRef = useRef(null)

    function changeTheme() {
        if (theme === 'light') {
            setTheme('dark');
            localStorage.setItem('theme', 'dark');

        } else {
            setTheme('light');
            localStorage.setItem('theme', 'light');
        }
        setThemeColor(theme);
    }

    return (
        <header className="header size">
            <div className="header__container-logo">
                <img src={theme === 'light' ? logoDark : logoLight} alt="Logo" />
                <h1 className="header__title">CUBOS FLIX</h1>
            </div>
            <div className="header__container-right">
                <input className="input" type="text" placeholder="Pesquisar..." ref={inputRef} onKeyDown={(e) => handleInput(e, inputRef)} />
                <img className="btn-theme" src={theme === 'light' ? lightMode : darkMode} alt="Botão de tema" onClick={() => changeTheme()} />
            </div>
        </header>
    )
}

export function setThemeColor() {
    const theme = localStorage.getItem('theme');
    const root = document.querySelector(':root')
    if (theme === 'light') {
        root.style.setProperty('--background', '#FFF');
        root.style.setProperty('--text-color', '#1b2028');
        root.style.setProperty('--bg-secondary', '#ededed');

    } else {
        root.style.setProperty('--background', '#1B2028');
        root.style.setProperty('--text-color', '#FFF');
        root.style.setProperty('--bg-secondary', '#2D3440');
    }
}