import './App.css';
import '../../global.css';
import Header, { setThemeColor } from '../Header/Header';
import MoviesContainer from '../MoviesContainer/MoviesContainer'
import Highlight from '../Highlight/Highlight';
import { useState } from 'react';

function App() {

  const [theme, setTheme] = useState(null)



  if (!theme) {
    if (!localStorage.getItem('theme')) {
      setTheme('light')
      localStorage.setItem('theme', 'light')
    } else {
      setTheme(localStorage.getItem('theme'))
    }
    setThemeColor()
  }

  function handleInput(e, inputRef) {


    // if (e.key === 'Enter') {
    //   setPagination(0)
    //   if (inputRef.current.value === '') {

    //   } else {
    //     searchMovie(setMovies, inputRef, setFilmsBackup)
    //   }
    // }
  }


  return (
    <div className="App">

      {theme && <>
        <Header theme={theme} setTheme={setTheme} handleInput={handleInput} />
        <div className="container size">
          <MoviesContainer theme={theme} />
          <Highlight theme={theme} />
        </div>
      </>}

    </div>
  );
}

export default App;
