import MoviesSlider from '../MoviesSlider'
import './index.css'

const ACTION = 'ACTION'
const COMEDY = 'COMEDY'

const PrimeVideo = ({moviesList}) => {
  const actionMovies = moviesList.filter(m => m.categoryId === ACTION)
  const comedyMovies = moviesList.filter(m => m.categoryId === COMEDY)

  return (
    <div className="prime-video-container">
      <img
        className="banner-image"
        src="https://assets.ccbp.in/frontend/react-js/prime-video-img.png"
        alt="prime video"
      />
      <div className="movies-section">
        <h1 className="section-title">Action Movies</h1>
        <MoviesSlider moviesList={actionMovies} />
        <h1 className="section-title">Comedy Movies</h1>
        <MoviesSlider moviesList={comedyMovies} />
      </div>
    </div>
  )
}

export default PrimeVideo
