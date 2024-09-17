import { useEffect, useState } from 'react'
import Navigation from './Navigation';
import { Button, Container, Spinner } from 'react-bootstrap';
import {  IMovie } from './Movies';
import { Movies } from './Movies';
import { isValidYear } from './utils';
import "./App.css";
import { MyList } from './MyList';

// https://github.com/prust/wikipedia-movie-data

export type TYear = '1960' | '1970' | '1980' | '1990' | '2000' | '2010' | '2020' | null;

export default function App() {
  const [year, setYear] = useState<TYear>("2020");
  const [catalogue, setCatalogue] = useState<IMovie[] | null>(null);
  const [myList, setMyList] = useState<IMovie[] | null>(null);

  useEffect(() => {
    if (!year) return ;
    async function fetchCatalogue() {
        let response = await fetch(`../data/movies-${year}s.json`);
        const newCatalogue: IMovie[] = await response.json();
        setCatalogue(newCatalogue);
    }

    let timerId = setTimeout(() => { // added only to simulate the loading animation
      console.info("Info: Fetching Catalogue");
      fetchCatalogue();
    }, 2000);

    return () => {
      console.warn("Warning: clean up fetch()");
      clearTimeout(timerId); }
  }, [year])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
      setYear(newYear);
    }
    scrollToTop();
  }

  const scrollToTop = () => { document.documentElement.scrollTop = 0; }

  return (
    <>
      <Navigation onClick={handleClick} />
      <Movies
        year={year}
        catalogue={catalogue}
        myList={myList}
        setMyList={setMyList} />
      <Button
        className={`position-fixed bottom-0 end-0 m-3`}
        onClick={scrollToTop}>top</Button>
    </>
  )
}
