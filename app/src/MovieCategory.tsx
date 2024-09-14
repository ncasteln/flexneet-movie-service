import { Row, Col, Image } from "react-bootstrap"
import { IMovie, TCategory, TDisplayMode } from "./Movies"
import React from "react"
import { MovieTable } from "./MoviePreview"

interface MovieCategory {
  category: TCategory,
  categoryIndex: number,
  movies: IMovie[],
  display: TDisplayMode
  setMovieModal: React.Dispatch<React.SetStateAction<IMovie | null>>
}

export const MovieCategory = ({ category, categoryIndex, movies, display, setMovieModal }: MovieCategory) => {
  if (display === "display-grid") {
    return (
      <Row>
        <Row className="border">
          <h3>{ category }</h3>
        </Row>
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
      </Row>
    )
  }
  return (
    <Row className="border border-primary">
      <h3>{ category }</h3>
      <MovieTable movies={movies} />
    </Row>
  )
}
