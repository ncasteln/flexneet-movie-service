import { useEffect, useState } from 'react'
import Navigation from './Navigation';
import { Button } from 'react-bootstrap';
import {  IMovie } from './Movies';
import { Movies } from './Movies';
import { isValidYear } from './utils';
import "./App.css";
import { MyList } from './MyList';

// https://github.com/prust/wikipedia-movie-data

export type TYear = 1960 | 1970 | 1980 | 1990 | 2000 | 2010 | 2020 | null;

export default function App() {
  const [title, setTitle] = useState("2020");
  const [year, setYear] = useState<TYear>(2020);
  const [movies, setMovies] = useState<IMovie[] | null>(null);
  const [myList, setMyList] = useState<IMovie[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`../data/movies-${year}s.json`);
      const newMovies: IMovie[] = await response.json();
      setMovies(newMovies);
      console.log(newMovies);
    }

    let timerId = setTimeout(() => { // added only to simulate the loading animation
      console.info("Info: Fetching data in...");
      fetchData();
    }, 2000);

    return () => {
      console.warn("Warning: clean up fetch()");
      clearTimeout(timerId); }
  }, [year])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const text: string | null = e.currentTarget.textContent;
    if (!text) {
      console.warn("textContent is null");
      return ;
    }

    setTitle(text);
    if (text === "My list") {
      // setMovies(myList);
      // setYear(null);
    }
    else {
      const newYear = Number(text);
      if (isValidYear(newYear) && newYear != year) {
        setMovies(null);
        setYear(newYear);
      }
    }
  }

  const scrollToTop = () => { document.documentElement.scrollTop = 0; }

  return (
    <>
      <Button
        className={`position-fixed bottom-0 end-0 m-3`}
        onClick={scrollToTop}>top</Button>
      <Navigation onClick={handleClick} />
      <Movies
        title={title}
        year={year}
        movies={movies}
        myList={myList} />
    </>
  )
}
