import { Row } from "react-bootstrap"
import { IMovie, TCategory, TDisplayMode } from "./Movies"
import React from "react"
import { MovieTable } from "./MovieTable"
import { MovieGrid } from "./MovieGrid"

interface MovieCategory {
  category: TCategory,
  movies: IMovie[],
  display: TDisplayMode
  setMovieModal: React.Dispatch<React.SetStateAction<IMovie | null>>
}

export const MovieCategory = ({ category, movies, display, setMovieModal }: MovieCategory) => {
  return (
    <Row className="border border-primary">
      <h3 className="pt-5" id={`category-${category?.toString()}`}>{ category }</h3>
      {
        display === "display-grid"
          ? <MovieGrid movies={movies} setMovieModal={setMovieModal} />
          : <MovieTable movies={movies} setMovieModal={setMovieModal} />
      }
    </Row>
  )
}
