import { Button, Carousel, Image } from "react-bootstrap"
import { IMovie } from "./Movies"

interface ISuggestedMoviesProps {
  randomMovies: IMovie[] | null,
  setMovieModal: React.Dispatch<React.SetStateAction<IMovie | null>>
}

export const SuggestedMovies = ({ randomMovies, setMovieModal }: ISuggestedMoviesProps) => {
  const handleClick = ( movie: IMovie ) => {
    setMovieModal(movie);
  }

  return (
    <>
      <h2 className="display-5 text-secondary mt-3">You might like...</h2>
      <div className="d-flex overflow-auto position-relative">
        {
          randomMovies?.map((movie, i) => {
            return (
              <Image
                key={`random-movie-${i}`}
                className="me-3"
                src={movie.thumbnail}
                height={180}
                role="button"
                onClick={() => handleClick(movie)} />
            )
          })
        }
      </div>
    </>
  )
}
