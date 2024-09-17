import { divideByCategory, getRandomSelection, sortBy, } from "./utils";
import { TYear } from "./App";
import { useState } from "react";
import { Button, Col, Container, Dropdown, Row, Spinner } from "react-bootstrap";
import { MovieCategory } from "./MovieCategory";
import { MovieModal } from "./MovieModal";
import { Toolbar } from "./Toolbar";
import { MyList } from "./MyList";
import { SuggestedMovies } from "./SuggestedMovies";

export interface IMovie {
  title: string,
  year: number,
  cast: string[],
  genres: string[],
  href: string,
  extract: string,
  thumbnail: string, //"https://upload.wikimedia.org/wikipedia/en/3/34/The_Grudge_2020_Poster.jpeg"
  thumbnail_width: number,
  thumbnail_height: number
}

interface IMoviesProps {
  catalogue: IMovie[] | null,
  myList: IMovie[] | null,
  year: TYear,
  setMyList: React.Dispatch<React.SetStateAction<IMovie[] | null>>
}

export type TCategory = string | number | null | undefined;

export interface ISortedAndDivided {
  category: TCategory,
  movies: IMovie[]
}

export enum TSort {
  ALPHA = "from a to z",
  ALPHA_REV = "from z to a",
  YEAR = "from the oldest",
  YEAR_REV = "from the newest",
  GENRE = "by genre"
}

export type TDisplayMode = "display-list" | "display-grid"

export const Movies = ({ catalogue, year, setMyList, myList }: IMoviesProps) => {
  const [sort, setSort] = useState<TSort>(TSort.ALPHA);
  const [displayMode, setDisplayMode] = useState<TDisplayMode>("display-list");
  const [movieModal, setMovieModal] = useState<IMovie | null>(null);

  const getRandomMovies = () => {
    if (!catalogue)
      throw new Error("Warning: getRandomMovies(): movies is null")
    const randomMovies: IMovie[] = getRandomSelection(catalogue);
    return (randomMovies)
  }

  const getAllMovies = () => {
    if (!catalogue)
      throw new Error("Error: getAllMovies(): movies is null");

    let movieList: IMovie[] | null;
    if (year)
      movieList = catalogue;
    else
      movieList = myList;

    const sortedMovies: IMovie[] | null = sortBy(movieList, sort);
    if (!sortedMovies) {
      if (year)
        throw new Error("Error: getAllMovies(): sortedMovies is null");
      else
        return (
          <div className="display-1">
            Your list is empty!
          </div>
        );
    }

    const sortAndDivided: ISortedAndDivided[] = divideByCategory(sortedMovies, sort);
    return (sortAndDivided.map(({ category, movies }) => {
      return (
        <MovieCategory
          key={`movie-category-${category}`}
          category={category}
          movies={movies}
          display={displayMode}
          setMovieModal={setMovieModal}
          setMyList={setMyList}
          myList={myList}
          isMyListRendered={year ? false : true} />
      )
    }));
  }

  if (!catalogue) {
    return (
      <Container className="py-3 my-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    )
  }
  return (
    <Container>
      <Toolbar
        title={year}
        text={sort}
        setSort={setSort}
        setDisplayMode={setDisplayMode} />

      {
        year
          ? <SuggestedMovies randomMovies={getRandomMovies()} />
          : null
      }

      { getAllMovies() }

      <MovieModal
        movie={movieModal}
        setMovieModal={setMovieModal} />
    </Container>
  )
}
