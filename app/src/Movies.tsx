import { divideByCategory, getRandomSelection, sortBy, } from "./utils";
import { TYear } from "./App";
import { useState } from "react";
import { Button, Col, Container, Dropdown, Modal, Row } from "react-bootstrap";
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
  movies: IMovie[],
  year: TYear
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

export const Movies = ({ movies, year }: IMoviesProps) => {
  const [sort, setSort] = useState<TSort>(TSort.ALPHA);
  const [displayMode, setDisplayMode] = useState<TDisplayMode>("display-list");
  const [movieModal, setMovieModal] = useState<IMovie | null>(null);

  const renderRandomMovies = () => {
    const randomMovies: IMovie[] = getRandomSelection(movies);
    return (randomMovies.map((movie, i) => {
      return (
        <div key={"random-movie-" + i}>
          <small>{i}-{movie.title}</small>
          <br />
        </div>
      )
    }))
  }

  const renderAllMovies = () => {
    const sortedMovies: IMovie[] | null = sortBy(movies, sort);
    if (!sortedMovies)
      throw new Error("Error: sorting function failed");

    const sortAndDivided: ISortedAndDivided[] = divideByCategory(sortedMovies, sort);

    return (sortAndDivided.map(({ category, movies }, i) => {
      return <MovieCategory
        category={category}
        movies={movies}
        display={displayMode}
        categoryIndex={i}
        setMovieModal={setMovieModal} />
    }))
  }

  const renderSortOptions = () => {
    const sortOptions = Object.values(TSort);
    return (sortOptions.map((option, i) => {
      return (<Dropdown.Item as={Button}
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

  return (
  <Container className="py-3 my-5 border">

    {/* <h3>Suggested movies</h3> */}
    {/* { renderRandomMovies() } */}

    <Row className="border">
      <Col className="">
        <h2>{year ? year : "My list"}</h2>
      </Col>
      <Col className="">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Sorted by: {sort}
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

    { renderAllMovies() }

    <MovieModal
      movie={movieModal}
      setMovieModal={setMovieModal} />
  </Container>
  )
}
