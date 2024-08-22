import { useEffect, useState } from 'react'
import Navigation from './Navigation';
import { Container } from 'react-bootstrap';
import { Content } from './Content';

// https://github.com/prust/wikipedia-movie-data

export type TYear = 1960 | 1970 | 1980 | 1990 | 2000 | 2010 | 2020 | null;

export default function App() {
	const [year, setYear] = useState<TYear>(2020);
	const [data, setData] = useState();

	useEffect(() => {
		let ignore = false;

		async function fetchData() {
			const response = await fetch(`../data/movies-${year}s.json`);
			const newData = await response.json();
			if (!ignore) {
				setData(newData);
				console.log(newData);
			}
		}

		setTimeout(() => { // added only to simulate the loading animation
			fetchData();
		}, 2000);

		return () => { ignore = true; }
	}, [year])

	const isValidYear = (year: number | null): year is TYear => {
		if (!year || [1960, 1970, 1980, 1990, 2000, 2010, 2020].includes(year))
			return (true);
		return (false);
	}

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const text: string | null = e.currentTarget.textContent;
		if (!text)
			console.warn("textContent is null");
		const newYear = Number(text);
		if (isValidYear(newYear) && newYear != year)
			setYear(newYear);
	}

	return (
	<Container >
		<Navigation onClick={handleClick} />
		<h1>Year: {year ? year : "My list"}</h1>
		<Content data={data ? data : null} />
	</Container>
	)
}
