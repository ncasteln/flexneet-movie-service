import { useEffect, useState } from 'react'
import Navigation from './Navigation';
import { Button, Container, Spinner } from 'react-bootstrap';
import {  IMovie } from './Movies';
import { Movies } from './Movies';
import { getRandomSelection, isValidYear } from './utils';
import "./App.css";

// https://github.com/prust/wikipedia-movie-data

export type TYear = '1960' | '1970' | '1980' | '1990' | '2000' | '2010' | '2020' | null;

export default function App() {
  const [year, setYear] = useState<TYear>("2020");
  const [catalogue, setCatalogue] = useState<IMovie[] | null>(null);
  const [randomMovies, setRandomMovies] = useState<IMovie[] | null>(null);
  const [myList, setMyList] = useState<IMovie[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!year) return ;

    setIsLoading(true);
    async function fetchCatalogue() {
      try {
        let response = await fetch(`../data/movies-${year}s.json`);
        const newCatalogue: IMovie[] = await response.json();
        setCatalogue(newCatalogue);
      } catch (error) {
        console.error("Error: fatching failed: ", error);
      } finally {
        setIsLoading(false);
      }
    }

    let timerId = setTimeout(() => { // added only to simulate the loading animation
      console.info("Info: Fetching Catalogue");
      fetchCatalogue();
    }, 2000);

    return () => {
      console.warn("Warning: clean up fetch()");
      clearTimeout(timerId);
    }
  }, [year])

  useEffect(() => {
    if (catalogue)
      setRandomMovies(getRandomMovies());
  }, [catalogue])

  const getRandomMovies = () => {
    if (!catalogue)
      throw new Error("Warning: getRandomMovies(): movies is null")
    const randomMovies: IMovie[] = getRandomSelection(catalogue);
    return (randomMovies)
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isLoading) return ; // avoid fetching problems

    const newYear: string | null = e.currentTarget.textContent;
    if (!newYear) {
      console.warn("textContent is null");
      return ;
    }

    if (!isValidYear(newYear)) {
      setYear(null);
      return ;
    }
    if (newYear != year) {
      setCatalogue(null);
      setRandomMovies(null);
      setYear(newYear);
    }
    scrollToTop();
  }

  const scrollToTop = () => { document.documentElement.scrollTop = 0; }

  return (
    <>
      <Navigation onClick={handleClick} />
      {
        !catalogue || isLoading
          ? <Container className="py-3 my-5">
              <Spinner animation="border" variant="primary" />
            </Container>
          : <Movies
              year={year}
              randomMovies={randomMovies}
              catalogue={catalogue}
              myList={myList}
              setMyList={setMyList} />
      }
      <Button
        className={`position-fixed bottom-0 end-0 m-3`}
        onClick={scrollToTop}>top</Button>
    </>
  )
}
