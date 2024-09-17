import { Col, Row, Image } from "react-bootstrap"
import { IMovie } from "./Movies"

interface IMovieGrid {
  movies: IMovie[]
  setMovieModal: React.Dispatch<React.SetStateAction<IMovie | null>>,
  isMyListRendered: boolean
}

export const MovieGrid = ({ movies, setMovieModal, isMyListRendered }: IMovieGrid) => {
  return (
    <Row xs={6} sm={12}>
      { movies.map(movie => {
        return (
          <Col className="border" onClick={() => setMovieModal(movie)}>
            <h5>{movie.title}</h5>
            <Image
              src={movie.thumbnail}
              width={movie.thumbnail_width / 2}
              height={movie.thumbnail_height / 2}
              fluid/>
          </Col>
        )
      })}
    </Row>
  )
}
