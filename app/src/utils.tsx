import { ReactElement } from "react";
import { NavDropdown } from "react-bootstrap";
import { TYear } from "./App";
import { IMovie } from "./Movies";

export const isValidYear = (year: number | null): year is TYear => {
	if (!year || [1960, 1970, 1980, 1990, 2000, 2010, 2020].includes(year))
		return (true);
	return (false);
}

export const calculateYears = ( onClick: React.MouseEventHandler<HTMLElement> ): ReactElement[] => {
	const years: ReactElement[] = [];

	for (let i = 1960; i <= 2020; i+=10) {
		years.push(<NavDropdown.Item
			key={"DropdownYear-" + i}
			href={"year-" + i}
			onClick={(e) => onClick(e)}>
				{i}
			</NavDropdown.Item>)
	}
	return (years);
}

export async function fetchData( year: TYear ) {
	const response = await fetch(`../data/movies-${year}s.json`);
	const newMovies = await response.json();
	return (newMovies);
}

export const getRandomSelection = ( movies: IMovie[] ): IMovie[] => {
	const allPossibleNumbers: number[] = [];
	for (let i = 0; i < movies.length; i++) {
		allPossibleNumbers.push(i)
	}
	for (let i = allPossibleNumbers.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[allPossibleNumbers[i], allPossibleNumbers[j]] = [allPossibleNumbers[j], allPossibleNumbers[i]];
	}

	const randomMovies: IMovie[] = [];
	allPossibleNumbers.slice(0, 20).forEach(i => {
		randomMovies.push(movies[i]);
	})

	console.log("random: ", randomMovies);
	return (randomMovies);
}
