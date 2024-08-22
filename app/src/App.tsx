import { useEffect, useState } from 'react'
import Navigation from './Navigation';
import { Container } from 'react-bootstrap';
import {  IMovie } from './Movies';
import { Movies } from './Movies';
import { isValidYear } from './utils';

// https://github.com/prust/wikipedia-movie-data

export type TYear = 1960 | 1970 | 1980 | 1990 | 2000 | 2010 | 2020 | null;

export default function App() {
	const [year, setYear] = useState<TYear>(2020);
	const [movies, setMovies] = useState<IMovie[] | null>(null);

	useEffect(() => {
		// let ignore = false;

		async function fetchData() {
			const response = await fetch(`../data/movies-${year}s.json`);
			const newMovies: IMovie[] = await response.json();
			// if (!ignore) {
				setMovies(newMovies);
				console.log(newMovies);
			// }
		}

		setTimeout(() => { // added only to simulate the loading animation
			fetchData();
		}, 1000);

		// return () => { ignore = true; }
	}, [year])

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const text: string | null = e.currentTarget.textContent;
		if (!text)
			console.warn("textContent is null");
		const newYear = Number(text);
		if (isValidYear(newYear) && newYear != year) {
			setMovies(null);
			setYear(newYear);
		}
	}

	return (
	<Container >
		<Navigation onClick={handleClick} />
		<h2 className='pt-5'>Year: {year ? year : "My list"}</h2>
		{
			movies
				? <Movies year={year} movies={movies} />
				: "Loading animation..."
		}
	</Container>
	)
}
