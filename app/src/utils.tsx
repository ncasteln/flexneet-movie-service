import { ReactElement } from "react";
import { NavDropdown } from "react-bootstrap";
import {  TYear } from "./App";
import { IMovie, ISortedAndDivided, TCategory, TSort } from "./Movies";

export const isValidYear = ( list: string | null): list is TYear => {
	if (!list || ['1960', '1970', '1980', '1990', '2000', '2010', '2020'].includes(list))
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

const AtoZ = ( a: IMovie, b: IMovie ): number => {
	if (a.title < b.title) return (-1)
	else if (a.title === b.title) return (0)
	return (1);
}
const ZtoA = ( a: IMovie, b: IMovie ): number => {
	if (a.title > b.title) return (-1)
	else if (a.title === b.title) return (0)
	return (1);
}
const oldToNew = ( a: IMovie, b: IMovie ): number => {
	if (a.year < b.year) return (-1)
	else if (a.year === b.year) return (0)
	return (1);
}
const newToOld = ( a: IMovie, b: IMovie ): number => {
	if (a.year > b.year) return (-1)
	else if (a.year === b.year) return (0)
	return (1);
}
const sortByGenre = ( movies: IMovie[] ): IMovie[] => {
	const genres: string[] = [ "Action", "Adventure", "Animated", "Biography", "Comedy", "Crime", "Dance", "Disaster", "Documentary", "Drama", "Erotic", "Family", "Fantasy", "Found Footage", "Historical", "Horror", "Independent", "Legal", "Live Action", "Martial Arts", "Musical", "Mystery", "Noir", "Performance", "Political", "Romance", "Satire", "Science Fiction", "Short", "Silent", "Slasher", "Sports", "Spy", "Superhero", "Supernatural", "Suspense", "Teen", "Thriller", "War", "Western" ];
	const sortedArray: IMovie[] = []
	genres.forEach(genre => {
		movies.filter((movie) => {
			if (movie.genres[0] === genre)
				sortedArray.push(movie)
		})
	});
	return (sortedArray);
}

export const sortBy = ( movies: IMovie[] | null, sort: TSort ): IMovie[] | null => {
	if (!movies)
    return (null);
  switch (sort) {
		case TSort.ALPHA:
			return (movies.sort(AtoZ));
		case TSort.ALPHA_REV:
			return (movies.sort(ZtoA));
		case TSort.YEAR:
			return (movies.sort(oldToNew));
		case TSort.YEAR_REV:
			return (movies.sort(newToOld));
		case TSort.GENRE:
			return (sortByGenre(movies));
		default:
			break;
	}
	return (null);
}

const getCategoryToDisplay = ( movie: IMovie, sort: TSort ) => {
	if (movie === undefined)
		return (undefined)
	switch (sort) {
		case TSort.ALPHA:
		case TSort.ALPHA_REV:
			return (movie.title[0]);
		case TSort.YEAR:
		case TSort.YEAR_REV:
			return (movie.year);
		case TSort.GENRE:
			return (movie.genres[0]);
		default:
			break;
	}
	return (null);
}

export const divideByCategory = ( sortedMovies: IMovie[], sort: TSort ): ISortedAndDivided[] => {
	const sortedAndDivided: ISortedAndDivided[] = [];
	sortedMovies.forEach((movie, i, array) => {
		let currCategory: TCategory = getCategoryToDisplay(movie, sort);
		let prevCategory = getCategoryToDisplay(array[i - 1], sort);
		if (prevCategory === null)
			throw new Error("Error: display category function failed");
		if (prevCategory === undefined || currCategory != prevCategory) {
			sortedAndDivided.push({
				category: currCategory,
				movies: []
			})
		}
		sortedAndDivided[sortedAndDivided.length - 1].movies.push(movie);
	})
	return (sortedAndDivided);
}
