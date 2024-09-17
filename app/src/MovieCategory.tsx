import { Row } from "react-bootstrap"
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
    <Row>
      <h3 className="display-5 mb-0 mt-5 p-3 pt-5 bg-primary" id={`category-${category?.toString()}`}>{ category }</h3>
      {
        display === "display-grid"
          ? <MovieGrid
              isMyListRendered={isMyListRendered}
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
  )
}
