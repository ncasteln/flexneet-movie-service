import { Container, Row } from "react-bootstrap"
import { IMovie, TCategory, TDisplayMode } from "./Movies"
import React from "react"
import { MovieTable } from "./MovieTable"
import { MovieGrid } from "./MovieGrid"

interface MovieCategory {
  category: TCategory,
  movies: IMovie[],
  myList: IMovie[] | null,
  display: TDisplayMode,
  setMovieModal: React.Dispatch<React.SetStateAction<IMovie | null>>,
  setMyList: React.Dispatch<React.SetStateAction<IMovie[] | null>>,
  isMyListRendered: boolean
}

export const MovieCategory = ({ category, movies, isMyListRendered, myList, display, setMovieModal, setMyList }: MovieCategory) => {
  return (
    <Container className="bg-dark mt-5 p-0">
      <h3 className="bg-primary display-5 p-3 pt-5" id={`category-${category?.toString()}`}>{ category }</h3>
      <Row className="m-auto py-4">
        {
          display === "display-grid"
            ? <MovieGrid
                movies={movies}
                setMovieModal={setMovieModal} />
            : <MovieTable
                isMyListRendered={isMyListRendered}
                movies={movies}
                myList={myList}
                setMovieModal={setMovieModal}
                setMyList={setMyList} />
        }
      </Row>
    </Container>
  )
}
