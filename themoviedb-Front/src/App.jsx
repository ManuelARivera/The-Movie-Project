import { useState } from 'react'
import './App.css'
import { useAppConext } from './hooks/useAppContext'
import { Button } from '@chakra-ui/react'
import { MoviesCard } from './components/moviescard'
import { Modal } from './components/modal'
import { GetLikeMovies } from './services/getlikemovie'
import { GetMyLikeMovie } from './services/getmylikemovie'

function App() {
  const [isShown, setIsShown] = useState(false);
  const [movie, setMovie] = useState('');
  const [likes, setLikes] = useState(0);
  const [mylikes, setMyLikes] = useState(0);
  const { user, logout, movies, token } = useAppConext()

  const showModal = async (m) => {
    const like = await GetLikeMovies(m.id, token)
    const mylike = await GetMyLikeMovie(m.id, token)

    setLikes(like)
    setMyLikes(mylike)
    setMovie(m)
    setIsShown(true)
  }
  const hideModal = () => setIsShown(false)
  const firstName = user.name;



  return (

    <div className="app-container">
      <div className="app-header-container">
        <h2>{firstName.toLowerCase()}</h2>
        <Button colorScheme='yellow' color='white' variant='outline' onClick={() => logout()}>
          Logout
        </Button>
      </div>
      <div className="app-body-container">
        {
          movies.map((m) => (
            <MoviesCard
              key={m.id}
              item={m}
              onClickModal={() => showModal(m)}
            />
          ))
        }


      </div>
      <div className="app-footer-container">
        <p>The MovieDB &copy; 2024 Prueba Técnica</p>
      </div>
      <Modal closeModal={hideModal} isVisible={isShown} item={movie} likes={likes} mylikes={mylikes} />

    </div>
  )
}

export default App
