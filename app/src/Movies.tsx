import { divideByCategory, getRandomSelection, sortBy, } from "./utils";
import { TListTitle } from "./App";
import { useState } from "react";
import { Button, Col, Container, Dropdown, Row, Spinner } from "react-bootstrap";
import { MovieCategory } from "./MovieCategory";
import { MovieModal } from "./MovieModal";

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
  movies: IMovie[] | null,
  listTitle: TListTitle,
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

export const Movies = ({ movies, listTitle, setMyList }: IMoviesProps) => {
  const [sort, setSort] = useState<TSort>(TSort.ALPHA);
  const [displayMode, setDisplayMode] = useState<TDisplayMode>("display-list");
  const [movieModal, setMovieModal] = useState<IMovie | null>(null);

  const renderRandomMovies = () => {
    if (!movies)
      throw new Error("Warning: renderRandomMovies(): movies is null")
    const randomMovies: IMovie[] = getRandomSelection(movies);
    return (randomMovies)
  }

  const renderAllMovies = () => {
    if (!movies) {
      throw new Error("Error: renderAllMovies(): movies is null");
    }
    const sortedMovies: IMovie[] | null = sortBy(movies, sort);
    if (!sortedMovies)
      throw new Error("Error: renderAllMovies(): sortedMovies is null");

    const sortAndDivided: ISortedAndDivided[] = divideByCategory(sortedMovies, sort);
    return (sortAndDivided);
  }

  const renderSortOptions = () => {
    const sortOptions = Object.values(TSort);
    return (sortOptions.map((option, i) => {
      return (
        <Dropdown.Item as={Button}
          key={`sortOption-${i}`}
          onClick={handleSort}>
            {option}
        </Dropdown.Item>)
    }))
  }

  const handleSort = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (e.currentTarget.textContent) {
      const sortOptions = Object.values(TSort);
      const newSort = sortOptions.filter((value) => {
        return (value === e.currentTarget.textContent)
      })
      setSort(newSort[0]);
    }
  }

  const handleDisplayMode = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (e.currentTarget.id === "display-list" || e.currentTarget.id === "display-grid")
      setDisplayMode(e.currentTarget.id);
  }

  if (!movies) {
    return (
      <Container className="py-3 my-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    )
  }
  return (
    <Container>

      {/* <h3>Suggested movies</h3> */}
      {/* {
        renderRandomMovies().map((movie, i) => {
          return (
            <div key={"random-movie-" + i}>
              <small>{i}-{movie.title}</small>
              <br />
            </div>
          )
        })
      } */}

      <Row className="mb-0">
        <Col>
          <h2 className="text-primary">{ listTitle }</h2>
        </Col>
        <Col>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              List by: {sort}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              { renderSortOptions() }
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col className="d-flex justify-content-end gap-2">
          <Button id="display-list" onClick={handleDisplayMode}>List</Button>
          <Button id="display-grid" onClick={handleDisplayMode}>Grid</Button>
        </Col>
      </Row>

      {
        renderAllMovies().map(({ category, movies }) => {
          return (
            <MovieCategory
              key={`movie-category-${category}`}
              category={category}
              movies={movies}
              display={displayMode}
              setMovieModal={setMovieModal}
              setMyList={setMyList} />
          )
        })
      }

      <MovieModal
        movie={movieModal}
        setMovieModal={setMovieModal} />
    </Container>
  )
}
