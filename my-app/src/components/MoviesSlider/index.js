import Slider from 'react-slick'
import MovieItem from '../MovieItem'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const MoviesSlider = ({moviesList}) => {
  const settings = {
    dots: false,
    infinite: false,
    arrows: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 900,  settings: { slidesToShow: 2 } },
      { breakpoint: 600,  settings: { slidesToShow: 1 } },
    ],
  }

  return (
    <Slider {...settings}>
      {moviesList.map(movie => (
        <MovieItem key={movie.id} movieDetails={movie} />
      ))}
    </Slider>
  )
}

export default MoviesSlider
