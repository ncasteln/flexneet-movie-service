import { useEffect, useState } from 'react'
import Navigation from './Navigation';
import { Button } from 'react-bootstrap';
import {  IMovie } from './Movies';
import { Movies } from './Movies';
import { isValidMovieList } from './utils';
import "./App.css";
import { MyList } from './MyList';

// https://github.com/prust/wikipedia-movie-data

// export type TYear = 1960 | 1970 | 1980 | 1990 | 2000 | 2010 | 2020 | null;
export type TListTitle = '1960' | '1970' | '1980' | '1990' | '2000' | '2010' | '2020' | "My list" | null;

export default function App() {
  // const [title, setTitle] = useState("2020");
  const [listTitle, setListTitle] = useState<TListTitle>("2020");
  const [movies, setMovies] = useState<IMovie[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      let response;
      if (listTitle === "My list")
        response = await fetch(`../data/movies-my-list.json`);
      else
        response = await fetch(`../data/movies-${listTitle}s.json`);
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
  }, [listTitle])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newListTitle: string | null = e.currentTarget.textContent;
    if (!newListTitle) {
      console.warn("textContent is null");
      return ;
    }

    if (newListTitle != listTitle && isValidMovieList(newListTitle)) {
      setMovies(null);
      setListTitle(newListTitle);
    }
  }

  const scrollToTop = () => { document.documentElement.scrollTop = 0; }

  return (
    <>
      <Button
        className={`position-fixed bottom-0 end-0 m-3`}
        onClick={scrollToTop}>top</Button>
      <Navigation onClick={handleClick} />
      <Movies listTitle={listTitle} movies={movies} />
    </>
  )
}
