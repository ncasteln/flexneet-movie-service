import { Col, Row, Image } from "react-bootstrap"
import { IMovie } from "./Movies"

interface IMovieGrid {
  movies: IMovie[]
  setMovieModal: React.Dispatch<React.SetStateAction<IMovie | null>>,
}

export const MovieGrid = ({ movies, setMovieModal }: IMovieGrid) => {
  return (
    <Row xs={2} sm={4} lg={6} className="m-auto">
      { movies.map((movie, i) => {
          return (
            <Col className="mb-2" key={`movie-grid-${i}`} onClick={() => setMovieModal(movie)}>
              <Image fluid
                role="button"
                src={movie.thumbnail ? movie.thumbnail : "../public/no-image.jpg"} />
            </Col>
          )
      })}
    </Row>
  )
}
