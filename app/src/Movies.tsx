import { divideByCategory, getRandomSelection, sortBy, } from "./utils";
import { TYear } from "./App";
import { useState } from "react";
import { Button, Container, Dropdown } from "react-bootstrap";
import { MoviePreview } from "./MoviePreview";
import { MovieBlock } from "./MovieBlock";

export interface IMovie {
	title: string,
	year: number,
	cast: string[],
	genres: string[],
	href: string,
	extract: string,
	thumbnail: string, //"https://upload.wikimedia.org/wikipedia/en/3/34/The_Grudge_2020_Poster.jpeg"
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

export type TDisplayMode = "display-list" | "display-grid"

export const Movies = ({ movies, year }: IMoviesProps) => {
	const [sort, setSort] = useState<TSort>(TSort.ALPHA);
	const [displayMode, setDisplayMode] = useState<TDisplayMode>("display-list");

	const renderRandomMovies = () => {
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

	const renderAllMovies = () => {
		const sortedMovies: IMovie[] | null = sortBy(movies, sort);
		if (!sortedMovies)
			throw new Error("Error: sorting function failed");

		const sortAndDivided: ISortedAndDivided[] = divideByCategory(sortedMovies, sort);

		return (sortAndDivided.map(({ category, movies }, i) => {
			return <MovieBlock
				category={category}
				movies={movies}
				display={displayMode}
				categoryIndex={i} />
		}))
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

	const handleDisplayMode = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		if (e.currentTarget.id === "display-list" || e.currentTarget.id === "display-grid")
			setDisplayMode(e.currentTarget.id);
	}

	return (
	<>
		<h2 className='pt-5'>Year: {year ? year : "My list"}</h2>

		<h2>Suggested</h2>
		{/* { renderRandomMovies() } */}

		<Dropdown>
			<Dropdown.Toggle variant="success" id="dropdown-basic">
				Sorted by: {sort}
			</Dropdown.Toggle>
			<Dropdown.Menu>
				{ renderSortOptions() }
			</Dropdown.Menu>
		</Dropdown>

		<Container>
			<Button id="display-list" onClick={handleDisplayMode}>List</Button>
			<Button id="display-grid" onClick={handleDisplayMode}>Grid</Button>
		</Container>

		<Container>
			{ renderAllMovies() }
		</Container>
	</>
	)
}
