import { divideByCategory, getRandomSelection, sortBy, } from "./utils";
import { TYear } from "./App";
import { useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { Preview } from "./Preview";

export interface IMovie {
	title: string,
	year: number,
	cast: string[],
	genres: string[],
	href: string,
	extract: string,
	thumbnail: URL, //"https://upload.wikimedia.org/wikipedia/en/3/34/The_Grudge_2020_Poster.jpeg"
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

export const Movies = ({ movies, year }: IMoviesProps) => {
	const [sort, setSort] = useState<TSort>(TSort.ALPHA);

	const renderRandomSelection = () => {
		const randomMovies: IMovie[] = getRandomSelection(movies);
		return (randomMovies.map((movie, i) => {
			return (
				<div key={"random-movie-" + i}>
					<small >{i}-{movie.title}</small>
					<br />
				</div>
			)
		}))
	}

	const renderAll = () => {
		const sortedMovies: IMovie[] | null = sortBy(movies, sort);
		if (!sortedMovies)
			throw new Error("Error: sorting function failed");

		const sortAndDivided: ISortedAndDivided[] = divideByCategory(sortedMovies, sort);

		return (sortAndDivided.map(({ category, movies }, i) => {
			return (
			<div>
				<h2>{category}</h2>
				{ movies.map(movie => {
					return <Preview movie={movie} index={i} />
				})}
			</div>)
		}))

		// return (sortedMovies.map((movie, i, array) => {
		// 	let currCategory: string | number | null | undefined = getCategoryToDisplay(movie);
		// 	let prevCategory = getCategoryToDisplay(array[i - 1]);
		// 	if (prevCategory === null)
		// 		throw new Error("Error: display category function failed");
		// 	if (prevCategory === undefined || currCategory != prevCategory) {
		// 		return (<>
		// 			<h2>{currCategory}</h2>
		// 			<Preview movie={movie} index={i} /></>)
		// 	}
		// 	return <Preview movie={movie} index={i} />
		// }))
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

	return (
	<>
		<h2 className='pt-5'>Year: {year ? year : "My list"}</h2>
		<h2>Suggested</h2>
		{/* { renderRandomSelection() } */}
		<Dropdown>
			<Dropdown.Toggle variant="success" id="dropdown-basic">
				Sorted by: {sort}
			</Dropdown.Toggle>
			<Dropdown.Menu>
				{ renderSortOptions() }
			</Dropdown.Menu>
		</Dropdown>
		{ renderAll() }
	</>
	)
}
