import { getRandomSelection } from "./utils";
import { TYear } from "./App";
import { useState } from "react";

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
				<div>
					<small key={"random-movie-" + i}>{i}-{movie.title}</small>
					<br />
				</div>
			)
		}))
	}

	const renderAll = () => {
		return (movies.map((movie, i) => {
			return (
				<div>
					<small key={"all-movie-" + i}>{i}-{movie.title}</small>
					<br />
				</div>
			)
		}))
	}

	return (
		<>
		<h2>Suggested</h2>
		{ renderRandomSelection() }
		<h2>Ordered</h2>
		<h2>Sort by: {sort}</h2>
		{ renderAll() }
		</>

	)
}
