import { useEffect, useState } from 'react'
import Navigation from './Navigation';
import { Button, Container, Spinner } from 'react-bootstrap';
import {  IMovie } from './Movies';
import { Movies } from './Movies';
import { isValidMovieList } from './utils';
import "./App.css";
import { MyList } from './MyList';

// https://github.com/prust/wikipedia-movie-data

export type TListTitle = '1960' | '1970' | '1980' | '1990' | '2000' | '2010' | '2020' | "My list" | null;

export default function App() {
  const [listTitle, setListTitle] = useState<TListTitle>("2020");
  const [catalogue, setCatalogue] = useState<IMovie[] | null>(null);
  const [myList, setMyList] = useState<IMovie[] | null>(null);

  useEffect(() => {
    async function fetchMyList() {
      let response = await fetch(`../data/movies-my-list.json`);
      const myList: IMovie[] = await response.json();
      setMyList(myList);
    }

    let timerId = setTimeout(() => { // added only to simulate the loading animation
      console.info("Info: Fetching My list");
      fetchMyList();
    }, 2000);

    return () => {
      console.warn("Warning: clean up fetch()");
      clearTimeout(timerId); }
  }, []);

  useEffect(() => {
    async function fetchCatalogue() {
      let response = await fetch(`../data/movies-${listTitle}s.json`);
      const newCatalogue: IMovie[] = await response.json();
      setCatalogue(newCatalogue);
    }

    let timerId = setTimeout(() => { // added only to simulate the loading animation
      console.info("Info: Fetching Catalogue");
      if (listTitle !== "My list")
        fetchCatalogue();
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
      setCatalogue(null);
      setListTitle(newListTitle);
    }
    scrollToTop();
  }

  const scrollToTop = () => { document.documentElement.scrollTop = 0; }

  return (
    <>
      <Button
        className={`position-fixed bottom-0 end-0 m-3`}
        onClick={scrollToTop}>top</Button>
      <Navigation onClick={handleClick} />
      {
        <Movies
          listTitle={listTitle}
          movies={listTitle === "My list" ? myList : catalogue}
          setMyList={setMyList} />
      }
    </>
  )
}
